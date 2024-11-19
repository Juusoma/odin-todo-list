import { generateID } from "../utils/id";
import { createTodoItem } from "./todoItem";

function createTodoList(pubSub, title){
    const _id = generateID("list");
    let _title = title;
    let _todoItems = [];

    function addTodoItem(title){
        const todoItem = createTodoItem(pubSub, title);
        _todoItems.push(todoItem);
        pubSub.publish("todo-item-add-" + _id, todoItem);
        return todoItem;
    }

    function removeTodoItem(id){
        const index = _todoItems.findIndex(x => x.id === id);
        if(index > -1){
            pubSub.publish("todo-item-remove-" + _id, _todoItems[index]);
            _todoItems.splice(index, 1);
        }
    }

    function log(){
        console.log(`List (${_id}): ${_title}`);
        for(let item of _todoItems){
            item.log();
        }
    }

    return {
        get id(){
            return _id;
        },
        set title(title){
            _title = title;
            pubSub.publish(`todo-list-update-${_id}`, {title});
        },
        get title(){
            return _title;
        },
        get todoItems(){
            return _todoItems;
        },
        addTodoItem,
        removeTodoItem,
        log,
    }
}

export { createTodoList }