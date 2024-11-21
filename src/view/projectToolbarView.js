import { createDropdownButton } from "./dropdown";

export function handleProjectToolbarView(user){
    user.pubSub.subscribe('project-change', handleProjectChange);

    const projectToolbar = document.querySelector(".project-toolbar-container");
    const projectTitle = projectToolbar.querySelector(".project-toolbar-title");
    const projectOptionsButton = projectToolbar.querySelector(".project-toolbar-options");



    createDropdownButton(projectOptionsButton, [
        {
            name: "Delete",
            svg: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg>`,
            buttonClass: "delete",
            onclick: () => {
                if(confirm("Are you sure you want to DELETE the project?"))
                    user.removeProject(user.currentProject?.id)
            },
        },
    ]);


    handleProjectChange(null);

    projectTitle.addEventListener("keyup", (e) => {
        if(e.key === "Enter")
            projectTitle.blur();
    });

    projectTitle.addEventListener("blur", handleProjectTitleChange);

    function handleProjectChange(project){
        if(!project){
            projectToolbar.style.visibility = "hidden";
        }else{
            projectToolbar.style.visibility = "visible";
            projectTitle.value = project.title;
        }
    }

    function handleProjectTitleChange(_e){
        if(user.currentProject){
            user.pubSub.publish("info-change-" + user.currentProject.id, {
                id: user.currentProject.id,
                title: projectTitle.value,
            });
        }
    }
}