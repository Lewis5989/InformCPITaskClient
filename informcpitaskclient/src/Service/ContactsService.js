export async function GetContactsForUser(userId){
        var response = await fetch('https://localhost:7213/api/contacts/'+ userId);
        return await response.json();
    }

export async function AddOrUpdateContact(contact){
    if(contact.userId != null && contact.id != null){
        if(contact.id < 1){
            var response = await fetch('https://localhost:7213/api/contacts/', {
                method: 'POST', 
                headers:{'Content-Type':'application/json'},
                mode: 'cors', 
                body: JSON.stringify(contact)
            })
            return await response.json();
        }
        response = await fetch('https://localhost:7213/api/contacts/', {
            method: 'Put', 
            mode: 'cors', 
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(contact)
        })
        return await response.json();

    }
}



