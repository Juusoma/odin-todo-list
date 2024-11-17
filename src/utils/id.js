let idCounter = 0;
let lastTime = 0;

export function generateID(typePrefix){
    const now = Date.now();
    if(lastTime == now){
        idCounter++;
    }
    else{
        idCounter = 0;
    }
    lastTime = now;
    return `${typePrefix}-${now}-${idCounter}`;
}