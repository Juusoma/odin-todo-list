import { generateID } from "../utils/id";

function createTodoItem(pubSub, title){
    const _id = generateID("item");
    let _title = title;
    let _description = "";
    let _dueDate = null;
    let _priority = 0;
    let _done = false;

    function log(){
        console.log(`Item (${_id}): ${_title}, ${_description}`);
    }

    return {
        get id(){
            return _id;
        },
        set title(title){
            _title = title;
            pubSub.publish(`todo-item-update-${_id}`, {title});
        },
        get title(){
            return _title;
        },
        get description(){
            return _description;
        },
        get dueDate(){
            return _dueDate;
        },
        get priority(){
            return _priority;
        },
        get done(){
            return _done;
        },
        log,
    };
}

export { createTodoItem }