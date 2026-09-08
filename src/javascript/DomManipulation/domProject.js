import Project from '../Logic/project.js';
import Task from '../Logic/task.js';
import allProjects from '../Logic/projectCollection.js';
import { getAllProjectsFromLocalStorage } from '../LocalStorageMethods/getProject.js';
import closeIcon from '../../assets/icons/close.svg';
import { loadCalendarPage } from './domCalendar.js';

/*
 * ============================================================
 * DOM REFERENCES
 * ============================================================
 */

const projectDialog = document.querySelector('#project-modal');
const openProjectButton = document.querySelector('#plus-icon');
const closeProjectButton = document.querySelector('#close-icon');
const createProjectForm = document.querySelector('#create-project-form');
const projectsContainer = document.querySelector('#projects');

/*
 * ============================================================
 * OPEN/CLOSE PROJECT CREATION PROMPT
 * ============================================================
 */

openProjectButton.addEventListener('click', () => {
    projectDialog.showModal();
});

closeProjectButton.addEventListener('click', () => {
    projectDialog.close();
});

/*
 * ============================================================
 * PROJECT SIDEBAR HELPERS
 * ============================================================
 */

function createProjectSidebarItem(project) {
    // Add a new project container
    const projectContainer = document.createElement('div');
    projectContainer.classList.add('project-item');
    projectContainer.dataset.projectId = project.id;

    // Add the new project to the tab in the sidebar
    const projectTab = document.createElement('div');
    projectTab.classList.add('project-name');
    projectTab.textContent = project.name;
    projectTab.dataset.projectId = project.id;
    projectContainer.appendChild(projectTab);

    // Add a close icon button to delete project
    const deleteProjectIcon = document.createElement('img');
    deleteProjectIcon.src = closeIcon;
    deleteProjectIcon.alt = 'Delete Icon';
    deleteProjectIcon.classList.add('project-delete-icon');
    deleteProjectIcon.dataset.projectId = project.id;
    projectContainer.appendChild(deleteProjectIcon);

    return projectContainer;
}

function restoreProject(savedProject) {
    // Creating new instances ensures methods are preserved after JSON parsing
    const restoredProject = new Project(savedProject.name, []);
    restoredProject.id = savedProject.id;

    for (const savedTask of savedProject.taskList ?? []) {
        const restoredTask = new Task(
            savedTask.taskNumber,
            savedTask.description,
            savedTask.priority,
            savedTask.dueDate,
            savedTask.isCompleted
        );

        restoredTask.id = savedTask.id;
        restoredProject.taskList.push(restoredTask);
    }

    restoredProject.taskListDueDates = [...restoredProject.taskList].sort(
    (firstTask, secondTask) => firstTask.dueDate.localeCompare(secondTask.dueDate) );
    restoredProject.taskListPriority = [
        ...restoredProject.taskList.filter((task) => task.priority === 'High'),
        ...restoredProject.taskList.filter((task) => task.priority === 'Medium'),
        ...restoredProject.taskList.filter((task) => task.priority === 'Low'),
    ];

    return restoredProject;
}

/*
 * ============================================================
 * CREATE NEW PROJECT
 * ============================================================
 */

createProjectForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const projectName = createProjectForm.elements.projectName.value;

    // Create Project object with description and empty task list
    const newProject = new Project(projectName, []);

    projectsContainer.appendChild(createProjectSidebarItem(newProject));
    allProjects.addProject(newProject); // Add the new project object to the projectCollection object

    projectDialog.close();
    createProjectForm.reset();
});

/*
 * ============================================================
 * DELETE PROJECT
 * ============================================================
 */

// Event Delegation, add an event to any nearest element of the projects container
projectsContainer.addEventListener('click', (event) => {
    const projectContainer = event.target.closest('.project-item');

    // Check if a delete button is being clicked
    if (event.target.matches('.project-delete-icon') && projectContainer) {
        allProjects.deleteProject(projectContainer);
        projectContainer.remove();
        loadCalendarPage();
        alert("Project Deleted!");
    }
});

/*
 * ============================================================
 * BUILD PROJECT SIDEBAR
 * ============================================================
 */

function buildProjectSidebar() {
    const savedProjects = getAllProjectsFromLocalStorage();

    if (!savedProjects) {
        return;
    }

    for (const savedProject of savedProjects) {
        const restoredProject = restoreProject(savedProject);

        projectsContainer.appendChild(createProjectSidebarItem(restoredProject));
        allProjects.addProject(restoredProject); // Add the new project object to the projectCollection object
    }
}

/*
 * ============================================================
 * RENDER PROJECT SIDEBAR
 * ============================================================
 */

(function renderProjectSidebar() {
    buildProjectSidebar();
})();
