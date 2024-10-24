import 'dotenv/config';
import { requestWrike } from '../wrikeApi';

interface IWrikeProject {
    id: string;
    title: string;
    tasks: string[];
    scope: string;
}

interface IMappedProject {
    id: string;
    name: string;
    tasks: string[];
    scope: string;
}

function transformProject(project: IWrikeProject): IMappedProject {
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