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