export async function GetContactsForUser(userId){
        var response = await fetch('https://localhost:7213/api/contacts/'+ userId);
        return await response.json();
    }

export function CreateContact(contact){
    if(contact.userId != null){
        
    }
}


