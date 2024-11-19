export function handleProjectToolbarView(user){
    user.pubSub.subscribe('project-change', handleProjectChange);

    const projectTitle = document.querySelector(".project-toolbar-title");

    function handleProjectChange(project){
        projectTitle.textContent = project.title;
    }
}