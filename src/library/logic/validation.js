export function checkTextInputValue(event){
    if(!event.key.match(/[a-zA-Z0-9]/)){
        event.preventDefault();
    }
}

export function checkNumberInputValue(event){
    if(!event.key.match(/[0-9]/)){
        if(event.key != "Backspace"){
            event.preventDefault();
        }
    }
}

export function checkMailInputValue(event){
    if(!event.key.match(/[a-zA-Z0-9@.]/)){
        event.preventDefault();
    }
}

export function checkLoginInputValue(event){
    if(event.target.value.length === 0 && !event.key.match(/[a-zA-Z]/)){
        event.preventDefault();
    }else if(!event.key.match(/[a-zA-Z0-9@.-]/)){
        event.preventDefault();
    }
}

export function checkNameInputValue(event){
    if(!event.key.match(/[a-zA-Z -]/)){
        event.preventDefault();
    }
}

export function checkGroupNameInputValue(event){
    if(!event.key.match(/[a-zA-Z0-9 -()]/)){
        event.preventDefault();
    }
}

export function clearError(inputElement, outputElement){
    inputElement.classList.toggle("red-border", false);
    outputElement.classList.toggle("error-message", false);
}

export function clearErrorFromInput(inputElement){
    inputElement.classList.toggle("red-border", false);
}

export function checkNumberWithPointInputValue(event){
    if(!event.key.match(/[0-9.{1}]/)){
        if(event.key != "Backspace"){
            event.preventDefault();
        }
    }
}