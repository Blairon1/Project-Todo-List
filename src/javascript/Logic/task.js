import { format, compareAsc } from "date-fns"
import allProjects  from "./projectCollection.js";

export default class Task{
    constructor(taskNumber, taskDescription, taskPriority, taskDueDate, taskStatus){
        this.taskNumber = taskNumber;
        this.taskDescription = taskDescription;
        this.taskPriority = taskPriority;
        this.taskDueDate = taskDueDate;
        this.taskStatus = taskStatus;
        this.taskID = crypto.randomUUID();
    }

    completeTask(){
        this.taskStatus = true;
        localStorage.setItem("allProjects", JSON.stringify(allProjects.projects));
    }

    editTaskDescription(newDescription){
        this.taskDescription = newDescription;
        localStorage.setItem("allProjects", JSON.stringify(allProjects.projects));
    }

    editTaskPriority(newTaskPriority){
        this.taskPriority = newTaskPriority;
        localStorage.setItem("allProjects", JSON.stringify(allProjects.projects));
    }

    editTaskDueDate(newTaskDueDate){
        this.taskDueDate = newTaskDueDate;
        localStorage.setItem("allProjects", JSON.stringify(allProjects.projects));
    }
}