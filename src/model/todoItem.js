import { generateID } from "../utils/id";

function createTodoItem(pubSub, title){
    const _id = generateID("item");
    let _title = title;
    let _notes = "";
    let _dueDate = null;
    let _priority = 0;
    let _done = false;

    function setDueDate(time){
        _dueDate = new Date(time);
    }

    function extendDueDate({years, months, weeks, days, hours, minutes} = {}){
        if(_dueDate == null) _dueDate = new Date();

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

    function getRemainingTimeString(){
        if(!_dueDate) return "-";

        const remaining = _dueDate.getTime() - Date.now();
        if(remaining < 0) return "x";
        if(remaining > 31556952000) return Math.floor(remaining / 31556952000) + " yr";
        if(remaining > 2629746000) return Math.floor(remaining / 2629746000) + " m";
        if(remaining > 604800000) return Math.floor(remaining / 604800000) + " wk";
        if(remaining > 86400000) return Math.floor(remaining / 86400000) + " d";
        if(remaining > 3600000) return Math.floor(remaining / 3600000) + " hr";
        else return Math.floor(remaining / 60000) + " min";
    }

    function getRemainingTimeHue(){
        if(!_dueDate) return 0;

        const remaining = _dueDate.getTime() - Date.now();
        if(remaining < 0) return null;
        if(remaining > 31556952000) return 170;
        if(remaining > 2629746000) return 150;
        if(remaining > 604800000) return 120;
        if(remaining > 86400000) return 55;
        if(remaining > 3600000) return 20;
        else return 0;
    }

    function log(){
        console.log(`Item (${_id}): ${_title}, ${_notes}`);
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
        get isDue(){
            if(!_dueDate) return false;
            return _dueDate.getTime() - Date.now() < 0;
        },
        log,
        extendDueDate,
        getRemainingTimeString,
        getRemainingTimeHue,
    };
}

export { createTodoItem }