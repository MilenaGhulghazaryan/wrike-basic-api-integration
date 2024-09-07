import 'dotenv/config';
import * as fs from 'fs';

interface WrikeProject {
    id: string;
    title: string;
    children: string[];
    childIds: string[];
    scope: string;
}

interface MappedProject {
    id: string;
    name: string;
    children: string[];
    childrenIds: string[];
    scope: string;
}

const transformProject = (project: WrikeProject): MappedProject => {
    return {
        id: project.id,
        name: project.title,
        children: project.children,
        childrenIds: project.childIds,
        scope: project.scope
    }
}

async function requestWrikeProjects(url: string) {
    const token = process.env.WRIKE_API_TOKEN;

    if (!token) {
        throw new Error('API token is missing');
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application.json',
            'Authorization': `Bearer ${token}`
        }
    })

    return response.json();
}

async function getProjects() {
    const result = await requestWrikeProjects('https://www.wrike.com/api/v4/folders')
    return result.data.map(transformProject);
}

function saveToFile(data: object) {
    if (!data) {
        throw new Error("Cannot save undefined data to file");
    }
    fs.writeFile('projects.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error:', err)
        }
        console.log("Projects data saved successfully!");
    })
}

export async function projects() {
    try {
        const projects = await getProjects();
        saveToFile(projects);
    } catch (err) {
        console.error('An error occurred:', err);
    }
}