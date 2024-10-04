import 'dotenv/config';

interface WrikeTask {
    id: string;
    accountId: string[];
    title: string;
    parentIds: string[];
    importance: string;
    createdDate: string;
    updatedDate: string;
    permalink: string;
    authorIds: string[];

};

interface MappedTask {
    id: string;
    name: string;
    assignees: string[];
    status: string;
    collections: string[];
    created_at: string;
    updated_at: string;
    ticket_url: string;

};


const transformTask = (task: WrikeTask): MappedTask => {
    return {
        id: task.id,
        name: task.title,
        assignees: task.accountId,
        status: task.importance,
        collections: task.parentIds,
        created_at: task.createdDate,
        updated_at: task.updatedDate,
        ticket_url: task.permalink,

    };
};

async function requestWrike(url: string) {
    const token = process.env.WRIKE_API_TOKEN;

    if (!token) {
        throw new Error('API token is missing');
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

async function getTasks() {
    const result = await requestWrike("https://www.wrike.com/api/v4/tasks/");
    return result.data.map(transformTask);
}



export async function tasks() {
    try {
        const taskData = await getTasks();
        return taskData;
    } catch (error) {
        console.error('An error occurred:', error);
    }
}