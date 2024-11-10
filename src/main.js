import "./style.css";
import { createPubSubBroker } from "./utils/pubSub.js";
import { createTodoItem } from "./model/todoItem.js";

const pubSub = createPubSubBroker();

const todoId = "0";
const todo = createTodoItem(pubSub, todoId, "Cook food");

pubSub.subscribe(`todo-update-${todoId}`, (data) => {
    if("title" in data){
        console.log(`Todo item ${todoId} title was updated to`, data.title);
    }
});

todo.title = "Make dinner";