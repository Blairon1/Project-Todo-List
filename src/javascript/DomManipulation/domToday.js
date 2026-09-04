import { startOfToday, format } from 'date-fns';
import allProjects from '../Logic/projectCollection.js';



// ============================================================
// DOM REFERENCES
// ============================================================
const $todayTab = document.querySelector('#today-tab');
const $homePage = document.querySelector('#home-page');


// ============================================================
// STATE
// ============================================================


// ============================================================
// TODAY TAB CLICK
// ============================================================

// Event Delegation, add an event to any nearest element of the projects container
$todayTab.addEventListener('click', (event) => {
    console.log("Clicked!");
    renderTodayPage();
});


function renderTodayPage(){
    $homePage.replaceChildren();
    loadTodayPageHeader();
}


function loadTodayPageHeader(){
    const $todayHeader = document.createElement('h1');
    $todayHeader.id = "today-header";
    $todayHeader.textContent = "Today's Tasks";
    $homePage.appendChild($todayHeader);

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



    loadTodayRows($taskRowsContainer, $todoListChart);
}

function loadTodayRows(taskRowsContainer, todoListChart){
    let renderedTaskList = [];
    for(let projectIndex = 0; projectIndex < allProjects.projects.length; projectIndex++){
        const todayDate = format(startOfToday(), 'yyyy-MM-dd');
        renderedTaskList.push(...allProjects.projects[projectIndex].taskList.filter( task => task.taskDueDate == todayDate));
        console.log(renderedTaskList);
        console.log(allProjects.projects[projectIndex]);
    }
    
    if(renderedTaskList.length > 0){
        for(const task of renderedTaskList){

            const newlyCreatedRow = document.createElement('div');
            newlyCreatedRow.classList.add("new-row-wrapper");
            newlyCreatedRow.style.pointerEvents = "none";


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
            taskRowsContainer.appendChild(newlyCreatedRow);
         
        }
            //Append everything to the todoList chart container
            todoListChart.appendChild(taskRowsContainer); 
    }
}