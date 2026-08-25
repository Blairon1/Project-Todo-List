import allProjects  from "../Logic/projectCollection.js";
import {getAllProjectsFromLocalStorage, getProjectFromLocalStorage} from "../LocalStorageMethods/getProject.js";

// ============================================================
// DOM REFERENCES
// ============================================================

const $projects = document.querySelector('#projects');
const $taskRow = document.querySelector('#task-row');
const $homePage = document.querySelector('#home-page');

const $closeTaskDialog = document.querySelector('#close-taskcreation');
const $createTaskDialog = document.querySelector('#create-new-task');
const $createTaskForm = document.querySelector('#task-form');


// ============================================================
// STATE
// ============================================================

let currentJSProject = null;
let $currentSelectedProjectTab = null;
let currentJSProjectTask = null;


// ============================================================
// PROJECT CLICK
// ============================================================

// Event Delegation, add an event to any nearest element of the projects container
$projects.addEventListener('click', (event) => {

    const $clickedProject = event.target.closest('.new-projects');
    const $allClickedProjects = $projects.querySelectorAll('.new-project-container');

    // If a project tab isn't clicked, ignore it
    if (!$clickedProject) return;

    // Handle highlighing the selected project
    $allClickedProjects .forEach(project => {
        if (project.dataset.ID === $clickedProject.dataset.ID) {
            project.classList.add('selected');

            const $highlightedProject = project; // Save this variable to local storage at a later date
        }else{
            project.classList.remove('selected');
        }
    });

    // Save the currently selected project (HTML)
    $currentSelectedProjectTab = $clickedProject;

    for(const project of allProjects.projects){
        if($currentSelectedProjectTab.dataset.ID == project.ID){

            // Current project selected by the user found in the local storage
            currentJSProject = project;
            const projectFromLocalStorage = getProjectFromLocalStorage(currentJSProject.ID);

            // Upon clicking the project tab, render the entire home page
            renderProjectPage(projectFromLocalStorage, $currentSelectedProjectTab);
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
            $createTaskForm.elements.taskDue.value
        );
    $createTaskDialog.close();
    $createTaskForm.reset(); 

    const projectFromLocalStorage = getProjectFromLocalStorage(currentJSProject.ID);

    renderProjectPage(projectFromLocalStorage, $currentSelectedProjectTab);
});


// Close the form for creating a new task
$closeTaskDialog.addEventListener('click', ()=>{
    $createTaskDialog.close();
});



// ============================================================
// EDIT TASK PROPERTIES
// ============================================================

// Event Delegation, add an event to any nearest element of the projects container
$taskRow.addEventListener('click', (event) => {

    const $clickedRow = event.target.closest('.new-row-wrapper');

    // If a project tab isn't clicked, ignore it
    if (!$clickedRow) return;

    console.log("Clicked!");

});




/*
 * ============================================================
 * RENDER THE PROJECT PAGE WITH ALL TASKS
 * ============================================================
 */


function renderProjectPage(currentJSProject, currentSelectedProjectHTML){
    buildProjectListHeader(currentJSProject, currentSelectedProjectHTML)
}




/**
 *
 * @param {object} currentProjectJS
 * The project object reflecting the currently selected project HTML element
 * 
 * 
 * @param {HTML} currentProjectHTML
 * The currently selected project HTML element
 */

function buildProjectListHeader(currentJSProject, currentSelectedProjectHTML){
    $homePage.replaceChildren(); // Clear the main section of home page before rendering content

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

    // Create the column for the task numbers
    const $taskNumberHeader = document.createElement('div');
    $taskNumberHeader.id = "task-number-header";
    $taskNumberHeader.textContent = "#";
    $todoListRowHeader.appendChild($taskNumberHeader);

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

    buildProjectListTasks(currentSelectedProjectHTML, $taskRowsContainer, currentJSProject, $todoListChart);
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
 * 
 * @param {Object} currentJSProjectTask
 * The current select object of the project
 */



function buildProjectListTasks(currentHTMLProject, taskRowContainer, currentProjectJS, todoList){
    
    if(currentProjectJS.taskList.length > 0){
        for(const task of currentProjectJS.taskList){

            const newlyCreatedRow = document.createElement('div');
            newlyCreatedRow.id = "new-row-wrapper";
            newlyCreatedRow.dataset.ID = task.taskID;


            // Create task number column, add styling and add to the task-row container
            const $taskNumber = document.createElement('div');
            $taskNumber.id = "task-number" 
            $taskNumber.classList.add('task');
            $taskNumber.textContent = task.taskNumber;
            $taskNumber.dataset.ID = task.ID;
            newlyCreatedRow.appendChild($taskNumber);

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


            if(task.taskStatus == "true"){
                //taskRowContainer.style.backgroundColor = "#1eff16";
                $taskStatusBtn.textContent = "Completed!";
            }else{
                //taskRowContainer.style.backgroundColor = "#ffc354";
                $taskStatusBtn.textContent = "Not Completed!";
            }

            $taskStatus.appendChild($taskStatusBtn);
            newlyCreatedRow.appendChild($taskStatus);

            // Create task priority column, add styling and add to the task-row container
            const $taskPriority = document.createElement('div');
            $taskPriority.id = "task-priority";
            $taskPriority.classList.add('task');
            $taskPriority.textContent = task.taskPriority;
            $taskPriority.dataset.ID = task.ID;
            newlyCreatedRow.appendChild($taskPriority);

            // Create task priority column, add styling and add to the task-row container
            const $taskDate = document.createElement('div');
            $taskDate.id = "task-date";
            $taskDate.classList.add('task');
            $taskDate.textContent = task.taskDueDate;
            $taskDate.dataset.ID = task.ID;
            newlyCreatedRow.appendChild($taskDate);


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




    
    



