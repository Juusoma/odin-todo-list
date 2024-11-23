import { makeElementDraggable, makeElementDropTarget } from "../utils/drag";
import { getRemainingTimeHue, getRemainingTimeString, isDue, toISOLocal } from "../utils/time";
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
    user.pubSub.subscribe("info-change-item", handleTodoItemInfoChange);

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
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/></svg>
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

        const editButton = newTodoItem.querySelector(".list-item-edit");
        createDropdownButton(editButton, [
            {
                name: "Flag",
                svg: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M200-120v-680h360l16 80h224v400H520l-16-80H280v280h-80Z"/></svg>`,
                onclick: () => {
                    todoItem.changeInfo({important: !todoItem.important});
                },
            },
            {
                name: `Delete item`,
                svg: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg>`,
                buttonClass: "delete",
                onclick: () => {
                    if(confirm("Are you sure you want to DELETE the item?"))
                        todoList.removeTodoItem(todoItem.id);
                },
            },
        ]);


        todoItemsContainer.appendChild(newTodoItem);
        handleTodoItemInfoChange(todoItem);
    }
    
    function handleTodoItemRemove(todoItem){
        const listElement = todoItemsContainer.querySelector(`[data-id="${todoItem.id}"]`);
        if(listElement){
            listElement.remove();
        }
    }

    function handleTodoItemInfoChange({id, title, notes, dueDate, important}){
        const itemElement = todoItemsContainer.querySelector(`[data-id=${id}]`);
        if(!itemElement) return;

        if(title != undefined){
            const titleElement = itemElement.querySelector(".list-item-title");
            titleElement.textContent = title;
        }

        if(notes != undefined){
            const notesElement = itemElement.querySelector(".list-item-notes");
            notesElement.textContent = notes;
        }
        
        if(important != undefined){
            if(important)
                itemElement.classList.add("important");
            else
                itemElement.classList.remove("important");
        }

        const itemDueElement = itemElement.querySelector(".list-item-due");
        itemDueElement.textContent = getRemainingTimeString(dueDate);
        itemDueElement.classList.remove("isDue");
        if(dueDate != undefined){
            itemDueElement.classList.add("due-date-set");
            if(isDue(dueDate)){
                itemDueElement.style.setProperty("--saturation", "0%");
                itemDueElement.classList.add("isDue");
                itemDueElement.innerHTML =`
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m388-212-56-56 92-92-92-92 56-56 92 92 92-92 56 56-92 92 92 92-56 56-92-92-92 92ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg>
                 `;
            }else{
                itemDueElement.style.setProperty("--saturation", "50%");
                itemDueElement.style.setProperty("--hue", getRemainingTimeHue(dueDate) + "deg");
            }
        }
        else{
            itemDueElement.classList.remove("due-date-set");
            itemDueElement.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg>
                `
        }
        itemDueElement.dataset.date = dueDate?.toLocaleString("en-GB").slice(0, -3) ?? "No due date";
    }

    function handleTodoListClick(e){
        const closestTodoItem = e.target.closest(`[data-id^="item"]`);  //Any data-id that starts with "item"
        if(closestTodoItem){
            const todoItemID = closestTodoItem.getAttribute("data-id");
            const todoItem = todoList.getTodoItem(todoItemID);
            const clickedDueDate = e.target.closest(".list-item-due") != null;
            if(clickedDueDate){
                todoItem.extendDueDate({days: 1});
            }
            else{
                if(!e.target.closest(".list-item-edit"))
                    openTodoItemModal(todoItem, closestTodoItem);
            }
        }
    }

    function openTodoItemModal(todoItem, todoItemElement){
        todoItemOptionsModal.showModal();
        const rect = todoItemElement.getBoundingClientRect();
        const modalRect = todoItemOptionsModal.getBoundingClientRect();
        let left = rect.left;
        let top = rect.top;
        console.log(left + modalRect.width, window.innerWidth);
        left = Math.min(window.innerWidth - modalRect.width, left);
        left = Math.max(left, 0);
        top = Math.min(window.innerHeight - modalRect.height, top);
        top = Math.max(top, 0);
        todoItemOptionsModal.style.left = left + "px";
        todoItemOptionsModal.style.top = top + "px";

        const titleInput = todoItemOptionsModal.querySelector("#todo-item-title");
        titleInput.value = todoItem.title;
        titleInput.select();
        
        const notesInput = todoItemOptionsModal.querySelector("#todo-item-notes");
        notesInput.value = todoItem.notes;
        
        const dueDateInput = todoItemOptionsModal.querySelector("#todo-item-due");
        dueDateInput.value = toISOLocal(todoItem.dueDate)?.slice(0,16);
        dueDateInput.min = toISOLocal(new Date()).slice(0, 16);

        document.addEventListener("mousedown", handleModalMouseDown);

        todoItemOptionsModal.addEventListener("reset", handleModalReset);
        todoItemOptionsModal.addEventListener("submit", handleModalSubmit);

        function handleModalReset(){
            todoItemOptionsModal.close();
        }

        function handleModalSubmit(){
            todoItem.changeInfo({
                title: titleInput.value,
                notes: notesInput.value,
                dueDate: dueDateInput.value,
            });
        }

        function handleModalMouseDown(e){
            const clickedModal = e.target.closest(".modal-content") != null;
            if(!clickedModal){
                todoItemOptionsModal.close();
            }
        }

        todoItemOptionsModal.addEventListener("close", _e => {
            document.removeEventListener("mousedown", handleModalMouseDown);
            todoItemOptionsModal.removeEventListener("reset", handleModalReset);
            todoItemOptionsModal.removeEventListener("submit", handleModalSubmit);
        });
    }
}