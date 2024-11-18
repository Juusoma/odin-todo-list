import { createPositionedTextInput } from "./positionedInput";


export function handleProjectView(user){
    const createProjectButton = document.querySelector(".create-project");
    createProjectButton.addEventListener("click", () => {
        const hasPositionedInput = createProjectButton.querySelector(".positioned-input-container");
        if(!hasPositionedInput){
            createPositionedTextInput(createProjectButton, handleProjectCreateInput);
        }
    });
    
    function handleProjectCreateInput(inputValue){
        if(typeof inputValue === 'string'){
            const newProject = user.addProject(inputValue);
            user.loadProject(newProject.id);
            //user.log();
        }
    }

    user.pubSub.subscribe('project-add', handleProjectAdd);
    user.pubSub.subscribe('project-remove', handleProjectRemove);
    user.pubSub.subscribe('project-change', handleProjectChange);

    const projectsListContainer = document.querySelector(".projects-list");
    const projectCreationButton = document.querySelector(".create-project");
    projectsListContainer.addEventListener("click", handleProjectListClick);

    function handleProjectAdd(project){
        if(typeof project.title !== 'string'){
            console.error("Project title is invalid!", project);
        }

        const newProjectButton = document.createElement("button");
        newProjectButton.classList.add("project-button");
        newProjectButton.textContent = project.title;
        newProjectButton.dataset.projectId = project.id;
        projectsListContainer.insertBefore(newProjectButton, projectCreationButton);
    }

    function handleProjectRemove(_project){
        //TODO
    }

    function handleProjectChange(project){
        Array.from(projectsListContainer.children).forEach(x => {
            const projectId = x.dataset.projectId;
            if(projectId === project.id){
                x.classList.add("selected");
            }
            else{
                x.classList.remove("selected");
            }
        });
    }

    function handleProjectListClick(e){
        const projectId = e.target.dataset.projectId;
        if(projectId){
            user.loadProject(projectId);
        }
    }
}