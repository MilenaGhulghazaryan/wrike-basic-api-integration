"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var mapTask = function (task) {
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
var wrikeTasks = [
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
var mappedTasks = wrikeTasks.map(mapTask);
fs.writeFileSync('tasks.json', JSON.stringify(mappedTasks, null, 2));
console.log('Mapped tasks written to tasks.json');
