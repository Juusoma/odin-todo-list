export function handleProjectToolbarView(user){
    user.pubSub.subscribe('project-change', handleProjectChange);

    const projectToolbar = document.querySelector(".project-toolbar-container");
    const projectTitle = projectToolbar.querySelector(".project-toolbar-title");
    const projectSettings = projectToolbar.querySelector(".project-toolbar-settings");
    projectSettings.addEventListener("click", handleProjectSettings);

    const projectSettingsModal = document.querySelector(".project-settings");

    function handleProjectChange(project){
        projectTitle.textContent = project.title;
    }

    function handleProjectSettings(){
        projectSettingsModal.showModal();
        const rect = projectToolbar.getBoundingClientRect();
        projectSettingsModal.style.top = rect.bottom +"px";
        projectSettingsModal.style.left = rect.left +"px";
    }
}