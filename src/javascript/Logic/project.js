import { compareAsc } from 'date-fns';
import Task from './task.js';
import allProjects from './projectCollection.js';

export default class Project {
    static currentTaskNumber = 1;

    constructor(name, taskList = []) {
        this.name = name;
        this.taskList = taskList;
        this.id = crypto.randomUUID();

        this.taskListDueDates = [];
        this.taskListPriority = [];
    }

    updateTaskLists() {
        this.taskListDueDates = [...this.taskList].sort((firstTask, secondTask) =>
            compareAsc(firstTask.dueDate, secondTask.dueDate)
        );

        this.taskListPriority = [
            ...this.taskList.filter((task) => task.priority === 'High'),
            ...this.taskList.filter((task) => task.priority === 'Medium'),
            ...this.taskList.filter((task) => task.priority === 'Low'),
        ];

        localStorage.setItem('allProjects', JSON.stringify(allProjects.projects));
    }

    createTask(newDescription, newPriority, newDueDate, newStatus) {
        const newTask = new Task(
            Project.currentTaskNumber,
            newDescription,
            newPriority,
            newDueDate,
            newStatus
        );

        this.taskList.push(newTask);
        this.updateTaskLists();
        Project.currentTaskNumber++;

        localStorage.setItem('allProjects', JSON.stringify(allProjects.projects));
    }

    deleteTask(taskID) {
        for (let taskIndex = 0; taskIndex < this.taskList.length; taskIndex++) {
            if (this.taskList[taskIndex].id === taskID) {
                console.log(`Found you: ${this.taskList[taskIndex].taskDescription}`);
                this.taskList.splice(taskIndex, 1);
                console.table(this.taskList);
                break;
            }
        }

        this.updateTaskLists();
        localStorage.setItem('allProjects', JSON.stringify(allProjects.projects));
    }
}
