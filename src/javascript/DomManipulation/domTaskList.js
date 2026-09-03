import allProjects  from "../Logic/projectCollection.js";
import {getAllProjectsFromLocalStorage, getProjectFromLocalStorage} from "../LocalStorageMethods/getProject.js";
import Task from "../Logic/task.js";
import Project from "../Logic/project.js";

// ============================================================
// DOM REFERENCES
// ============================================================

const $projects = document.querySelector('#projects');
const $taskRow = document.querySelector('#task-row');
const $homePage = document.querySelector('#home-page');

const $closeTaskDialog = document.querySelector('#close-taskcreation');
const $createTaskDialog = document.querySelector('#create-new-task');
const $createTaskForm = document.querySelector('#task-form');

const $closeEditTaskDialog = document.querySelector('#close-edit-task-icon');
const $createEditTaskDialog = document.querySelector('#edit-task-modal');
const $createEditTaskForm = document.querySelector('#edit-task-form');
const $deleteTaskBtn = document.querySelector('#delete-edit-task-btn');
const $statusTaskBtn = document.querySelector('#complete-edit-task-btn');


// ============================================================
// STATE
// ============================================================

let currentJSProject = null;
let $currentSelectedProjectTab = null;
let currentJSTaskSelected= null;
let $currentSelectedTaskTab = null;

let currentTaskFilter = "Default";


// ============================================================
// PROJECT CLICK
// ============================================================

// Event Delegation, add an event to any nearest element of the projects container
$projects.addEventListener('click', (event) => {

    const $clickedProject = event.target.closest('.new-projects');
    const $allClickedProjects = $projects.querySelectorAll('.new-project-container');

    // If a project tab isn't clicked, ignore it
    if (!$clickedProject) return;

    // Save the currently selected project (HTML)
    $currentSelectedProjectTab = $clickedProject;

    for(const project of allProjects.projects){
        if($currentSelectedProjectTab.dataset.ID == project.ID){

            // Current project selected by the user found in the local storage
            currentJSProject = project;

            // Upon clicking the project tab, build the project page's header and then render the entire home page
            buildProjectPageHeader(getProjectFromLocalStorage(currentJSProject.ID), $currentSelectedProjectTab);
        }
    }

});



// ============================================================
// CREATE TASK
// ============================================================

const $createTaskBtn = document.createElement('button');
$createTaskBtn.id = "create-task-btn";
$createTaskBtn.textContent = "Create New Task";

// Create Row for prompting users to create new tasks 
const $createTaskRow = document.createElement('div');
$createTaskRow.id = "create-task-row"
$createTaskRow.appendChild($createTaskBtn);

// Open the form for creating a new task
$createTaskBtn.addEventListener('click', ()=>{
    $createTaskDialog.showModal();
});

// Submit the data from the form for creating a new task
$createTaskForm.addEventListener('submit', (event)=>{
    event.preventDefault();

    currentJSProject.createTask
        (   $createTaskForm.elements.taskD.value,
            $createTaskForm.elements.taskP.value,
            $createTaskForm.elements.taskDue.value,
            false
        );
    $createTaskDialog.close();
    $createTaskForm.reset(); 

    renderProjectPage(getProjectFromLocalStorage(currentJSProject.ID), $currentSelectedProjectTab, currentTaskFilter);
});


// Close the form for creating a new task
$closeTaskDialog.addEventListener('click', ()=>{
    $createTaskDialog.close();
});



// ============================================================
// EDIT TASK PROPERTIES
// ============================================================

// Event Delegation, add an event to any nearest element of the projects container
$homePage.addEventListener('click', (event) => {
    event.preventDefault();
    $currentSelectedTaskTab = event.target.closest('.new-row-wrapper');

    // If a project tab isn't clicked, ignore it
    if (!$currentSelectedTaskTab) return;

    for(let i = 0; i < currentJSProject.taskList.length; i++){
        if(currentJSProject.taskList[i].taskID == $currentSelectedTaskTab.dataset.ID){
            currentJSTaskSelected = currentJSProject.taskList[i];
        }
    }

    if(currentJSTaskSelected.taskStatus == false){
        $createEditTaskDialog.showModal();

        $createEditTaskForm.elements.editDescription.value = currentJSTaskSelected.taskDescription;
        $createEditTaskForm.elements.editPriority.value = currentJSTaskSelected.taskPriority;
        $createEditTaskForm.elements.editDueDate.value = currentJSTaskSelected.taskDueDate;
    }
});

$createEditTaskForm.addEventListener('submit', (event)=>{
    event.preventDefault();

    currentJSTaskSelected.editTaskDescription($createEditTaskForm.elements.editDescription.value);
    currentJSTaskSelected.editTaskPriority($createEditTaskForm.elements.editPriority.value);
    currentJSTaskSelected.editTaskDueDate($createEditTaskForm.elements.editDueDate.value);

    currentJSProject.updateTaskLists();

    $createEditTaskDialog.close();
    $createEditTaskForm.reset();

    renderProjectPage(getProjectFromLocalStorage(currentJSProject.ID), $currentSelectedProjectTab, currentTaskFilter);
    console.log(currentJSProject.taskList);
});


$closeEditTaskDialog.addEventListener('click', ()=>{
    $createEditTaskDialog.close();
});


// ============================================================
// DELETE TASK BUTTON
// ============================================================
$deleteTaskBtn.addEventListener('click', ()=>{
    currentJSProject.deleteTask(currentJSTaskSelected.taskID);
    currentJSProject.updateTaskLists();

    $createEditTaskDialog.close();
    alert("Task Deleted!");
    renderProjectPage(getProjectFromLocalStorage(currentJSProject.ID), $currentSelectedProjectTab, currentTaskFilter);
});


// ============================================================
// COMPLETE TASK BUTTON
// ============================================================
$statusTaskBtn.addEventListener('click', ()=>{
    currentJSTaskSelected.completeTask();
    $currentSelectedTaskTab.classList.add("completed");

    currentJSProject.updateTaskLists();
    $createEditTaskDialog.close();

    renderProjectPage(getProjectFromLocalStorage(currentJSProject.ID), $currentSelectedProjectTab, currentTaskFilter);
});



function buildProjectPageHeader(currentJSProject, currentSelectedProjectHTML){
    $homePage.replaceChildren(); // Clear the main section of home page before rendering content

    /*
    * ============================================================
    *  BUILD THE PROJECT TITLE AND DROPBOX
    * ============================================================
    */


    const $projectHeader = document.createElement('h1');
    $projectHeader.id = "project-header";
    $projectHeader.textContent = currentJSProject.name;
    $homePage.appendChild($projectHeader);

    const $filterForm = document.createElement('form');

    $filterForm.action = '';
    $filterForm.method = 'POST';
    $filterForm.id = "task-filter-form";

    // Create the label for the dropdown.
    const $filterFormLabel = document.createElement('label');
    $filterFormLabel.textContent = "Select Filter";
    $filterFormLabel.htmlFor = 'taskFilters';

    const $filterDropbox = document.createElement('select');
    $filterDropbox.name = 'taskDropbox';
    $filterDropbox.id = 'taskDropbox';

    const filterOptions = ['Default', 'Date', 'Priority'];
    filterOptions.forEach((filterOption) =>{
        const $option = document.createElement('option');
        $option.value = filterOption;
        $option.textContent = filterOption.charAt(0).toUpperCase() + filterOption.slice(1);
        $filterDropbox.appendChild($option);
    });

    // Default value is january
    $filterDropbox.value = 'Default';

    $filterForm.appendChild($filterFormLabel);
    $filterForm.appendChild($filterDropbox);
    $homePage.appendChild($filterForm);


    $filterDropbox.addEventListener('change', (event) => {
        currentTaskFilter = event.target.value;

        document.querySelector('#todo-list-chart').remove();
        buildProjectListHeader(getProjectFromLocalStorage(currentJSProject.ID), currentSelectedProjectHTML, currentTaskFilter);
    });

    renderProjectPage(currentJSProject, currentSelectedProjectHTML, currentTaskFilter);
}


/*
 * ============================================================
 * RENDER THE PROJECT PAGE WITH ALL TASKS
 * ============================================================
 */


function renderProjectPage(currentJSProject, currentSelectedProjectHTML, taskListDropbox){
    if(document.querySelector('#todo-list-chart') != null){
        document.querySelector('#todo-list-chart').remove();
    }
    buildProjectListHeader(currentJSProject, currentSelectedProjectHTML,taskListDropbox);
}



/**
 *
 * @param {object} currentProjectJS
 * The project object reflecting the currently selected project HTML element
 * 
 * 
 * @param {HTML} currentProjectHTML
 * The currently selected project HTML element
 * 
 * @param {HTML} taskListDropbox
 * The HTML element for the dropbox regarding task filtering
 * 
 */

function buildProjectListHeader(currentJSProject, currentSelectedProjectHTML, taskListDropbox){

    /*
    * ============================================================
    *  BUILD THE HEADER FOR THE TO-DO LIST CHART
    * ============================================================
    */

    // Container for the entire todoList chart
    const $todoListChart = document.createElement('div');
    $todoListChart.id = "todo-list-chart";
    $todoListChart.style.margin = "2rem"; // Add to the css file later
    $homePage.appendChild($todoListChart);

    // Container for the header for the todoList
    const $todoListRowHeader = document.createElement('div');
    $todoListRowHeader.classList.add("todo-list-row-header");
    $todoListChart.appendChild($todoListRowHeader);

    // Create the column for the task descriptions
    const $taskDescriptionHeader = document.createElement('div');
    $taskDescriptionHeader.id = "task-description-header";
    $taskDescriptionHeader.textContent = "Description";
    $todoListRowHeader.appendChild($taskDescriptionHeader);

    // Create the column for the task status
    const $taskStatusHeader = document.createElement('div');
    $taskStatusHeader.id = "task-status-header";
    $taskStatusHeader.textContent = "Status";
    $todoListRowHeader.appendChild($taskStatusHeader);

    // Create the column for the task priority
    const $taskPriorityHeader = document.createElement('div');
    $taskPriorityHeader.id = "task-priority-header";
    $taskPriorityHeader.textContent = "Priority";
    $todoListRowHeader.appendChild($taskPriorityHeader);

    // Create the column for the task date
    const $taskDateHeader = document.createElement('div');
    $taskDateHeader.id = "task-date-header";
    $taskDateHeader.textContent = "Due Dates";
    $todoListRowHeader.appendChild($taskDateHeader);

    /*
    * ============================================================
    *  CREATE THE ROWS FOR THE TO-DO LIST CHART
    * ============================================================
    */

    const $taskRowsContainer = document.createElement('div');
    $taskRowsContainer.id = "task-row";

    buildProjectListTasks(currentSelectedProjectHTML, $taskRowsContainer, currentJSProject, $todoListChart, taskListDropbox);
}


/*
 * ============================================================
 * BUILDING THE ROW FOR EACH TASK
 * ============================================================
 */



/**
 *
 * @param {HTML} project
 * The current project html element
 * 
 * @param {HTML} taskRowContainer
 * The HTML element for the current task row
 * 
 * 
 * @param {Object} currentProjectJS
 * The currently selected project in javascript "backend"
 * 
 * 
 * @param {HTML} todoList
 * The HTML element for the entire todoList chart
 * 
 * @param {HTML} taskListDropbox
 * The HTML element for the dropbox regarding task filtering
 * 
 */



function buildProjectListTasks(currentHTMLProject, taskRowContainer, currentProjectJS, todoList, taskListDropbox){
    
    if(currentProjectJS.taskList.length > 0){
        let renderedTaskList;
        if(currentTaskFilter == "Date"){
            renderedTaskList = currentProjectJS.taskListDueDates;
        }else if(currentTaskFilter == "Priority"){
            renderedTaskList = currentProjectJS.taskListPriority;
        }else{
            renderedTaskList = currentProjectJS.taskList;
        }

        for(const task of renderedTaskList){

            const newlyCreatedRow = document.createElement('div');
            newlyCreatedRow.classList.add("new-row-wrapper");
            newlyCreatedRow.dataset.ID = task.taskID;


            // Create task description column, add styling and add to the task-row container
            const $taskDescription = document.createElement('div');
            $taskDescription.id = "task-description";
            $taskDescription.classList.add('task');
            $taskDescription.textContent = task.taskDescription;
            newlyCreatedRow.appendChild($taskDescription);

             // Create task status, add styling and add to the task-row container
            const $taskStatus = document.createElement('div');
            $taskStatus.id = "task-status" 
            $taskStatus.classList.add('task');
            $taskStatus.dataset.ID = task.ID;

            const $taskStatusBtn = document.createElement('div');
            $taskStatusBtn.id = "task-status-btn";
            $taskStatus.appendChild($taskStatusBtn);
            newlyCreatedRow.appendChild($taskStatus);

            // Create task priority column, add styling and add to the task-row container
            const $taskPriority = document.createElement('div');
            $taskPriority.id = "task-priority";
            $taskPriority.classList.add('task');
            $taskPriority.textContent = task.taskPriority;
            $taskPriority.dataset.ID = task.ID;
            newlyCreatedRow.appendChild($taskPriority);

            if(task.taskPriority == "Low"){
                $taskPriority.style.color = "yellow";
            }else if(task.taskPriority == "Medium"){
                $taskPriority.style.color = "orange";
            }else{
                $taskPriority.style.color = "red";
            }


            // Create task priority column, add styling and add to the task-row container
            const $taskDate = document.createElement('div');
            $taskDate.id = "task-date";
            $taskDate.classList.add('task');
            $taskDate.textContent = task.taskDueDate;
            $taskDate.dataset.ID = task.ID;
            newlyCreatedRow.appendChild($taskDate);


            if(task.taskStatus == true){
                $taskStatusBtn.textContent = "Completed!";
                $taskDescription.classList.replace("task", "task-completed");
                $taskStatus.classList.replace("task", "task-completed");
                $taskStatusBtn.style.backgroundColor = "#2a721c"; $taskStatusBtn.style.fontSize = "1.5rem"; $taskStatusBtn.style.fontWeight = "bold";
    
                $taskPriority.classList.replace("task", "task-completed");
                $taskDate.classList.replace("task", "task-completed");
            }else{
                $taskStatusBtn.textContent = "Not Completed!";
            }


            // Wrapper div used for row selection
            taskRowContainer.appendChild(newlyCreatedRow);

            // Append everything to the todoList chart container
            todoList.appendChild(taskRowContainer);

            // Add the create new row at the end for future tasks
            todoList.appendChild($createTaskRow);            


        }
    }else{
        // If the project contains no tasks, append create new row at the end for future tasks
        todoList.appendChild($createTaskRow);
    }
    

}




    
    



