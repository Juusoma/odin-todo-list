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
export function createDropdownButton(button, x, y, options){
    let dropdown = null;
    button.addEventListener("click", handleDropdownButtonClick);

    function handleDropdownButtonClick(e){
        if(!dropdown){
            e.stopPropagation();
            dropdown = createDropdown();
        }
        else{
            dropdown.remove();
            dropdown = null;
        }
    }

    function createDropdown(){
        let newDropdown = document.createElement("div");
        newDropdown.classList.add("dropdown");
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
    
            newDropdown.appendChild(button);
        }
    
        newDropdown.style.left = x +"px";
        newDropdown.style.top = y +"px";
    
        document.addEventListener("click", handleClick, {once: true});
    
        function handleClick(e){
            const dropdownOption = e.target.closest(".dropdown-option");
            if(dropdownOption){
                const index = dropdownOption.dataset.index;
                options[index].onclick();
            }
            newDropdown.remove();
            newDropdown = null;
            dropdown = null;
        }

        return document.body.appendChild(newDropdown);
    }
}