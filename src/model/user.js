import { createPubSubBroker } from "../utils/pubSub";
import { createProject } from "./project";

export function createUser(name){
    const _name = name;
    let _projects = [];
    let _currentProject = null;

    const _pubSub = createPubSubBroker();

    function addProject(title){
        const project = createProject(_pubSub, title);
        _projects.push(project);
        _pubSub.publish("project-add", project);
        return project;
    }

    function removeProject(id){
        const index = _projects.findIndex(x => x.id === id);
        if(index > -1){
            _pubSub.publish("project-remove", _projects[index]);
            _projects.splice(index, 1);
        }
    }

    function log(){
        console.log(`User: ${_name}`);
        for(let project of _projects){
            project.log();
        }
    }

    function loadProject(id){
        const index = _projects.findIndex(x => x.id === id);
        if(index === -1) console.error("Failed to load project!", id);
        else{
            _currentProject = _projects[index];
            _pubSub.publish(`project-change`, _currentProject);
        }
    }

    return {
        set name(name){
            _name = name;
            _pubSub.publish(`user-update-${_id}`, {name});
        },
        get title(){
            return _title;
        },
        get pubSub(){
            return _pubSub;
        },
        get currentProject(){
            return _currentProject;
        },
        addProject,
        removeProject,
        log,
        loadProject,
    }
}