import 'dotenv/config';
import { requestWrike } from '../wrikeApi';

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
        tasks: [],
        scope: project.scope
    }
}

async function getProjects() {
    const result = await requestWrike('https://www.wrike.com/api/v4/folders')
    return result.data.map(transformProject);
}

export function projects() {
    const projectData = getProjects();
    return projectData;
}