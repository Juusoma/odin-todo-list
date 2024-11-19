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
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666"><path d="M202.63-202.87h57.24l374.74-374.74-56.76-57-375.22 375.22v56.52Zm-90.76 91v-185.3l527.52-526.76q12.48-11.72 27.7-17.96 15.21-6.24 31.93-6.24 16.48 0 32.2 6.24 15.71 6.24 27.67 18.72l65.28 65.56q12.48 11.72 18.34 27.56 5.86 15.83 5.86 31.79 0 16.72-5.86 32.05-5.86 15.34-18.34 27.82L297.65-111.87H111.87Zm642.87-586.39-56.24-56.48 56.24 56.48Zm-148.89 92.41-28-28.76 56.76 57-28.76-28.24Z"/></svg>                        
            </button>
            <div class="list-item-due">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m608.41-290.57 61.5-61.02-146.32-146.32V-678.8h-87.18v216.13l172 172.1ZM480-71.87q-84.91 0-159.34-32.12-74.44-32.12-129.5-87.17-55.05-55.06-87.17-129.5Q71.87-395.09 71.87-480t32.12-159.34q32.12-74.44 87.17-129.5 55.06-55.05 129.5-87.17 74.43-32.12 159.34-32.12t159.34 32.12q74.44 32.12 129.5 87.17 55.05 55.06 87.17 129.5 32.12 74.43 32.12 159.34t-32.12 159.34q-32.12 74.44-87.17 129.5-55.06 55.05-129.5 87.17Q564.91-71.87 480-71.87ZM480-480Zm0 317.13q131.8 0 224.47-92.54 92.66-92.55 92.66-224.59 0-132.04-92.66-224.59-92.66-92.54-224.47-92.54-131.8 0-224.47 92.54-92.66 92.55-92.66 224.59 0 132.04 92.66 224.59 92.66 92.54 224.47 92.54Z"/></svg>
                -
            </div>
            <!--<button class="list-item-check icon-button">     
                <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#666666"><path d="M423.28-291.22 708.87-576.8l-62.46-62.7-223.13 223.13L312.15-527.5l-62.45 62.7 173.58 173.58ZM480-71.87q-84.91 0-159.34-32.12-74.44-32.12-129.5-87.17-55.05-55.06-87.17-129.5Q71.87-395.09 71.87-480t32.12-159.34q32.12-74.44 87.17-129.5 55.06-55.05 129.5-87.17 74.43-32.12 159.34-32.12t159.34 32.12q74.44 32.12 129.5 87.17 55.05 55.06 87.17 129.5 32.12 74.43 32.12 159.34t-32.12 159.34q-32.12 74.44-87.17 129.5-55.06 55.05-129.5 87.17Q564.91-71.87 480-71.87Zm0-91q133.04 0 225.09-92.04 92.04-92.05 92.04-225.09 0-133.04-92.04-225.09-92.05-92.04-225.09-92.04-133.04 0-225.09 92.04-92.04 92.05-92.04 225.09 0 133.04 92.04 225.09 92.05 92.04 225.09 92.04ZM480-480Z"/></svg>
                <svg class="filled" xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#000000"><path d="M423.28-291.22 708.87-576.8l-62.46-62.7-223.13 223.13L312.15-527.5l-62.45 62.7 173.58 173.58ZM480-71.87q-84.91 0-159.34-32.12-74.44-32.12-129.5-87.17-55.05-55.06-87.17-129.5Q71.87-395.09 71.87-480t32.12-159.34q32.12-74.44 87.17-129.5 55.06-55.05 129.5-87.17 74.43-32.12 159.34-32.12t159.34 32.12q74.44 32.12 129.5 87.17 55.05 55.06 87.17 129.5 32.12 74.43 32.12 159.34t-32.12 159.34q-32.12 74.44-87.17 129.5-55.06 55.05-129.5 87.17Q564.91-71.87 480-71.87Z"/></svg>
            </button>-->
        `;
        todoItemsContainer.appendChild(newTodoItem);
    }
    
    function handleTodoItemRemove(todoItem){
        //TODO
    }
}