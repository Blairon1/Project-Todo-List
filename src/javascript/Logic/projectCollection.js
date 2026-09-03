function projectCollection(){
    let projects = [];

    function addProject(project){
        projects.push(project);
        localStorage.setItem("allProjects", JSON.stringify(projects));
    }
    
    function deleteProject(project){
        for(let i = 0; i < projects.length; i++){
            if(project.dataset.ID == projects[i].ID){
                projects.splice(i, 1);
            }
        }
        localStorage.setItem("allProjects", JSON.stringify(projects));
    }

    return{
        projects,
        addProject,
        deleteProject,
    };
}
const allProjects = projectCollection();

export default allProjects;