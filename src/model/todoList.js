import { generateID } from "../utils/id";
import { createTodoItem } from "./todoItem";

function createTodoList(pubSub, title){
    const _id = generateID("list");
    let _title = title;
    let _hue = Math.floor(Math.random() * 360);
    let _todoItems = [];

    pubSub.subscribe('drag-n-drop-item', handleItemDragAndDrop);
    pubSub.subscribe('todo-item-put-'+_id, handleTodoItemPut);


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

    function getTodoItem(id){
        return _todoItems.find(x => x.id === id) ?? null;
    }

    function log(){
        console.log(`List (${_id}): ${_title}`);
        for(let item of _todoItems){
            item.log();
        }
    }

    function handleItemDragAndDrop({id, newIndex, oldParentID, newParentID}){
        if(oldParentID === _id && newParentID === _id){
            const oldIndex = _todoItems.findIndex(x => x.id === id);

            if(oldIndex !== -1){
                if(newParentID === oldParentID){
                    const item = _todoItems[oldIndex];
                    _todoItems.splice(oldIndex, 1);
                    _todoItems.splice(newIndex, 0, item);
                }
            }
        }
        else if(oldParentID === _id){
            const todoItem = _todoItems.find(x => x.id === id);
            if(todoItem){
                pubSub.publish("todo-item-put-" + newParentID, {index: newIndex, todoItem});
                removeTodoItem(id);
            }
        }
    }

    function handleTodoItemPut({index, todoItem}){
        _todoItems.splice(index, 0, todoItem);
    }

    function changeInfo({title, hue}){
        if(title){
            _title = title;
        }
        if(hue){
            _hue = hue;
        }
        
        pubSub.publish("info-change-list", {
            id: _id,
            title: _title,
            hue: _hue,
        });
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
        get hue(){
            return _hue;
        },
        get todoItems(){
            return _todoItems;
        },
        addTodoItem,
        removeTodoItem,
        getTodoItem,
        log,
        changeInfo,
    }
}

export { createTodoList }