import { contacts } from "./contacts/contacts";
import { projects } from "./projects/projects";
import { tasks } from "./tasks/tasks";
import * as fs from 'fs';

function saveToFile(data: object): Promise<void> {
    return new Promise((resolve, reject) => {
        fs.writeFile('tasks.json', JSON.stringify(data, null, 2), (err) => {
            if (err) {
                console.error('Error saving file:', err);
                return reject(err);
            }
            console.log("Data saved successfully!");
            resolve();
        });
    });
}

async function app() {
    const projectData = await projects();
    const taskData = await tasks();
    const contactsData = await contacts();


    const writeAllDatas = (taskDatas: any, projectDatas: any, contactDatas: any) => {
        function isObject(value: any): boolean {
            return typeof value === 'object' && value !== null;
        }


        if (Array.isArray(taskDatas) && Array.isArray(contactDatas) && Array.isArray(projectDatas)) {
            taskDatas.forEach(item => writeAllDatas(item, projectDatas, contactDatas));
            return;
        }

        if (Array.isArray(projectDatas) && Array.isArray(contactDatas)) {
            projectDatas.forEach(project => writeAllDatas(taskDatas, project, contactDatas));
            contactDatas.forEach(contact => writeAllDatas(taskDatas, projectDatas, contact))
            return;
        }

        if (isObject(taskDatas) && isObject(projectDatas) && isObject(contactDatas)) {
            let collection = taskDatas.collections?.filter((colId: any) => colId === projectDatas.id);
            let responsibleId = taskDatas.responsibleIds?.filter((respId: any) => respId === contactDatas.id)

            if (collection.length > 0) {
                projectDatas.tasks.push(taskDatas);
            }

            if (responsibleId.length > 0) {
                taskDatas.assignees.push(contactDatas);
            }
        }
    };

    writeAllDatas(taskData, projectData, contactsData);

    saveToFile(projectData)
}

app().catch(err => {
    console.error('Error:', err)
})