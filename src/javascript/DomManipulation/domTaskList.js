import allProjects from '../Logic/projectCollection.js';
import { getProjectFromLocalStorage } from '../LocalStorageMethods/getProject.js';

// ============================================================
// DOM REFERENCES
// ============================================================

const projectsContainer = document.querySelector('#projects');
const homePage = document.querySelector('#home-page');

const closeTaskDialogButton = document.querySelector('#close-taskcreation');
const createTaskDialog = document.querySelector('#create-new-task');
const createTaskForm = document.querySelector('#task-form');

const closeEditTaskDialogButton = document.querySelector('#close-edit-task-icon');
const editTaskDialog = document.querySelector('#edit-task-modal');
const editTaskForm = document.querySelector('#edit-task-form');
const deleteTaskButton = document.querySelector('#delete-edit-task-btn');
const completeTaskButton = document.querySelector('#complete-edit-task-btn');

// ============================================================
// STATE
// ============================================================

let currentProject = null;
let selectedProjectElement = null;
let selectedTask = null;
let selectedTaskElement = null;

let currentTaskFilter = 'Default';

// ============================================================
// PROJECT CLICK
// ============================================================

// Event Delegation, add an event to any nearest element of the projects container
projectsContainer.addEventListener('click', (event) => {
    const projectTab = event.target.closest('.project-name');

    // If a project tab isn't clicked, ignore it
    if (!projectTab || event.target.matches('.project-delete-icon')) {
        return;
    }

    // Save the currently selected project (HTML)
    selectedProjectElement = projectTab;
    currentProject = allProjects.projects.find(
        (project) => project.id === selectedProjectElement.dataset.projectId
    );

    if (!currentProject) {
        return;
    }

    // Upon clicking the project tab, build the project page's header and then render the entire home page
    buildProjectPageHeader(currentProject, selectedProjectElement);
});

// ============================================================
// CREATE TASK
// ============================================================

const createTaskButton = document.createElement('button');
createTaskButton.id = 'create-task-btn';
createTaskButton.textContent = 'Create New Task';

// Create Row for prompting users to create new tasks
const createTaskRow = document.createElement('div');
createTaskRow.id = 'create-task-row';
createTaskRow.appendChild(createTaskButton);

// Open the form for creating a new task
createTaskButton.addEventListener('click', () => {
    createTaskDialog.showModal();
});

// Submit the data from the form for creating a new task
createTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!currentProject) {
        return;
    }

    currentProject.createTask(
        createTaskForm.elements.taskD.value,
        createTaskForm.elements.taskP.value,
        createTaskForm.elements.taskDue.value,
        false
    );

    createTaskDialog.close();
    createTaskForm.reset();
    renderProjectPage(currentProject, selectedProjectElement, currentTaskFilter);
});

// Close the form for creating a new task
closeTaskDialogButton.addEventListener('click', () => {
    createTaskDialog.close();
});

// ============================================================
// EDIT TASK PROPERTIES
// ============================================================

// Event Delegation, add an event to any nearest element of the projects container
homePage.addEventListener('click', (event) => {
    const taskRow = event.target.closest('.task-row');

    // If a task row isn't clicked, ignore it
    if (!taskRow || !currentProject) {
        return;
    }

    selectedTaskElement = taskRow;
    selectedTask = currentProject.taskList.find(
        (task) => task.id === selectedTaskElement.dataset.taskId
    );

    if (!selectedTask || selectedTask.isCompleted) {
        return;
    }

    editTaskDialog.showModal();
    editTaskForm.elements.editDescription.value = selectedTask.description;
    editTaskForm.elements.editPriority.value = selectedTask.priority;
    editTaskForm.elements.editDueDate.value = selectedTask.dueDate;
});

editTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!selectedTask || !currentProject) {
        return;
    }

    selectedTask.editTaskDescription(editTaskForm.elements.editDescription.value);
    selectedTask.editTaskPriority(editTaskForm.elements.editPriority.value);
    selectedTask.editTaskDueDate(editTaskForm.elements.editDueDate.value);

    currentProject.updateTaskLists();
    editTaskDialog.close();
    editTaskForm.reset();

    renderProjectPage(currentProject, selectedProjectElement, currentTaskFilter);
});

closeEditTaskDialogButton.addEventListener('click', () => {
    editTaskDialog.close();
});

// ============================================================
// DELETE TASK BUTTON
// ============================================================

deleteTaskButton.addEventListener('click', () => {
    if (!selectedTask || !currentProject) {
        return;
    }

    currentProject.deleteTask(selectedTask.id);
    editTaskDialog.close();
    alert('Task Deleted!');

    renderProjectPage(currentProject, selectedProjectElement, currentTaskFilter);
});

// ============================================================
// COMPLETE TASK BUTTON
// ============================================================

completeTaskButton.addEventListener('click', (event) => {
    event.preventDefault();

    if (!selectedTask || !currentProject) {
        return;
    }

    selectedTask.completeTask();
    currentProject.updateTaskLists();
    editTaskDialog.close();

    renderProjectPage(currentProject, selectedProjectElement, currentTaskFilter);
});

function buildProjectPageHeader(project) {
    homePage.replaceChildren(); // Clear the main section of home page before rendering content

    /*
     * ============================================================
     * BUILD THE PROJECT TITLE AND DROPDOWN
     * ============================================================
     */

    const projectHeader = document.createElement('h1');
    projectHeader.id = 'project-header';
    projectHeader.textContent = project.name;
    homePage.appendChild(projectHeader);

    const filterForm = document.createElement('form');
    filterForm.action = '';
    filterForm.method = 'POST';
    filterForm.id = 'task-filter-form';

    // Create the label for the dropdown.
    const filterLabel = document.createElement('label');
    filterLabel.textContent = 'Select Filter';
    filterLabel.htmlFor = 'task-filters';

    const filterDropdown = document.createElement('select');
    filterDropdown.name = 'taskFilter';
    filterDropdown.id = 'task-filters';

    const filterOptions = ['Default', 'Date', 'Priority'];
    filterOptions.forEach((filterOption) => {
        const option = document.createElement('option');
        option.value = filterOption;
        option.textContent = filterOption;
        filterDropdown.appendChild(option);
    });

    filterDropdown.value = currentTaskFilter;

    filterForm.append(filterLabel, filterDropdown);
    homePage.appendChild(filterForm);

    filterDropdown.addEventListener('change', (event) => {
        currentTaskFilter = event.target.value;
        renderProjectPage(project, selectedProjectElement, currentTaskFilter);
    });

    renderProjectPage(project, selectedProjectElement, currentTaskFilter);
}

/*
 * ============================================================
 * RENDER THE PROJECT PAGE WITH ALL TASKS
 * ============================================================
 */

function renderProjectPage(project, projectElement, taskFilter) {
    homePage.querySelector('#todo-list-chart')?.remove();
    buildProjectListHeader(project, projectElement, taskFilter);
}

function buildProjectListHeader(project, projectElement, taskFilter) {
    /*
     * ============================================================
     * BUILD THE HEADER FOR THE TO-DO LIST CHART
     * ============================================================
     */

    // Container for the entire todoList chart
    const todoListChart = document.createElement('div');
    todoListChart.id = 'todo-list-chart';
    todoListChart.classList.add('project-task-list');
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

    buildProjectListTasks(
        projectElement,
        taskRowsContainer,
        project,
        todoListChart,
        taskFilter
    );
}

/*
 * ============================================================
 * BUILDING THE ROW FOR EACH TASK
 * ============================================================
 */

export function buildProjectListTasks(
    currentProjectElement,
    taskRowsContainer,
    project,
    todoList,
    taskFilter
) {
    let renderedTaskList = project.taskList;

    if (taskFilter === 'Date') {
        renderedTaskList = project.taskListDueDates;
    } else if (taskFilter === 'Priority') {
        renderedTaskList = project.taskListPriority;
    }

    for (const task of renderedTaskList) {
        const taskRow = document.createElement('div');
        taskRow.classList.add('task-row');
        taskRow.dataset.taskId = task.id;

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
    todoList.appendChild(taskRowsContainer);

    // Add the create new row at the end for future tasks
    todoList.appendChild(createTaskRow);
}
