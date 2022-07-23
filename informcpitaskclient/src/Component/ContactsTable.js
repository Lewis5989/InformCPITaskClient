import { Component } from 'react';
import './ContactsTable.css';
import React from 'react';
import { GetContactsForUser, AddOrUpdateContact, DeleteContactForUser } from '../Service/ContactsService';

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
        
    }
    userId = 1;
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
        try{
            let data = await GetContactsForUser(userId);
            this.setState({ contacts: data, loading: false });
        }
        catch(err){
            console.log(err)
        }
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
                            <th><input value={this.state.inputContactName} onChange={e=> this.setState({inputContactName: e.target.value})}/></th>
                            <th><input value={this.state.inputEmail}onChange={e=>this.setState({inputEmail: e.target.value})}/></th>
                            <th><input value={this.state.inputPhoneNumber} onChange={e=>this.setState({inputPhoneNumber: e.target.value})}/></th>
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
                                <button onClick={()=>this.editContact(contact)}>Edit </button>
                                <button onClick={()=>this.deleteContact(contact)}>Delete </button>
                            </th>
                        </tr>
                    )}
                </tbody>
            </table>
        );  
    }
    editContact(contact){
        this.setState({
            inputId: contact.id, 
            inputContactName:contact.contactName,
            inputEmail:contact.email,
            inputPhoneNumber:contact.phoneNumber
        })
    }
    async deleteContact(contact){
        
        try{
            DeleteContactForUser(contact);
            await this.loadContactData(this.userId);
            this.render()
        }
        catch(err){
            console.log(err)
        }
    }
    async saveContact(event){
        let contact = {
            id: this.state.inputId,
            userId: this.userId,
            contactName: this.state.inputContactName,
            email: this.state.inputEmail,
            phoneNumber: this.state.inputPhoneNumber
        }
        try{
            await AddOrUpdateContact(contact);
            this.render();
        }
        catch(err){
            console.log(err)
        }
        
    }
}




export default ContactsTable;