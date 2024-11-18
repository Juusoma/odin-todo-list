import "./style.css";
import { createUser } from "./model/user.js";
import { handleProjectView } from "./view/projectView.js";

const mainUser = createUser("Admin");

handleProjectView(mainUser);