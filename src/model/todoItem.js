import { generateID } from "../utils/id";
import { isDue } from "../utils/time";

function createTodoItem(pubSub, title){
    const _id = generateID("item");
    let _title = title;
    let _notes = "";
    let _dueDate = null;
    let _priority = 0;
    let _done = false;

    function setDueDate(time){
        _dueDate = new Date(time);

        pubSub.publish("info-change-item", {id: _id, dueDate: _dueDate});
    }

    function extendDueDate({years, months, weeks, days, hours, minutes} = {}){
        if(_dueDate == null || isDue(_dueDate)) _dueDate = new Date();

        let msToExtend = 0;

        //TODO: Make more precise
        
        if(years) msToExtend += 31556952000 * years;
        if(months) msToExtend += 2629746000 * months;
        if(weeks) msToExtend += 604800000 * weeks;
        if(days) msToExtend += 86400000 * days;
        if(hours) msToExtend += 3600000 * hours;
        if(minutes) msToExtend += 60000 * minutes;

        setDueDate(_dueDate.getTime() + msToExtend);
    }

    function log(){
        console.log(`Item (${_id}): ${_title}, ${_notes}`);
    }

    function changeInfo({title, notes, dueDate}){
        if(title){
            _title = title;
        }
        if(notes){
            _notes = notes;
        }
        if(dueDate){
            _dueDate = new Date(dueDate);
        }

        pubSub.publish("info-change-item", {
            id: _id,
            title: _title,
            notes: _notes,
            dueDate: _dueDate,
        });
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
        get notes(){
            return _notes;
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
        extendDueDate,
        changeInfo,
    };
}

export { createTodoItem }