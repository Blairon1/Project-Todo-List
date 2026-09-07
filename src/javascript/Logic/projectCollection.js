function createProjectCollection() {
    const projects = [];

    function addProject(project) {
        projects.push(project);
        localStorage.setItem('allProjects', JSON.stringify(projects));
    }

    function deleteProject(projectElement) {
        for (let projectIndex = 0; projectIndex < projects.length; projectIndex++) {
            if (projectElement.dataset.ID === projects[projectIndex].ID) {
                projects.splice(projectIndex, 1);
                break;
            }
        }

        localStorage.setItem('allProjects', JSON.stringify(projects));
    }

    return {
        projects,
        addProject,
        deleteProject,
    };
}

const allProjects = createProjectCollection();

export default allProjects;
