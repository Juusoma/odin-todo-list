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
            user.addProject(inputValue);
            user.log();
        }
    }

    user.pubSub.subscribe('project-add', handleProjectAdd);
    user.pubSub.subscribe('project-remove', handleProjectRemove);
    const projectsContainer = document.querySelector(".projects-list");
    const projectCreationButton = document.querySelector(".create-project");

    function handleProjectAdd(project){
        if(typeof project.title !== 'string'){
            console.error("Project title is invalid!", project);
        }

        const newProjectButton = document.createElement("button");
        newProjectButton.classList.add("project-button");
        newProjectButton.textContent = project.title;
        projectsContainer.insertBefore(newProjectButton, projectCreationButton);
    }

    function handleProjectRemove(_project){
        //TODO
    }
}