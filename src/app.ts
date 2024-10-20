import { contacts } from "./contacts/contacts";
import { projects } from "./projects/projects";
import { tasks } from "./tasks/tasks";
import * as fs from 'fs';

function saveToFile(data: object): Promise<void> {
    return new Promise((resolve, reject) => {
        if (!data) {
            return reject(new Error("Cannot save undefined data to file"));
        }

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


    const recursia = (element: any, projectDatas: any, contactDatas: any) => {
        if (Array.isArray(element)) {
            element.forEach(item => recursia(item, projectDatas, contactDatas));
            return;
        }

        if (Array.isArray(projectDatas) && Array.isArray(contactDatas)) {
            projectDatas.forEach(project => recursia(element, project, contactDatas));
            contactDatas.forEach(contact => recursia(element, projectDatas, contact))
            return;
        }
        if (typeof element === 'object' && element !== null &&
            typeof projectDatas === 'object' && projectDatas !== null &&
            typeof contactDatas === 'object' && contactDatas !== null) {

            let collection = element.collections?.filter((colId: any) => colId === projectDatas.id) || [];
            let responsibleId = element.responsibleIds?.filter((respId: any) => respId === contactDatas.id)

            if (collection.length > 0) {
                projectDatas.tasks.push(element);
            }
            if (Array.isArray(element.assignees) && responsibleId.length > 0) {
                element.assignees.push(contactDatas);
            }
        }
    };

    recursia(taskData, projectData, contactsData);

    saveToFile(projectData)
}

app().catch(err => {
    console.error('Error:', err)
})