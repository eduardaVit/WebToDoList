async function addTask() {
    let taskInput = document.getElementById('taskInput').value;
    if (taskInput) {
        await eel.add_task(taskInput)();
        document.getElementById('taskInput').value = '';
        loadTasks();
    }
}


async function loadTasks() {
    let tasks = await eel.load_tasks()();
    let taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        let listItem = document.createElement('li');
        listItem.innerHTML = `
            <span style="text-decoration: ${task.completed ? 'line-through' : 'none'};">
                ${task.task}
            </span>
            <button onclick="toggleCompletion('${task.task}')">Concluir</button>
            <button onclick="editTask('${task.task}')">Editar</button>
            <button onclick="deleteTask('${task.task}')">Excluir</button>
        `;
        taskList.appendChild(listItem);
    });
}


async function toggleCompletion(task) {
    await eel.toggle_task_completion(task)();
    loadTasks();
}


async function editTask(task) {
    let newTask = prompt("Editar tarefa:", task);
    if (newTask && newTask !== task) {
        await eel.edit_task(task, newTask)();
        loadTasks();
    }
}


async function deleteTask(task) {
    await eel.delete_task(task)();
    loadTasks();
}


async function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const newTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    await eel.set_theme(newTheme)();
}


async function loadTheme() {
    const theme = await eel.get_theme()();
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}


document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    loadTheme();
});
