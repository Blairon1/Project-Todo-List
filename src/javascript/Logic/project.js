import Task from "./task.js"
import { format, compareAsc } from "date-fns";
export default class Project {

    static currentTaskNumber = 1;

    constructor(name, taskList){
        this.name = name;
        this.taskList = taskList;
        this.ID = crypto.randomUUID();
    }

    createTask(taskDescription, taskPriority, taskDueDate){
        const task = new Task(Project.currentTaskNumber, taskDescription, taskPriority, taskDueDate);
        this.taskList.push(task);
        Project.currentTaskNumber++;
    }

    deleteTask(taskNumber){
        this.taskList.forEach((task,index)=>{
            if(task.taskNumber == taskNumber){
                this.taskList.splice(index, index + 1);
            }
        })
    }

    getID(){
        return this.ID;
    }

    
};