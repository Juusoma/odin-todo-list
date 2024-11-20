export function handleProjectToolbarView(user){
    user.pubSub.subscribe('project-change', handleProjectChange);

    const projectToolbar = document.querySelector(".project-toolbar-container");
    const projectTitle = projectToolbar.querySelector(".project-toolbar-title");
    const projectSettings = projectToolbar.querySelector(".project-toolbar-settings");
    projectSettings.addEventListener("click", handleProjectSettings);

    const projectSettingsModal = document.querySelector(".project-settings");

    projectTitle.addEventListener("keyup", (e) => {
        if(e.key === "Enter")
            projectTitle.blur();
    });

    projectTitle.addEventListener("blur", handleProjectTitleChange);

    function handleProjectChange(project){
        projectTitle.value = project.title;
    }

    function handleProjectSettings(){
        projectSettingsModal.showModal();
        const rect = projectToolbar.getBoundingClientRect();
        projectSettingsModal.style.top = rect.bottom +"px";
        projectSettingsModal.style.left = rect.left +"px";
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