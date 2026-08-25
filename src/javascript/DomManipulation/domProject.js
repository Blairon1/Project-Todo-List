import Project from '../Logic/project.js';
import allProjects  from "../Logic/projectCollection.js";
import {getAllProjectsFromLocalStorage} from "../LocalStorageMethods/getProject.js";
import closeIcon from '../../assets/icons/close.svg';
import {loadCalendarPage} from './domCalendar.js';

/*
 * ============================================================
 * Dom References
 * ============================================================
 */

const $createProjectDialog = document.querySelector('#project-modal');
const $openProjectButton = document.querySelector('#plus-icon');
const $closeProjectButton = document.querySelector('#close-icon');

const $createProjectForm = document.querySelector('#create-project-form');
const $projectsTab = document.querySelector('#projects');

const $projectDeleteBtn = document.querySelector('project-delete-icon');

/*
 * ============================================================
 * OPEN/CLOSE PROJECT CREATION PROMPT 
 * ============================================================
 */


$openProjectButton.addEventListener('click', ()=>{
    $createProjectDialog.showModal();
});

$closeProjectButton.addEventListener('click', ()=>{
    $createProjectDialog.close();
})


/*
 * ============================================================
 * CREATE NEW PROJECT
 * ============================================================
 */


$createProjectForm.addEventListener('submit', (event)=>{
    event.preventDefault();

    // Create Project object with description and empty task list
    const newProject = new Project($createProjectForm.elements.projectName.value, []);

    // Add a new project container
    const newProjectTabContainer = document.createElement('div');
    newProjectTabContainer.classList.add('new-project-container');
    newProjectTabContainer.dataset.ID = newProject.ID;


    // Add the new project to the tab in the sidebar
    const newProjectTab = document.createElement('div'); 
    newProjectTab.classList.add('new-projects');
    newProjectTab.textContent = $createProjectForm.elements.projectName.value;
    newProjectTab.dataset.ID = newProject.ID;
    newProjectTabContainer.appendChild(newProjectTab);

    // Add a close icon button to delete project
    const deleteProjectIcon = document.createElement('img');
    deleteProjectIcon.src = closeIcon;
    deleteProjectIcon.alt = "Delete Icon";
    deleteProjectIcon.id = "project-delete-icon";
    deleteProjectIcon.dataset.ID = newProject.ID;
    newProjectTabContainer.appendChild(deleteProjectIcon);
    

    $projectsTab.appendChild(newProjectTabContainer); // Add to the HTML projects tab
    allProjects.addProject(newProject);               // Add the new project object to the projectCollection object


    $createProjectDialog.close();
    $createProjectForm.elements.projectName.value = '';
})



/*
 * ============================================================
 * DELETE PROJECT
 * ============================================================
 */
//Event Delegation, add an event to any nearest element of the projects container
$projectsTab.addEventListener('click', (event) => {

    const $clickedProject = event.target.closest('.new-project-container');
    //console.log("Delete button clicked!");
    // Check if a delete button is being clicked
    if(event.target.matches ('#project-delete-icon')){
        //console.log("Jackpot!");
        allProjects.deleteProject($clickedProject);
        $projectsTab.removeChild($clickedProject);
        loadCalendarPage();
    }

});


/*
 * ============================================================
 * BUILD PROJECT SIDEBAR
 * ============================================================
 */
function buildProjectSidebar(){
    const allProjectsSavedLS = getAllProjectsFromLocalStorage();
    
    if(allProjectsSavedLS.length > 0){
        for(let i = 0; i < allProjectsSavedLS.length; i++){
            // Create Project object with description and empty task list
            const newProject = new Project(allProjectsSavedLS[i].name, allProjectsSavedLS[i].taskList);
            newProject.ID = allProjectsSavedLS[i].ID;

            // Add a new project container
            const newProjectTabContainer = document.createElement('div');
            newProjectTabContainer.classList.add('new-project-container');
            newProjectTabContainer.dataset.ID = newProject.ID;


            // Add the new project to the tab in the sidebar
            const newProjectTab = document.createElement('div'); 
            newProjectTab.classList.add('new-projects');
            newProjectTab.textContent = allProjectsSavedLS[i].name;
            newProjectTab.dataset.ID = newProject.ID;
            newProjectTabContainer.appendChild(newProjectTab);

            // Add a close icon button to delete project
            const deleteProjectIcon = document.createElement('img');
            deleteProjectIcon.src = closeIcon;
            deleteProjectIcon.alt = "Delete Icon";
            deleteProjectIcon.id = "project-delete-icon";
            deleteProjectIcon.dataset.ID = newProject.ID;
            newProjectTabContainer.appendChild(deleteProjectIcon);
            

            $projectsTab.appendChild(newProjectTabContainer); // Add to the HTML projects tab
            allProjects.addProject(newProject);               // Add the new project object to the projectCollection object
        }
    }
}


/*
 * ============================================================
 * RENDER PROJECT SIDEBAR
 * ============================================================
 */
(function renderProjectSiderbar(){
    buildProjectSidebar();
})();