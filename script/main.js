const addTaskButton = document.querySelector(".addTaskBtn");
const tasksContainer = document.querySelector(".tasksContainer");
let tasks = [];
let id = 0;
const getSavedTasks = () => {
    const savedTasks = localStorage.getItem('tasks');
    if(savedTasks) {
        tasks.JSON.parse(saveTasks);
    }
    printTasks(tasks);
}
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};
const printTasks = (taskList) => {
    tasksContainer.innerHTML = taskList.map(task => `
        <div class="taskContainer">
            <div class="taskHeader">
                <h3>Task ${task.taskId}</h3>
            </div>
            <div class="taskBody">
                <p class="${task.completed ? 'completed' : ''}">Description: ${task.taskDescription}</p>
                <button onclick="toggleCompletion(${task.taskId})">${task.completed ? 'Mark Incomplete' : 'Mark Complete'}</button>
                <button onclick="editTask(${task.taskId})">Edit</button>
                <button onclick="deleteTask(${task.taskId})">Delete</button>
            </div>
        </div>
        <hr/>
    `).join('');
};
addTaskButton.addEventListener("click", () => {
    const taskDescription = document.getElementById('task-input').value.trim();
    if (taskDescription === '') {
        alert('Please enter a valid task description');
        return;
    }
    const newTask = {
        taskId: ++id,
        taskDescription,
        completed: false
    };
    tasks.push(newTask);
    document.getElementById('task-input').value = '';
    saveTasks();
    printTasks(tasks);
});
const toggleCompletion = (taskId) => {
    const task = tasks.find(t => t.taskId === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        printTasks(tasks);
    }
};
const editTask = (taskId) => {
    const task = tasks.find(t => t.taskId === taskId);
    if (task) {
        const newDescription = prompt('Enter new task description:', task.taskDescription);
        if (newDescription && newDescription.trim() !== '') {
            task.taskDescription = newDescription.trim();
            saveTasks();
            printTasks(tasks);
        }
    }
};
const deleteTask = (taskId) => {
    tasks = tasks.filter(task => task.taskId !== taskId);
    saveTasks();
    printTasks(tasks);
};
const searchTasks = () => {
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    const filteredTasks = tasks.filter(task => task.taskDescription.toLowerCase().includes(searchQuery));
    printTasks(filteredTasks);
};  