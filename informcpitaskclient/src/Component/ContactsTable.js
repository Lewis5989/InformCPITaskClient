import { Component } from 'react';
import './ContactsTable.css';
import React from 'react';
import { GetContactsForUser } from '../Service/ContactsService';

export class ContactsTable extends Component {
    userId = 1;
    constructor(props) {
        super(props);
        this.state = { contacts: [], loading: true };
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
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map(contact =>  
                        <tr>
                            <th>{contact.contactName}</th>
                            <th>{contact.email}</th>
                            <th>{contact.phoneNumber}</th>
                            <th> </th>
                        </tr>
                    )}
                </tbody>
            </table>
        );  
    }
}



export default ContactsTable;