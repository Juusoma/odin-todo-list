import { makePositionedInputContainer } from "./positionedInput";
import { handleTodoItemView } from "./todoItemView";

export function handleTodoListView(user){
    user.pubSub.subscribe('project-change', handleProjectChange);
    user.pubSub.subscribe('todo-list-add', handleTodoListAdd);
    user.pubSub.subscribe('todo-list-remove', handleTodoListRemove);

    const listsContainer = document.querySelector(".lists-main-container");

    function handleProjectChange(project){
        clearLists();
        initializeTodoLists(project);
    }

    function clearLists(){
        listsContainer.innerHTML = "";
        const newListButton = document.createElement("button");
        newListButton.classList.add("add-todo-list", "basic-button");
        newListButton.textContent = "+ Add list";
        listsContainer.appendChild(newListButton);

        makePositionedInputContainer(newListButton, handleCreateTodoListInput);

        function handleCreateTodoListInput(title){
            user.currentProject.addTodoList(title);
        }
    }

    function initializeTodoLists(project){
        project.todoLists.forEach(x => {
            handleTodoListAdd(x);
        });
    }

    function handleTodoListAdd(todoList){
        const listElement = document.createElement("div");
        listElement.classList.add("list-container");
        listElement.dataset.id = todoList.id;
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

        handleTodoItemView(user, todoList, listElement);
    }

    function handleTodoListRemove(todoList){
        //TODO
    }
}