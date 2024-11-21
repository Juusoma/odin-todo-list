import { makeElementDraggable, makeElementDropTarget } from "../utils/drag";
import { makePositionedInputContainer } from "./positionedInput";
import { handleTodoItemView } from "./todoItemView";

export function handleTodoListView(user){
    user.pubSub.subscribe('project-change', handleProjectChange);
    user.pubSub.subscribe('todo-list-add', handleTodoListAdd);
    user.pubSub.subscribe('todo-list-remove', handleTodoListRemove);

    const listsContainer = document.querySelector(".lists-main-container");
    makeElementDropTarget(user, listsContainer, "todo-list", false);

    handleProjectChange();

    function handleProjectChange(project){
        clearLists(project != null);
        initializeTodoLists(project);
    }

    function clearLists(createNewListButton){
        listsContainer.innerHTML = "";
        if(createNewListButton){
            const newListButton = document.createElement("button");
            newListButton.classList.add("add-todo-list", "basic-button");
            newListButton.textContent = "+ Add list";
            listsContainer.appendChild(newListButton);
    
            makePositionedInputContainer(newListButton, handleCreateTodoListInput);
    
    
            function handleCreateTodoListInput(title){
                user.currentProject.addTodoList(title);
            }
        }
    }

    function initializeTodoLists(project){
        if(!project) return;

        project.todoLists.forEach(x => {
            handleTodoListAdd(x);
        });
    }

    function handleTodoListAdd(todoList){
        if(!user.currentProject) return;

        const listElement = document.createElement("div");
        listElement.classList.add("list-container");
        listElement.dataset.id = todoList.id;
        listElement.innerHTML = `
            <div class="list-title-container" draggable="true">
                <h2 class="list-title">
                    ${todoList.title}
                </h2>
            </div>
            <div class="list-items-container"></div>
            <button class="add-todo-item basic-button">
                + Add item
            </button>
        `;
        listElement.style.setProperty("--list-hue", todoList.hue + "deg");
        const addListButton = listsContainer.querySelector(".add-todo-list");

        const titleElement = listElement.querySelector(".list-title-container");
        makeElementDraggable(titleElement, "todo-list");
        const todoItemsContainer = listElement.querySelector(".list-items-container");
        makeElementDropTarget(user, listElement, "todo-item", true, todoItemsContainer);

        listsContainer.insertBefore(listElement, addListButton);

        handleTodoItemView(user, todoList, listElement);
    }

    function handleTodoListRemove(todoList){
        //TODO
    }
}