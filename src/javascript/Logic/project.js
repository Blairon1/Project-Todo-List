import Task from "./task.js"
import { format, compareAsc, getTime, compareDesc} from "date-fns";
import allProjects from "./projectCollection.js";

export default class Project {

    static currentTaskNumber = 1;

    constructor(name, taskList){
        this.name = name;
        this.taskList = taskList;
        this.ID = crypto.randomUUID();

        this.taskListDueDates = [];
        this.taskListPriority = [];
    }

    updateTaskLists(){
        this.taskListDueDates = [...this.taskList].sort((taskOne, taskTwo) =>compareAsc(taskOne.taskDueDate, taskTwo.taskDueDate));
        this.taskListPriority = [...this.taskList.filter(task=>{return task.taskPriority == "High"}), ...this.taskList.filter(task=>{return task.taskPriority == "Medium"}), ...this.taskList.filter(task=>{return task.taskPriority == "Low"})];
        localStorage.setItem("allProjects", JSON.stringify(allProjects.projects));
    }

    createTask(taskDescription, taskPriority, taskDueDate, taskStatus){
        const task = new Task(Project.currentTaskNumber, taskDescription, taskPriority, taskDueDate, taskStatus);
        
        this.taskList.push(task);

        this.updateTaskLists();
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
        this.updateTaskLists();

        localStorage.setItem("allProjects", JSON.stringify(allProjects.projects));
    }
};