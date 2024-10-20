import { requestWrike } from "../wrikeApi";

interface WrikeContact {
    id: string;
    firstName: string;
    lastName: string;
}

const wrikeContact = (project: WrikeContact) => {
    return {
        id: project.id,
        firstName: project.firstName,
        lastName: project.lastName,
    }
}

async function getContacts() {
    const result = await requestWrike('https://www.wrike.com/api/v4/contacts');
    return result.data.map(wrikeContact);
}

export function contacts() {
    const contacts = getContacts();
    return contacts;
}