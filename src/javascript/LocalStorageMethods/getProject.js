function getProjectFromLocalStorage(projectID){
    const allRetriviedProjects = getAllProjectsFromLocalStorage();
    const retrivedProject = allRetriviedProjects.find(project => project.ID === projectID);
    return retrivedProject;
}

function getAllProjectsFromLocalStorage(){
    return JSON.parse(localStorage.getItem("allProjects"));
}


export {getAllProjectsFromLocalStorage, getProjectFromLocalStorage};
