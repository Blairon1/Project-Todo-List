import Task from "./task.js"
import { format, compareAsc } from "date-fns";
import allProjects from "./projectCollection.js";

export default class Project {

    static currentTaskNumber = 1;

    constructor(name, taskList){
        this.name = name;
        this.taskList = taskList;
        this.ID = crypto.randomUUID();
    }

    createTask(taskDescription, taskPriority, taskDueDate, taskStatus){
        const task = new Task(Project.currentTaskNumber, taskDescription, taskPriority, taskDueDate, taskStatus);
        this.taskList.push(task);
        Project.currentTaskNumber++;

        localStorage.setItem("allProjects", JSON.stringify(allProjects.projects));
    }

    deleteTask(taskNumber){
        for(let taskIndex = 0; taskIndex < this.taskList.length; taskIndex++){
            if(this.taskList[taskIndex].taskID == taskNumber){
                console.log(`Found you: ${this.taskList[taskIndex].taskDescription}`);
                this.taskList.splice(taskIndex, taskIndex + 1);
                console.table(this.taskList);
            }
        }

        localStorage.setItem("allProjects", JSON.stringify(allProjects.projects));
    }
    
};