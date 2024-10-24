import 'dotenv/config';
import { requestWrike } from '../wrikeApi';

interface IWrikeTask {
    id: string;
    title: string;
    parentIds: string[];
    importance: string;
    createdDate: string;
    updatedDate: string;
    permalink: string;
    authorIds: string[];
    responsibleIds: string[];
};

interface IMappedTask {
    id: string;
    name: string;
    assignees: string[];
    status: string;
    collections: string[];
    created_at: string;
    updated_at: string;
    ticket_url: string;
    responsibleIds: string[];
};

function transformTask(task: IWrikeTask): IMappedTask {
    return {
        id: task.id,
        name: task.title,
        assignees: [],
        status: task.importance,
        responsibleIds: task.responsibleIds,
        collections: task.parentIds,
        created_at: task.createdDate,
        updated_at: task.updatedDate,
        ticket_url: task.permalink,
    };
};


async function getTasks() {
    const result = await requestWrike(`https://www.wrike.com/api/v4/tasks/?fields=["parentIds","responsibleIds"]`);
    return result.data.map(transformTask);
}

export function tasks() {
    const taskData = getTasks();
    return taskData;
}