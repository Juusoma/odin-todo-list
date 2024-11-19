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
    const dummyProject = user.addProject("Super Broker Extreme");
    const dummyList1 = dummyProject.addTodoList("In Production");
    const dummyItem11 = dummyList1.addTodoItem("Cook book");
    const dummyItem12 = dummyList1.addTodoItem("Brush car");
    const dummyList2 = dummyProject.addTodoList("Done");
    const dummyItem21 = dummyList2.addTodoItem("Run outside");
}

createDummyContent(mainUser);