// import * as fs from 'fs';
// import 'dotenv/config';


// interface WrikeUser {
//     id: string;
//     firstName: string;
//     lastName: string;
//     type: string;
// }

// interface MappedUser {
//     userId: string;
//     first_name: string;
//     last_name: string;
//     type: string;
// }

// const transformUser = (user: WrikeUser): MappedUser => {
//     return {
//         userId: user.id,
//         first_name: user.firstName,
//         last_name: user.lastName,
//         type: user.type
//     }
// }

// async function requestWrikeUsers(url: string) {
//     const token = process.env.WRIKE_API_TOKEN;

//     if (!token) {
//         throw new Error('API tokken is missing');
//     }

//     const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         }
//     })

//     return response.json();
// }

// async function getUsers(userId: string) {
//     const result = await requestWrikeUsers(`https://www.wrike.com/api/v4/users/${userId}`)
//     return result.data.map(transformUser)
// }

// async function saveToFile(data: object) {    //use promisify, without fs.writeFile
//     if (!data) {
//         throw new Error('Cannot save undefined data to file')
//     }
//     fs.writeFile('users.json', JSON.stringify(data, null, 2), (err) => {
//         if (err) {
//             console.error("Error:", err);
//         }
//         console.log("Users data saved successfully!");
//     })
// }

// // export async function users() {
// //     try {
// //         const users = await getUsers('KUAAAAAD');
// //         return saveToFile(users)
// //     } catch (err) {
// //         console.error('An error occurred:', err);
// //     }
// // }

// export async function users() {
//     try {
//         const users = await getUsers('KUAAAAAD');
//         console.log('AAA');

//         await saveToFile(users)
//         console.log('BBB');

//     } catch (err) {
//         console.error('An error occurred:', err);
//     }
// }


import * as fs from 'fs';
import 'dotenv/config';
import { saveToFile } from '../projects/projects'
import { tasks } from 'src/tasks/tasks';



interface WrikeAttachments {
    id: string,
    authorId: string,
    name: string,
    // createdDate: string,
    taskId: string
}

interface MappedAttachments {
    id: string,
    authorId: string,
    title: string,
    // created_at: string,
    taskId: string
}

interface MappedTask {
    map(arg0: (el: any) => void): unknown;

    forEach(arg0: (el: any) => void): unknown;
    id: string;
    name: string;
    assignees: [];
    status: string;
    collections: string[];
    created_at: string;
    updated_at: string;
    ticket_url: string;
};

const transformAttachments = (attechment: WrikeAttachments): MappedAttachments => {
    return {
        id: attechment.id,
        authorId: attechment.authorId,
        title: attechment.name,
        // created_at: attechment.createdDate,
        taskId: attechment.taskId
    }
}

async function requestWrikeAttachments(url: string) {
    const token = process.env.WRIKE_API_TOKEN;
    if (!token) {
        throw new Error('API token is missing')
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

async function getAttechments(created_at: string) {
    const formattedDate = new Date(created_at).toISOString();

    // const result = await requestWrikeAttachments(`https://www.wrike.com/api/v4/attachments?createdDate={"end":${created_at}}&versions=true`);

    const endDateParam = encodeURIComponent(`{"end": "${created_at}"}`);
    const url = `https://www.wrike.com/api/v4/attachments?createdDate=${endDateParam}&versions=true`;
    const result = await requestWrikeAttachments(url);
    return result.data.map(transformAttachments);
}



function readTasksFile(): Promise<any> {
    return new Promise((resolve, reject) => {
        fs.readFile('tasks.json', 'utf-8', (err, data) => {
            if (err) {
                reject(err)
            }
            resolve(JSON.parse(data))
        })
    })
}


export async function attachments() {
    try {
        const readFile: MappedTask = await readTasksFile();
        readFile.map((el) => {
            el.tasks.map(async (task: any) => {
                const attachmentsData = await getAttechments(task.created_at)
                task.assignees.push(...attachmentsData)

            })
        })

        console.log(readFile, 'readFile');

        await saveToFile(readFile)

    } catch (err) {
        console.error('An error occurred:', err);
    }
}






