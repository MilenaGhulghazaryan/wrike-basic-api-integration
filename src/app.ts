import { projects } from "./projects/projects";
import { tasks } from "./tasks/tasks";
import {attachments} from './attechments/attechments';

async function app() {
    await projects();
    await tasks();
    await attachments();
}

app().catch(err => {
    console.error('Error:', err)
})