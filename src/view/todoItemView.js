import { makeElementDraggable, makeElementDropTarget } from "../utils/drag";
import { createDropdownButton } from "./dropdown";
import { makePositionedInputContainer } from "./positionedInput";


/**
 * 
 * @param {*} user 
 * @param {*} todoList 
 * @param {HTMLElement} listElement 
 */
export function handleTodoItemView(user, todoList, listElement){
    user.pubSub.subscribe("todo-item-add-" + todoList.id, handleTodoItemAdd);
    user.pubSub.subscribe("todo-item-remove-" + todoList.id, handleTodoItemRemove);

    const todoItemsContainer = listElement.querySelector(".list-items-container");
    const addTodoItemButton = listElement.querySelector(".add-todo-item");
    makePositionedInputContainer(addTodoItemButton, handleCreateTodoItemInput);
    //makeElementDropTarget(todoItemsContainer, "todo-item", true);
    const todoItemOptionsModal = document.querySelector("#todo-item-options");


    listElement.addEventListener("click", handleTodoListClick);

    initializeItems();

    function initializeItems(){
        todoList.todoItems.forEach(x => {
            handleTodoItemAdd(x);
        });
    }

    function handleCreateTodoItemInput(title){
        todoList.addTodoItem(title);
    }

    function handleTodoItemAdd(todoItem){
        const newTodoItem = document.createElement("div");
        newTodoItem.classList.add("list-item");
        newTodoItem.dataset.id = todoItem.id;
        newTodoItem.innerHTML = `
            <p class="list-item-title">${todoItem.title}</p>
            <p class="list-item-notes"></p>
            <button class="list-item-edit icon-button">     
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999"><path d="M202.63-202.87h57.24l374.74-374.74-56.76-57-375.22 375.22v56.52Zm-90.76 91v-185.3l527.52-526.76q12.48-11.72 27.7-17.96 15.21-6.24 31.93-6.24 16.48 0 32.2 6.24 15.71 6.24 27.67 18.72l65.28 65.56q12.48 11.72 18.34 27.56 5.86 15.83 5.86 31.79 0 16.72-5.86 32.05-5.86 15.34-18.34 27.82L297.65-111.87H111.87Zm642.87-586.39-56.24-56.48 56.24 56.48Zm-148.89 92.41-28-28.76 56.76 57-28.76-28.24Z"/></svg>                        
            </button>
            <button class="list-item-due">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m608.41-290.57 61.5-61.02-146.32-146.32V-678.8h-87.18v216.13l172 172.1ZM480-71.87q-84.91 0-159.34-32.12-74.44-32.12-129.5-87.17-55.05-55.06-87.17-129.5Q71.87-395.09 71.87-480t32.12-159.34q32.12-74.44 87.17-129.5 55.06-55.05 129.5-87.17 74.43-32.12 159.34-32.12t159.34 32.12q74.44 32.12 129.5 87.17 55.05 55.06 87.17 129.5 32.12 74.43 32.12 159.34t-32.12 159.34q-32.12 74.44-87.17 129.5-55.06 55.05-129.5 87.17Q564.91-71.87 480-71.87ZM480-480Zm0 317.13q131.8 0 224.47-92.54 92.66-92.55 92.66-224.59 0-132.04-92.66-224.59-92.66-92.54-224.47-92.54-131.8 0-224.47 92.54-92.66 92.55-92.66 224.59 0 132.04 92.66 224.59 92.66 92.54 224.47 92.54Z"/></svg>
                -
            </button>
            <!--<button class="list-item-check icon-button">     
                <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#666666"><path d="M423.28-291.22 708.87-576.8l-62.46-62.7-223.13 223.13L312.15-527.5l-62.45 62.7 173.58 173.58ZM480-71.87q-84.91 0-159.34-32.12-74.44-32.12-129.5-87.17-55.05-55.06-87.17-129.5Q71.87-395.09 71.87-480t32.12-159.34q32.12-74.44 87.17-129.5 55.06-55.05 129.5-87.17 74.43-32.12 159.34-32.12t159.34 32.12q74.44 32.12 129.5 87.17 55.05 55.06 87.17 129.5 32.12 74.43 32.12 159.34t-32.12 159.34q-32.12 74.44-87.17 129.5-55.06 55.05-129.5 87.17Q564.91-71.87 480-71.87Zm0-91q133.04 0 225.09-92.04 92.04-92.05 92.04-225.09 0-133.04-92.04-225.09-92.05-92.04-225.09-92.04-133.04 0-225.09 92.04-92.04 92.05-92.04 225.09 0 133.04 92.04 225.09 92.05 92.04 225.09 92.04ZM480-480Z"/></svg>
                <svg class="filled" xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#000000"><path d="M423.28-291.22 708.87-576.8l-62.46-62.7-223.13 223.13L312.15-527.5l-62.45 62.7 173.58 173.58ZM480-71.87q-84.91 0-159.34-32.12-74.44-32.12-129.5-87.17-55.05-55.06-87.17-129.5Q71.87-395.09 71.87-480t32.12-159.34q32.12-74.44 87.17-129.5 55.06-55.05 129.5-87.17 74.43-32.12 159.34-32.12t159.34 32.12q74.44 32.12 129.5 87.17 55.05 55.06 87.17 129.5 32.12 74.43 32.12 159.34t-32.12 159.34q-32.12 74.44-87.17 129.5-55.06 55.05-129.5 87.17Q564.91-71.87 480-71.87Z"/></svg>
            </button>-->
        `;

        makeElementDraggable(newTodoItem, "todo-item");


        todoItemsContainer.appendChild(newTodoItem);
        handleTodoItemUpdate(todoItem);
    }
    
    function handleTodoItemRemove(todoItem){
        //TODO
    }

    function handleTodoItemUpdate(todoItem){
        const itemElement = todoItemsContainer.querySelector(`[data-id=${todoItem.id}]`);
        if(!itemElement) return;

        const itemDueElement = itemElement.querySelector(".list-item-due");
        itemDueElement.textContent = todoItem.getRemainingTimeString();
        itemDueElement.classList.remove("isDue");
        if(todoItem.dueDate){
            if(todoItem.isDue){
                itemDueElement.style.setProperty("--saturation", "0%");
                itemDueElement.classList.add("isDue");
                itemDueElement.innerHTML =`
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m388-212-56-56 92-92-92-92 56-56 92 92 92-92 56 56-92 92 92 92-56 56-92-92-92 92ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg>
                 `;
            }else{
                itemDueElement.style.setProperty("--saturation", "50%");
                itemDueElement.style.setProperty("--hue", todoItem.getRemainingTimeHue() + "deg");
            }
        }
        else{
            itemDueElement.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg>
                `
        }
    }

    function handleTodoListClick(e){
        const ignoreClick = e.target.closest(".list-item-due") != null;
        if(ignoreClick) return;

        const closestTodoItem = e.target.closest(`[data-id^="item"]`);  //Any data-id that starts with "item"
        if(closestTodoItem){
            //console.log("clicked on item:", closestTodoItem.getAttribute("data-id"));
            const todoItemID = closestTodoItem.getAttribute("data-id");
            const todoItem = todoList.getTodoItem(todoItemID);
            openTodoItemModal(todoItem, closestTodoItem);
        }
    }

    function openTodoItemModal(todoItem, todoItemElement){
        todoItemOptionsModal.showModal();
        const rect = todoItemElement.getBoundingClientRect();
        todoItemOptionsModal.style.left = rect.left + "px";
        todoItemOptionsModal.style.top = rect.top + "px";

        const titleInput = todoItemOptionsModal.querySelector("#todo-item-title");
        titleInput.value = todoItem.title;
        titleInput.select();
        
        const notesInput = todoItemOptionsModal.querySelector("#todo-item-notes");
        notesInput.value = todoItem.notes;

        document.addEventListener("mousedown", handleModalMouseDown);

        function handleModalMouseDown(e){
            const clickedModal = e.target.closest(".modal-content") != null;
            if(!clickedModal){
                todoItemOptionsModal.close();
            }
        }

        todoItemOptionsModal.addEventListener("close", _e => {
            document.removeEventListener("mousedown", handleModalMouseDown);
        });
    }
}