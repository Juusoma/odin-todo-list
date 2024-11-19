/**
 * @param {HTMLElement} target - Created text input will be appended to this element.
 * @param {Function} callback - Called when user submits the input.
 *                            - Receives:
 *                            - {string} text - The text entered by the user.
 */
export function createPositionedTextInput(target, callback){
    const inputContainer = document.createElement("form");
    inputContainer.classList.add("positioned-input-container");
    inputContainer.innerHTML = `
        <label for="positioned-input-name">title: </label>
        <input type="text" id="positioned-input-name">
    `
    target.appendChild(inputContainer);
    const textInput = inputContainer.querySelector("#positioned-input-name");
    textInput.focus();
    inputContainer.addEventListener("focusout", () => {
        inputContainer.remove();
    }, {once: true});
    inputContainer.addEventListener("submit", e => {
        e.preventDefault();

        if(typeof callback === 'function') callback(textInput.value);
        inputContainer.remove();
    }, {once: true});
}

export function makePositionedInputContainer(element, handler){
    element.addEventListener("click", () => {
        const hasPositionedInput = element.querySelector(".positioned-input-container");
        if(!hasPositionedInput){
            createPositionedTextInput(element, handler);
        }
    });
}