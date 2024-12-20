import { makeElementDraggable, makeElementDropTarget } from "../utils/drag";
import { createDropdownButton } from "./dropdown";
import { makePositionedInputContainer } from "./positionedInput";
import { handleTodoItemView } from "./todoItemView";

export function handleTodoListView(user){
    user.pubSub.subscribe('project-change', handleProjectChange);
    user.pubSub.subscribe('todo-list-add', handleTodoListAdd);
    user.pubSub.subscribe('todo-list-remove', handleTodoListRemove);
    user.pubSub.subscribe("info-change-list", handleTodoListInfoChange);

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
                <h2 id="list-title-text" class="list-title">${todoList.title}</h2>
                <input hidden type="text" id="list-title-input" class="list-title basic-text-input" 
                onfocus="select()" maxlength="18" value="${todoList.title}">
                <button class="list-options icon-button">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/></svg>
                </button>
            </div>
            <div class="list-items-container"></div>
            <button class="add-todo-item basic-button">
                + Add item
            </button>
        `;
        listElement.style.setProperty("--list-hue", todoList.hue + "deg");
        const addListButton = listsContainer.querySelector(".add-todo-list");

        const titleContainer = listElement.querySelector(".list-title-container");
        makeElementDraggable(titleContainer, "todo-list");
        const todoItemsContainer = listElement.querySelector(".list-items-container");
        makeElementDropTarget(user, listElement, "todo-item", true, todoItemsContainer);

        
        const titleText = titleContainer.querySelector("#list-title-text");
        const titleInput = titleContainer.querySelector("#list-title-input");
        titleText.addEventListener("click", (e) => {
            titleText.setAttribute("hidden", true);
            titleInput.removeAttribute("hidden");
            titleInput.focus();
        });

        titleInput.addEventListener("blur", () => {
            titleInput.setAttribute("hidden", true);
            titleText.removeAttribute("hidden");
        });
        
        
        updateTitleInputSize();
            
        titleInput.addEventListener("keyup", (e) => {
            if(e.key === "Enter"){
                titleInput.blur();
            }
            updateTitleInputSize();
        });
    
        titleInput.addEventListener("blur", handleTodoListTitleChange);

        function updateTitleInputSize(){
            titleInput.setAttribute("size", titleInput.value.length);
        }

        function handleTodoListTitleChange(){
            todoList.changeInfo({title: titleInput.value})
            titleInput.value = todoList.title;
            updateTitleInputSize();
        }

        listsContainer.insertBefore(listElement, addListButton);

        // Insert the list before creating dropdown for correct dropdown placement
        const optionsDropdownButton = listElement.querySelector(".list-options");
        createDropdownButton(optionsDropdownButton, [
            {
                name: "Change hue",
                svg: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M346-140 100-386q-10-10-15-22t-5-25q0-13 5-25t15-22l230-229-106-106 62-65 400 400q10 10 14.5 22t4.5 25q0 13-4.5 25T686-386L440-140q-10 10-22 15t-25 5q-13 0-25-5t-22-15Zm47-506L179-432h428L393-646Zm399 526q-36 0-61-25.5T706-208q0-27 13.5-51t30.5-47l42-54 44 54q16 23 30 47t14 51q0 37-26 62.5T792-120Z"/></svg>`,
                onclick: () => {
                    todoList.changeInfo({hue: Math.floor(Math.random() * 360)});
                },
            },
            {
                name: `Delete list`,
                svg: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg>`,
                buttonClass: "delete",
                onclick: () => {
                    if(confirm("Are you sure you want to DELETE the list and its contents?"))
                        user.currentProject?.removeTodoList(todoList.id);
                    },
            },
        ]);

        handleTodoItemView(user, todoList, listElement);
    }

    function handleTodoListRemove(todoList){
        const listElement = listsContainer.querySelector(`[data-id="${todoList.id}"]`);
        if(listElement){
            listElement.remove();
        }
    }

    function handleTodoListInfoChange({id, title, hue}){
        const listElement = listsContainer.querySelector(`[data-id="${id}"]`);
        if(listElement){
            if(title){
                const titleText = listElement.querySelector("#list-title-text");
                const titleInput = listElement.querySelector("#list-title-input");
                titleText.textContent = title;
                titleInput.textContent = title;
            }
            if(hue){
                listElement.style.setProperty("--list-hue", hue + "deg");
            }    
        }
    }
}