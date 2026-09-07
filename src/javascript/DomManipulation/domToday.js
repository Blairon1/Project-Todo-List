import { startOfToday, format } from 'date-fns';
import allProjects from '../Logic/projectCollection.js';

// ============================================================
// DOM REFERENCES
// ============================================================

const todayTab = document.querySelector('#today-tab');
const homePage = document.querySelector('#home-page');

// ============================================================
// TODAY TAB CLICK
// ============================================================

// Event Delegation, add an event to any nearest element of the projects container
todayTab.addEventListener('click', () => {
    renderTodayPage();
});

function renderTodayPage() {
    homePage.replaceChildren();
    loadTodayPageHeader();
}

function loadTodayPageHeader() {
    const todayHeader = document.createElement('h1');
    todayHeader.id = 'today-header';
    todayHeader.textContent = "Today's Tasks";
    homePage.appendChild(todayHeader);

    /*
     * ============================================================
     * BUILD THE HEADER FOR THE TO-DO LIST CHART
     * ============================================================
     */

    // Container for the entire todoList chart
    const todoListChart = document.createElement('div');
    todoListChart.id = 'todo-list-chart';
    todoListChart.classList.add('today-task-list');
    homePage.appendChild(todoListChart);

    // Container for the header for the todoList
    const todoListHeader = document.createElement('div');
    todoListHeader.classList.add('todo-list-row-header');
    todoListChart.appendChild(todoListHeader);

    // Create the column for the task descriptions
    const descriptionHeader = document.createElement('div');
    descriptionHeader.textContent = 'Description';
    todoListHeader.appendChild(descriptionHeader);

    // Create the column for the task status
    const statusHeader = document.createElement('div');
    statusHeader.textContent = 'Status';
    todoListHeader.appendChild(statusHeader);

    // Create the column for the task priority
    const priorityHeader = document.createElement('div');
    priorityHeader.textContent = 'Priority';
    todoListHeader.appendChild(priorityHeader);

    // Create the column for the task date
    const dueDateHeader = document.createElement('div');
    dueDateHeader.textContent = 'Due Date';
    todoListHeader.appendChild(dueDateHeader);

    /*
     * ============================================================
     * CREATE THE ROWS FOR THE TO-DO LIST CHART
     * ============================================================
     */

    const taskRowsContainer = document.createElement('div');
    taskRowsContainer.classList.add('task-rows');

    loadTodayRows(taskRowsContainer, todoListChart);
}

function loadTodayRows(taskRowsContainer, todoListChart) {
    const todayDate = format(startOfToday(), 'yyyy-MM-dd');
    const renderedTaskList = allProjects.projects.flatMap((project) =>
        project.taskList.filter((task) => task.dueDate === todayDate)
    );

    for (const task of renderedTaskList) {
        const taskRow = document.createElement('div');
        taskRow.classList.add('task-row', 'today-task-row');

        // Create task description column, add styling and add to the task-row container
        const taskDescription = document.createElement('div');
        taskDescription.classList.add('task-cell', 'task-description');
        taskDescription.textContent = task.description;
        taskRow.appendChild(taskDescription);

        // Create task status, add styling and add to the task-row container
        const taskStatus = document.createElement('div');
        taskStatus.classList.add('task-cell', 'task-status');

        const taskStatusButton = document.createElement('div');
        taskStatusButton.classList.add('task-status-button');
        taskStatus.appendChild(taskStatusButton);
        taskRow.appendChild(taskStatus);

        // Create task priority column, add styling and add to the task-row container
        const taskPriority = document.createElement('div');
        taskPriority.classList.add('task-cell', 'task-priority', `priority-${task.priority.toLowerCase()}`);
        taskPriority.textContent = task.priority;
        taskRow.appendChild(taskPriority);

        // Create task date column, add styling and add to the task-row container
        const taskDate = document.createElement('div');
        taskDate.classList.add('task-cell', 'task-date');
        taskDate.textContent = task.dueDate;
        taskRow.appendChild(taskDate);

        if (task.isCompleted) {
            taskStatusButton.textContent = 'Completed!';
            taskStatusButton.classList.add('task-status-completed');
            taskRow.classList.add('task-row-completed');
        } else {
            taskStatusButton.textContent = 'Not Completed!';
        }

        // Wrapper div used for row selection
        taskRowsContainer.appendChild(taskRow);
    }

    // Append everything to the todoList chart container
    todoListChart.appendChild(taskRowsContainer);
}
