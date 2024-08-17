import * as fs from 'fs';

interface WrikeTask {
    id: string;
    accountId: string;
    title: string;
    status: string;
    importance: string;
    createdDate: string;
    updatedDate: string;
    permalink: string;
}

interface MappedTask {
    id: string;
    name: string;
    assignee: string;
    status: string;
    collections: string[];
    created_at: string;
    updated_at: string;
    ticket_url: string;
}

const mapTask = (task: WrikeTask): MappedTask => {
    return {
        id: task.id,
        name: task.title,
        assignee: task.accountId,
        status: task.importance,
        collections: [], 
        created_at: task.createdDate,
        updated_at: task.updatedDate,
        ticket_url: task.permalink,
    };
};

const wrikeTasks: WrikeTask[] = [
    {
        id: "IEAGIXWZKRL7TS34",
        accountId: "IEAGIXWZ",
        title: "Set up API App",
        status: "Completed",
        importance: "Normal",
        createdDate: "2024-08-16T09:12:56Z",
        updatedDate: "2024-08-17T09:23:56Z",
        permalink: "https://www.wrike.com/open.htm?id=1475988348"
    },
  
];

const mappedTasks: MappedTask[] = wrikeTasks.map(mapTask);

fs.writeFileSync('tasks.json', JSON.stringify(mappedTasks, null, 2));

console.log('Mapped tasks written to tasks.json');