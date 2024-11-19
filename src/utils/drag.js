let placeholder = null;

function createPlaceholder(element){
    placeholder = document.createElement("div");
    placeholder.classList.add("drag-placeholder");

    const rect = element.getBoundingClientRect();
    placeholder.style.width = rect.width + "px";
    placeholder.style.height = rect.height + "px";
}

export function makeElementDraggable(element, type){
    element.setAttribute("draggable", true);
    element.addEventListener("dragstart", handleDragStart);
    element.addEventListener("dragend", handleDragEnd);

    const nearestDraggableElement = element.closest("[data-id]");

    function handleDragStart(e){
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("drag-type", type);
        createPlaceholder(nearestDraggableElement);
        nearestDraggableElement.classList.add("dragged");
    }

    function handleDragEnd(_e){
        nearestDraggableElement.classList.remove("dragged");
    }
}

export function makeElementDropTarget(element, type, vertical = true){
    element.addEventListener("dragover", (e) => {
        if(e.dataTransfer.getData("drag-type") === type){
            e.preventDefault();
            if(placeholder){
                let nearestElement = null;
                let nearestDist = Number.MAX_VALUE;
                Array.from(element.children).forEach((sibling) => {
                    if(sibling.dataset.id ==  null) return;     //Only drag anything with IDs (todo-project, -list, or -item)

                    const currentRect = sibling.getBoundingClientRect();
                    let currentDist;
                    if(vertical){
                        currentDist = Math.abs(currentRect.top - e.pageY);
                    }
                    else{
                        currentDist = Math.abs(currentRect.left - e.pageX);
                    }

                    if(nearestElement == null || nearestDist > currentDist){
                        nearestElement = sibling;
                        nearestDist = currentDist;
                    }
                });

                //console.log(nearestElement);

                if(placeholder.parentElement !== element)
                    element.appendChild(placeholder);


                if(nearestElement){
                    const nextSibling = nearestElement.nextSibling
                    let isLast = false;
                    if(!nextSibling) isLast = true;
                    else{
                        if(nextSibling.dataset.id == null) isLast = true;
                    }
                    if(!isLast){
                        nearestElement.before(placeholder);
                    }
                    else{
                        const rect = nearestElement.getBoundingClientRect();
                        let center = vertical? (rect.top + (rect.bottom - rect.top)/2):(rect.left + (rect.right - rect.left)/2);
                        let mousePos = vertical? e.pageY:e.pageX;
                        let dist = center - mousePos;
                        console.log(dist);
                        if(dist < 0){
                            nearestElement.after(placeholder);
                        }
                        else{
                            nearestElement.before(placeholder);
                        }
                    }
                }
            }
        }
    });

    element.addEventListener("dragleave", (e) => {
        //console.log("dragleave");
    });

    element.addEventListener("dragenter", (e) => {
        //console.log("dragenter");
    });

    element.addEventListener("dragend", (e) => {
        if(placeholder) placeholder.remove();
        placeholder = null;
        console.log("dragend");
    });

    element.addEventListener("drop", (e) => {
        if(e.dataTransfer.getData("drag-type") === type){
            e.preventDefault();
        }
    });
}