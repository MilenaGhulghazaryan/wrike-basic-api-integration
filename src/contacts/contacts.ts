interface WrikeContact {
    profiles: string[];
    id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
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

async function getContacts(): Promise<WrikeContact[]> {
    const result = await requestWrikeContacts('https://www.wrike.com/api/v4/contacts');
    return result.data;
}

export async function contacts() {
    try {
        const contacts = await getContacts();
        return contacts;
    } catch (err) {
        console.error('An error occurred:', err);
    }
}