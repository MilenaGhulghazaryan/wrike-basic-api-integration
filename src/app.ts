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
    try {
        const projectData = await projects();
        const taskData = await tasks();
        const contactsData = await contacts();

        projectData.forEach((project: any) => {

            project.tasks = taskData.filter((task: { id: any; }) => task.id === project.id);

            project.tasks = project.tasks.concat(taskData);

            project.tasks.forEach((task: any) => {
                if (typeof task.assignees === 'string') {
                    task.assignees = task.assignees.split(',');

                    contactsData?.forEach((contact) => {
                        contact.profiles.forEach((account: any) => {
                            if (task.assignees.includes(account.accountId)) {
                                task.assignees.push(account);
                            }
                        });
                    });
                }
            });
        });

        saveToFile(projectData)
    } catch (err) {
        console.error('Error:', err);
    }
}

app().catch(err => {
    console.error('Error:', err)
})