import * as fs from 'fs';
require('dotenv').config();

type WrikeTask = {
    id: string;
    accountId: string;
    title: string;
    status: string;
    parentIds: string[];
    importance: string;
    createdDate: string;
    updatedDate: string;
    dates: object;
    scope: string;
    customStatusId: string;
    permalink: string;
    priority: string;
};

type MappedTask = {
    id: string;
    name: string;
    assignee: string;
    status: string;
    collections: string[];
    created_at: string;
    updated_at: string;
    dates: object;
    scope: string;
    customStatusId: string;
    ticket_url: string;
    priority: string;
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
        dates: task.dates,
        scope: task.scope,
        customStatusId: task.customStatusId,
        ticket_url: task.permalink,
        priority: task.priority
    };
};

async function requestWrike(url: string): Promise<any> {
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

    return await response.json();
}

async function getTasks(): Promise<MappedTask[]> {
    const result = await requestWrike("https://www.wrike.com/api/v4/tasks/");
    return result.data.map(transformTask)
}

async function saveToFile(data: object) {
    if (!data) {
        throw new Error("Cannot save undefined data to file");
    }
    fs.writeFileSync('tasks.json', JSON.stringify(data, null, 2));
}

async function main() {
    try {
        const tasks = await getTasks();
        await saveToFile(tasks);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

main();