import "./style.css";
import { createUser } from "./model/user.js";
import { handleProjectListView } from "./view/projectListView.js";
import { handleProjectToolbarView } from "./view/projectToolbarView.js";
import { handleTodoListView } from "./view/todoListView.js";

const mainUser = createUser("Admin");

handleProjectListView(mainUser);
handleProjectToolbarView(mainUser);
handleTodoListView(mainUser);




function createDummyContent(user){
    user.addProject("Super Broker Extreme");
}

createDummyContent(mainUser);