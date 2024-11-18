import "./style.css";
import { createUser } from "./model/user.js";
import { handleProjectView } from "./view/projectView.js";

const mainUser = createUser("Admin");

handleProjectView(mainUser);





function createDummyContent(user){
    user.addProject("Super Broker Extreme");
}

createDummyContent(mainUser);