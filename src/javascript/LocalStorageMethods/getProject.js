function getProjectFromLocalStorage(projectID) {
    const savedProjects = getAllProjectsFromLocalStorage();
    return savedProjects?.find((project) => project.ID === projectID);
}

function getAllProjectsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('allProjects'));
}

export { getAllProjectsFromLocalStorage, getProjectFromLocalStorage };
