interface WrikeContact {
    id: string;
    firstName: string;
    lastName: string;
    profiles: string[];
}

const wrikeContact = (project: WrikeContact) => {
    return {
        id: project.id,
        firstName: project.firstName,
        lastName: project.lastName,
        profiles: project.profiles,
    }
}

async function requestWrikeContacts(url: string) {
    const token = process.env.WRIKE_API_TOKEN;

    if (!token) {
        throw new Error('API token is missing');
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

async function getContacts() {
    const result = await requestWrikeContacts('https://www.wrike.com/api/v4/contacts');
    return result.data.map(wrikeContact);
}

export async function contacts() {
    try {
        const contacts = await getContacts();
        return contacts;
    } catch (err) {
        console.error('An error occurred:', err);
    }
}