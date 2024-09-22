import * as fs from 'fs';
import 'dotenv/config';
import { saveToFile } from '../projects/projects'


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

interface MappedProject {
    forEach(arg0: (el: any) => void): unknown;
    id: string;
    name: string;
    children: string[] | [];
    childrenIds: string[];
    scope: string;
}

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


function readProjectsFile(): Promise<any> {
    return new Promise((resolve, reject) => {
        fs.readFile("tasks.json", 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            try {
                const projectsData = JSON.parse(data);
                resolve(projectsData);
            } catch (error) {
                reject('Error parsing JSON');
            }
        });
    });
}

export async function tasks() {
    try {
        const taskData = await getTasks();
        const readFile: MappedProject = await readProjectsFile()

        readFile.forEach(el => {
            el.childrenIds.push(...taskData.map((task: string) => task));
        });

        const newData = JSON.stringify(readFile, null, 2)
        const parsedData = JSON.parse(newData);
        await saveToFile(parsedData)
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

