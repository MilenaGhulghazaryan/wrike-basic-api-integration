import { projects } from "./projects/projects";
import { tasks } from "./tasks/tasks";

async function app() {
    await projects();
    await tasks();
}

app().catch(err => {
    console.error('Error:', err)
})