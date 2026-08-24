import './css//Homestyle.css'; 
import './css/taskList.css';
import './javascript/DomManipulation/domCalendar.js';
import './javascript/DomManipulation/domProject.js';
import './javascript/DomManipulation/domTaskList.js'
import Task from './javascript/Logic/task.js';
import Project from './javascript/Logic/project.js';
import projectCollection from './javascript/Logic/projectCollection.js';


// /* Create an instance that will hold all projects created */
// const allProjects = projectCollection();

// const $homePage = document.querySelector('#home-page');

// // Testing of project and task creation
// const newProject = new Project("Project 1", []);
// allProjects.projects.push(newProject);

// newProject.createTask("To complete research paper", "high", "Wed Feb 11 2026");
// newProject.createTask("Browse Tumblr", "medium", "Wed Aug 08 2026");
// newProject.createTask("To post on AO3", "low", "Thu Aug 16 2026");
// newProject.createTask("Brush teeth", "low", "Sun Aug 16 2026");

// newProject.taskList[1].completeTask();
// console.log(newProject.taskList[1].taskStatus);
// newProject.deleteTask(4);
// console.log(newProject);
