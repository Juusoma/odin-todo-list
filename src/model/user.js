import { createPubSubBroker } from "../utils/pubSub";
import { createProject } from "./project";

export function createUser(name){
    const _name = name;
    let _projects = [];
    let _currentProject = null;

    const _pubSub = createPubSubBroker();
    _pubSub.subscribe('drag-n-drop-project', handleProjectDragAndDrop);

    function addProject(title){
        const project = createProject(_pubSub, title);
        _projects.push(project);
        _pubSub.publish("project-add", project);
        return project;
    }

    function removeProject(id){
        if(!id) return;
        const index = _projects.findIndex(x => x.id === id);
        if(index > -1){
            if(_currentProject === _projects[index])
                loadProject(null);
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
        if(index === -1){
            _currentProject = null;
        }
        else{
            _currentProject = _projects[index];
        }
        _pubSub.publish(`project-change`, _currentProject);
    }

    function handleProjectDragAndDrop({id, newIndex}){
        const oldIndex = _projects.findIndex(x => x.id === id);
        
        if(oldIndex !== -1){
            const project = _projects[oldIndex];
            _projects.splice(oldIndex, 1);
            _projects.splice(newIndex, 0, project);
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