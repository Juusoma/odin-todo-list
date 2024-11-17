import "./style.css";
import { createProject } from "./model/project.js";

const project = createProject("Starter");

project.pubSub.subscribe("todo-item-add", (x) => {
    console.log("Added todo item:", x.title);
});
project.pubSub.subscribe("todo-item-remove", (x) => {
    console.log("Removed todo item:", x.title);
});

const firstList = project.addTodoList("In Progress");
const secondList = project.addTodoList("Completed");
const firstItem = firstList.addTodoItem("Cook");

project.log();

firstList.removeTodoItem(firstItem.id);
project.removeTodoList(firstList.id);

project.log();