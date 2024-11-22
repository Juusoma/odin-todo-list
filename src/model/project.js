import { generateID } from "../utils/id";
import { createPubSubBroker } from "../utils/pubSub";
import { createTodoList } from "./todoList";

function createProject(pubSub, title){
    const _id = generateID("project");
    let _title = title;
    let _todoLists = [];

    pubSub.subscribe('drag-n-drop-list', handleListDragAndDrop);

    function addTodoList(title){
        const todoList = createTodoList(pubSub, title);
        _todoLists.push(todoList);
        pubSub.publish("todo-list-add", todoList);
        return todoList;
    }

    function removeTodoList(id){
        const index = _todoLists.findIndex(x => x.id === id);
        if(index > -1){
            pubSub.publish("todo-list-remove", _todoLists[index]);
            _todoLists.splice(index, 1);
        }
    }

    function log(){
        console.log(`Project (${_id}): ${_title}`);
        for(let list of _todoLists){
            list.log();
        }
    }

    function handleListDragAndDrop({id, newIndex}){
        const oldIndex = _todoLists.findIndex(x => x.id === id);
        
        if(oldIndex !== -1){
            const todoList = _todoLists[oldIndex];
            _todoLists.splice(oldIndex, 1);
            _todoLists.splice(newIndex, 0, todoList);
        }
    }

    function changeInfo({title}){
        if(title){
            _title = title;
            pubSub.publish("info-change-project", {
                id: _id,
                title,
            });
            return true;
        }

        return false;
    }

    return {
        set title(title){
            _title = title;
            pubSub.publish(`todo-project-update-${_id}`, {title});
        },
        get title(){
            return _title;
        },
        get id(){
            return _id;
        },
        get todoLists(){
            return _todoLists;
        },
        addTodoList,
        removeTodoList,
        log,
        changeInfo,
    }
}

export { createProject }