import { tasks } from "./tasks/tasks"

async function app() {
    await tasks()
}

app().catch(err => {
    console.error('Error:', err)
})