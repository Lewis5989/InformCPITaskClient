import './ContactsTable.css';

function ContactsTable() {
  return (
    <div className="ContactsTable">
        <h1>Contacts</h1>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th> </th>
                </tr>
                
            </table>
        
    </div>
  );
}

export default ContactsTable;