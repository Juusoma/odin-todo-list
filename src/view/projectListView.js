import { makeElementDraggable, makeElementDropTarget } from "../utils/drag";
import { makePositionedInputContainer } from "./positionedInput";


export function handleProjectListView(user){
    const createProjectButton = document.querySelector(".create-project");
    makePositionedInputContainer(createProjectButton, handleCreateProjectInput);
    
    function handleCreateProjectInput(inputValue){
        if(typeof inputValue === 'string'){
            const newProject = user.addProject(inputValue);
            user.loadProject(newProject.id);
            //user.log();
        }
    }

    user.pubSub.subscribe('project-add', handleProjectAdd);
    user.pubSub.subscribe('project-remove', handleProjectRemove);
    user.pubSub.subscribe('project-change', handleProjectChange);
    user.pubSub.subscribe("info-change-project", handleProjectInfoChange);

    const projectsListContainer = document.querySelector(".projects-list");
    const projectCreationButton = document.querySelector(".create-project");
    const projectsCollapseButton = document.querySelector(".projects-collapse-button");
    projectsListContainer.addEventListener("click", handleProjectListClick);
    projectsCollapseButton.addEventListener("click", handleProjectsListCollapse);

    makeElementDropTarget(user, projectsListContainer, "project", true);

    function handleProjectAdd(project){
        if(typeof project.title !== 'string'){
            console.error("Project title is invalid!", project);
        }

        const newProjectButton = document.createElement("div");     // can't drag <button>! At least not well.
        newProjectButton.classList.add("project-button");
        newProjectButton.textContent = project.title;
        newProjectButton.dataset.id = project.id;

        //newProjectButton.addEventListener("mousedown", e => e.preventDefault());

        makeElementDraggable(newProjectButton, "project");


        projectsListContainer.insertBefore(newProjectButton, projectCreationButton);
    }

    function handleProjectInfoChange({id, title}){
        const projectButton = projectsListContainer.querySelector(`[data-id="${id}"]`);
        if(projectButton){
            projectButton.textContent = title;
        }
    }

    function handleProjectRemove(project){
        const projectButton = projectsListContainer.querySelector(`[data-id="${project.id}"]`);
        if(projectButton){
            projectButton.remove();
        }
    }

    function handleProjectChange(currentProject){
        Array.from(projectsListContainer.children).forEach(x => {
            const projectId = x.dataset.id;
            if(currentProject && projectId === currentProject.id){
                x.classList.add("selected");
            }
            else{
                x.classList.remove("selected");
            }
        });
    }

    function handleProjectListClick(e){
        const projectId = e.target.dataset.id;
        if(projectId){
            user.loadProject(projectId);
        }
    }

    function handleProjectsListCollapse(){
        projectsListContainer.classList.toggle("collapse");
    }
}