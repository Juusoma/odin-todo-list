function createTodoItem(pubSub, id, title){
    let _id = id;
    let _title = title;
    let _description = "";
    let _dueDate = null;
    let _priority = 0;
    let _done = false;

    return {
        set title(title){
            _title = title;
            pubSub.publish(`todo-update-${_id}`, {title});
        },
        get title(){
            return _title;
        }
    };
}

export { createTodoItem }