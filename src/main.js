import "./style.css";
import { createProject } from "./model/project.js";
import { createPositionedTextInput } from "./view/positionedInput.js";
import { createUser } from "./model/user.js";

const projects = [];

const mainUser = createUser("Admin");

const createProjectButton = document.querySelector(".create-project");
createProjectButton.addEventListener("click", e => {
    const hasPositionedInput = createProjectButton.querySelector(".positioned-input-container");
    if(!hasPositionedInput){
        createPositionedTextInput(createProjectButton, receiveInput);
    }
});

function receiveInput(inputValue){
    if(typeof inputValue === 'string'){
        mainUser.addProject(inputValue);
        mainUser.log();
    }
}

