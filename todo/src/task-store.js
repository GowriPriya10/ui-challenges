export default class TaskStore {
    constructor() {
        this.taskList = this.initTaskList();
    }

    initTaskList() {
        /** if task list alreadt exists in local storage, 
            return it. Otherwise, return an empty array
        */
        if (localStorage.getItem('tasks')) {
            return JSON.parse(localStorage.getItem('tasks'));
        }
        return [];
    }

    setTasksinStore() {
        localStorage.setItem('tasks', JSON.stringify(this.taskList));
    }

    getTasks() {
        return JSON.parse(localStorage.getItem('tasks'));
    }

    getTaskById(taskId) {
        return this.taskList.find(task => task.id === taskId);
    }

    addTask(taskData) {
        const task = {
            id: parseInt(Math.random() * 100),
            title: taskData,
            completed: false
        }
        this.taskList.push(task);
        this.setTasksinStore();
        return task;
    }

    updateTask(taskId) {
        const task = this.getTaskById(taskId);
        task.completed = !task.completed;
        this.setTasksinStore();
    }

    deleteTask(taskId) {
        const taskIndex = this.taskList.findIndex(task => task.id === taskId);
        this.taskList.splice(taskIndex, 1);
        this.setTasksinStore();
    }

}