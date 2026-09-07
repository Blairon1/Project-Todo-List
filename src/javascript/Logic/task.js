import { format, parseISO } from 'date-fns';
import allProjects from './projectCollection.js';

export default class Task {
    constructor(taskNumber, description, priority, dueDate, taskStatus) {
        this.taskNumber = taskNumber;
        this.description = description;
        this.priority = priority;
        this.dueDate = format(parseISO(dueDate), 'yyyy-MM-dd');
        this.isCompleted = taskStatus;
        this.id = crypto.randomUUID();
    }

    completeTask() {
        this.isCompleted = true;
        localStorage.setItem('allProjects', JSON.stringify(allProjects.projects));
    }

    editTaskDescription(newDescription) {
        this.description = newDescription;
        localStorage.setItem('allProjects', JSON.stringify(allProjects.projects));
    }

    editTaskPriority(newPriority) {
        this.priority = newPriority;
        localStorage.setItem('allProjects', JSON.stringify(allProjects.projects));
    }

    editTaskDueDate(newDueDate) {
        this.dueDate = newDueDate;
        localStorage.setItem('allProjects', JSON.stringify(allProjects.projects));
    }
}
