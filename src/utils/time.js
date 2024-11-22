export function getRemainingTimeString(dueDate){
    if(!dueDate) return "-";

    const remaining = dueDate.getTime() - Date.now();
    if(remaining < 0) return "x";
    if(remaining > 31556952000) return Math.floor(remaining / 31556952000) + " yr";
    if(remaining > 2629746000) return Math.floor(remaining / 2629746000) + " m";
    if(remaining > 604800000) return Math.floor(remaining / 604800000) + " wk";
    if(remaining > 86400000) return Math.floor(remaining / 86400000) + " d";
    if(remaining > 3600000) return Math.floor(remaining / 3600000) + " hr";
    else return Math.floor(remaining / 60000) + " min";
}

export function getRemainingTimeHue(dueDate){
    if(!dueDate) return 0;

    const remaining = dueDate.getTime() - Date.now();
    if(remaining < 0) return null;
    if(remaining > 31556952000) return 170;
    if(remaining > 2629746000) return 150;
    if(remaining > 604800000) return 120;
    if(remaining > 86400000) return 55;
    if(remaining > 3600000) return 20;
    else return 0;
}

export function isDue(dueDate){
    if(!dueDate) return false;
    return dueDate.getTime() - Date.now() < 0;
}