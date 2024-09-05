import * as fs from 'fs';
import 'dotenv/config';

type WrikeTask = {
    id: string;
    accountId: string;
    title: string;
    parentIds: string[];
    importance: string;
    createdDate: string;
    updatedDate: string;
    permalink: string;
};

type MappedTask = {
    id: string;
    name: string;
    assignee: string;
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
        assignee: task.accountId,
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

async function saveToFile(data: object) {
    if (!data) {
        throw new Error("Cannot save undefined data to file");
    }
    fs.writeFile('tasks.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error:', err)
        }
        console.log("Tasks data saved successfully!");
    })
}

export async function tasks() {
    try {
        const tasks = await getTasks();
        await saveToFile(tasks);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}