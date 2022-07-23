import { Component } from 'react';
import './ContactsTable.css';
import React from 'react';
import { GetContactsForUser, AddOrUpdateContact } from '../Service/ContactsService';

export class ContactsTable extends Component {
    
    constructor(props) {

        super(props);

        this.state = { 
            contacts: [], 
            loading: true ,
            inputId : 0,
            inputContactName:"",
            inputEmail:"",
            inputPhoneNumber: "",
        }        
        this.userId = 1;
    }

    render(){
        let content = this.state.loading ? <div>loading..</div>: this.renderContactsTable(this.state.contacts);
        return (
            <div className="ContactsTable">
                <h1>Contacts</h1>
                {content}
        </div>
        );
    };

    async loadContactData(userId){
        let data = await GetContactsForUser(userId);
        this.setState({ contacts: data, loading: false });
    };   

    componentDidMount(){
        this.loadContactData(this.userId);
    };
    
    renderContactsTable(contacts){
        return(
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <th><input id="inputContactName" onChange={e=> this.setState({inputContactName: e.target.value})}/></th>
                            <th><input id="inputEmail"onChange={e=>this.setState({inputEmail: e.target.value})}/></th>
                            <th><input id="inputPhoneNumber" onChange={e=>this.setState({inputPhoneNumber: e.target.value})}/></th>
                            <th>
                                <button onClick={()=>this.saveContact()}>Save</button>
                            </th>
                        </tr>
                    {contacts.map(contact =>  
                        <tr key = {contact.id}>
                            <th>{contact.contactName}</th>
                            <th>{contact.email}</th>
                            <th>{contact.phoneNumber}</th>
                            <th>
                                <button onClick={this.editContact(contact)}>Edit </button>
                                <button onClick={this.deleteContact(contact)}>Delete </button>
                            </th>
                        </tr>
                    )}
                </tbody>
            </table>
        );  
    }
    editContact(contact){

    }
    deleteContact(contact){

    }
    async saveContact(event){
        console.log(this.state)
        let contact = {
            id: this.state.inputId,
            userId: this.userId,
            contactName: this.state.inputContactName,
            email: this.state.inputEmail,
            phoneNumber: this.state.inputPhoneNumber
        }
        console.log(contact)
        await AddOrUpdateContact(contact); 
    }
}




export default ContactsTable;