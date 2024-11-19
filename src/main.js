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
    const dummyItem13 = dummyList1.addTodoItem("Wash car");
    const dummyList2 = dummyProject.addTodoList("Done");
    const dummyItem21 = dummyList2.addTodoItem("Run outside");
    const dummyItem22 = dummyList2.addTodoItem("Eat dinner");
    dummyItem11.extendDueDate({years: 2});
    dummyItem12.extendDueDate({hours: 4});
    dummyItem13.extendDueDate({minutes: .1});
    dummyItem21.extendDueDate({weeks: 2});
    dummyItem22.extendDueDate({days: 2});
}

function stressTest(user){
    const testProject = user.addProject("Stressful Work Horse");
    for(let i = 0; i < 10; i++){
        const list = testProject.addTodoList("Craze " + i);
        for(let k = 0; k < 100; k++){
            list.addTodoItem("Balloon " + k);
        }
    }
}

createDummyContent(mainUser);
stressTest(mainUser);