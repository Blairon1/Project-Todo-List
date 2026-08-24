import { format, compareAsc } from "date-fns"
export default class Task{
    constructor(taskNumber, taskDescription, taskPriority, taskDueDate){
        this.taskNumber = taskNumber;
        this.taskDescription = taskDescription;
        this.taskPriority = taskPriority;
        this.taskDueDate = taskDueDate;
        this.taskStatus = false;
        this.taskID = crypto.randomUUID();
    }

    completeTask(){
        this.taskStatus = true;
    }

    editTaskDecription(newDescription){
        this.taskDescription = newDescription;
    }

    editTaskPriority(newTaskPriority){
        this.taskPriority = newTaskPriority;
    }

    editTaskDueDate(newTaskDueDate){
        this,taskDueDate = newTaskDueDate;
    }
}