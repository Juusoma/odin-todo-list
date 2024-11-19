let placeholder = null;
let activeDragElement;

function createPlaceholder(element){
    placeholder = document.createElement("div");
    placeholder.classList.add("drag-placeholder");

    const rect = element.getBoundingClientRect();
    placeholder.style.width = rect.width + "px";
    placeholder.style.height = rect.height + "px";
    placeholder.style.display = "none";
    console.log("createPlaceholder");
}

export function makeElementDraggable(element, type){
    element.setAttribute("draggable", true);
    element.addEventListener("dragstart", handleDragStart);
    element.addEventListener("dragend", handleDragEnd);

    const nearestDraggableElement = element.closest("[data-id]");

    function handleDragStart(e){
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("drag-type", type);
        e.dataTransfer.setData("element-id", nearestDraggableElement.dataset.id);
        createPlaceholder(nearestDraggableElement);
        nearestDraggableElement.classList.add("dragged");
        activeDragElement = nearestDraggableElement;
    }

    function handleDragEnd(_e){
        nearestDraggableElement.classList.remove("dragged");
        if(activeDragElement){
            activeDragElement.style["display"] = "";
            activeDragElement = null;
        }
    }
}

export function makeElementDropTarget(element, type, vertical = true, track = null){
    if(track == null) track = element;
    element.addEventListener("dragover", (e) => {
        if(e.dataTransfer.getData("drag-type") === type){
            e.preventDefault();
            if(placeholder){
                let nearestElement = null;
                let nearestDist = Number.MAX_VALUE;
                Array.from(track.children).forEach((sibling) => {
                    if(sibling.dataset.id ==  null) return;     //Only drag anything with IDs (todo-project, -list, or -item)
                    if(sibling === activeDragElement && sibling.style.display == "none") return;

                    const rect = sibling.getBoundingClientRect();
                    let center = vertical? (rect.top + (rect.bottom - rect.top)/2):(rect.left + (rect.right - rect.left)/2);
                    let mousePos = vertical? e.pageY:e.pageX;
                    let dist = Math.abs(center - mousePos);

                    if(nearestElement == null || nearestDist > dist){
                        nearestElement = sibling;
                        nearestDist = dist;
                    }
                });

                if(nearestElement){
                    if(activeDragElement && nearestElement !== activeDragElement){
                        activeDragElement.style["display"] = "none";
                        placeholder.style["display"] = "";
                        //document.body.appendChild(activeDragElement);
                    }
                    const rect = nearestElement.getBoundingClientRect();
                    let center = vertical? (rect.top + (rect.bottom - rect.top)/2):(rect.left + (rect.right - rect.left)/2);
                    let mousePos = vertical? e.pageY:e.pageX;
                    let dist = center - mousePos;
                    if(dist < 0){
                        nearestElement.after(placeholder);
                    }
                    else{
                        nearestElement.before(placeholder);
                    }
                }
                else{
                    activeDragElement.style["display"] = "none";
                    placeholder.style["display"] = "";
                    track.prepend(placeholder);
                }
            }
        }
    });

    element.addEventListener("dragend", (e) => {
        if(placeholder) placeholder.remove();
    });

    element.addEventListener("drop", (e) => {
        if(e.dataTransfer.getData("drag-type") === type && placeholder){
            e.preventDefault();
            const id = e.dataTransfer.getData("element-id");
            const draggedElement = document.querySelector(`[data-id="${id}"`);
            if(draggedElement){
                placeholder.before(draggedElement);
            }
            placeholder.remove();
        }
    });
}