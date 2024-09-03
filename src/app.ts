import { tasks } from "./tasks/tasks"
import { users } from "./users/users";

async function app() {
    await tasks();
    await users();
}

app().catch(err => {
    console.error('Error:', err)
})