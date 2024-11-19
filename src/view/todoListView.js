import { makePositionedInputContainer } from "./positionedInput";

export function handleTodoListView(user){
    user.pubSub.subscribe('project-change', handleProjectChange);
    user.pubSub.subscribe('todo-list-add', handleTodoListAdd);
    user.pubSub.subscribe('todo-list-remove', handleTodoListRemove);

    const listsContainer = document.querySelector(".lists-main-container");

    function handleProjectChange(project){
        clearLists();
    }

    function clearLists(){
        listsContainer.innerHTML = "";
        const newListButton = document.createElement("button");
        newListButton.classList.add("add-todo-list", "basic-button");
        newListButton.textContent = "+ Add list";
        listsContainer.appendChild(newListButton);

        makePositionedInputContainer(newListButton, handleCreateListInput);

        function handleCreateListInput(title){
            user.currentProject.addTodoList(title);
        }

        /*createProjectButton.addEventListener("click", () => {
            const hasPositionedInput = createProjectButton.querySelector(".positioned-input-container");
            if(!hasPositionedInput){
                createPositionedTextInput(createProjectButton, handleProjectCreateInput);
            }
        });*/
    }

    function handleTodoListAdd(todoList){
        const listElement = document.createElement("div");
        listElement.classList.add("list-container");
        listElement.innerHTML = `
            <div class="list-title-container">
                <h2 class="list-title">
                    ${todoList.title}
                </h2>
            </div>
            <div class="list-items-container">

            </div>
            <button class="add-todo-item basic-button">
                + Add item
            </button>
        `;
        const addListButton = listsContainer.querySelector(".add-todo-list");
        listsContainer.insertBefore(listElement, addListButton);
    }

    function handleTodoListRemove(todoList){

    }
}