export async function GetContactsForUser(userId){
    return fetch('https://localhost:7213/api/contacts/'+ userId).then((response) => response.json())
}

export async function AddOrUpdateContact(contact){
if(contact.userId != null && contact.id != null){
    if(contact.id < 1){
        return fetch('https://localhost:7213/api/contacts/', {
            method: 'POST', 
            headers:{'Content-Type':'application/json'},
            mode: 'cors', 
            body: JSON.stringify(contact)
        })
    }
    return await fetch('https://localhost:7213/api/contacts/', {
        method: 'Put', 
        mode: 'cors', 
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(contact)
    })

}
}
export async function DeleteContactForUser(contact){
return fetch('https://localhost:7213/api/contacts/', {
    method: 'DELETE', 
    mode: 'cors', 
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(contact)
})
}

