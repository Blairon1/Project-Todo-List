export default function projectCollection(){
    let projects = [];
    let projectsByDate = [];
    let projectsByPrority = [
        [],
        [],
        [],
    ];
    let projectsCompleted = [];

    function addProject(project){
        projects.push(project);
    }
    
    function deleteProject(project){
        for(let i = 0; i < projects.length; i++){
            if(project.dataset.ID == projects[i].ID){
                projects.splice(i, 1);
            }
        }
    }

    return{
        projects,
        addProject,
        deleteProject,
    };
}