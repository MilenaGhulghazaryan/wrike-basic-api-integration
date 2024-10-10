import 'dotenv/config';

interface WrikeProject {
    id: string;
    title: string;
    tasks: string[];
    scope: string;
}

interface MappedProject {
    id: string;
    name: string;
    tasks: string[];
    scope: string;
}

const transformProject = (project: WrikeProject): MappedProject => {
    return {
        id: project.id,
        name: project.title,
        tasks: project.tasks,
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

export async function projects() {
    try {
        const projectData = await getProjects();
        return projectData;
    } catch (err) {
        console.error('An error occurred:', err);
    }
}