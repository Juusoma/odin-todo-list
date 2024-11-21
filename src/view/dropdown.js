/**
 * 
 * @param {Number} x
 * @param {Number} y 
 * @param {[{name: string, svg: string, buttonClass: string, onclick: Function}]} options 
 * - Array of options to be included in the dropdown
 * - name: Name to be displayed
 * - svg: innerHTML string to be appended to the option button
 * - buttonClass: Optional additional class to be added to the button
 * - onclick: Callback for clicking the option
 */
export function createDropdown(x, y, options){
    let dropdownContainer = document.createElement("div");
    dropdownContainer.classList.add("dropdown");
    for(let index in options){
        let option = options[index];
        const button = document.createElement("button");
        button.classList.add("dropdown-option");
        if(option.buttonClass){
            button.classList.add(option.buttonClass);
        }
        if(option.svg){
            button.innerHTML = option.svg + option.name;
        }
        else{
            button.textContent = option.name;
        }
        button.dataset.index = index;

        dropdownContainer.appendChild(button);
    }

    dropdownContainer.style.left = x +"px";
    dropdownContainer.style.top = y +"px";

    document.body.appendChild(dropdownContainer);

    document.addEventListener("click", handleClick, {once: true});

    function handleClick(e){
        const dropdownOption = e.target.closest(".dropdown-option");
        if(dropdownOption){
            const index = dropdownOption.dataset.index;
            options[index].onclick();
        }
        dropdownContainer.remove();
        dropdownContainer = null;
    }


    return {
        get isActive(){
            return dropdownContainer != null;
        }
    };
}