import { makeElementDraggable, makeElementDropTarget } from "../utils/drag";
import { createDropdownButton } from "./dropdown";
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
                    <button class="list-options icon-button">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/></svg>
                    </button>
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

        // Insert the list before creating dropdown for correct dropdown placement
        const optionsDropdownButton = listElement.querySelector(".list-options");
        createDropdownButton(optionsDropdownButton, [{
            name: "Delete",
            svg: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg>`,
            buttonClass: "delete",
            onclick: () => {
                if(confirm("Are you sure you want to DELETE the list?"))
                    user.currentProject?.removeTodoList(todoList.id);
            },
        }]);

        handleTodoItemView(user, todoList, listElement);
    }

    function handleTodoListRemove(todoList){
        const listElement = listsContainer.querySelector(`[data-id="${todoList.id}"]`);
        console.log(todoList.id);
        if(listElement){
            listElement.remove();
        }
    }
}