import constants from "../../../../../constants/constants"

export async function sendNewStudentOnServer(student){
    return await fetch(constants.serverUrl + "create-student", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    })
}

export async function clearGroupOnServer(group){
    return await fetch(constants.serverUrl + "clear-group", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(group)
    })
}

export async function deleteGroupFromServer(group){
    return await fetch(constants.serverUrl + "delete-group", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(group)
    })
}

export function checkNewStudent(inputFirstName, inputLastName, inputAge, inputCity, 
    outputFirstName, outputLastName, outputAge, outputCity){
    const student = {};
    student.firstName = checkText(inputFirstName, outputFirstName);
    student.lastName = checkText(inputLastName, outputLastName);
    student.city = checkText(inputCity, outputCity);
    student.age = checkAge(inputAge, outputAge);
    return student;
}

function checkText(input, output){
    if(!input.value.split("").every(item => item.match(/[a-zA-z]/)) || input.value.trim() === ""){
        input.classList.toggle("red-border", true);
        output.classList.toggle("error-message", true);
        return false;
    }
    return input.value;
}

function checkAge(input, output){
    if(input.value.trim() === "" || !isFinite(input.value) || +input.value > 100 || +input.value < 0){
        input.classList.toggle("red-border", true);
        output.classList.toggle("error-message", true);
        return false;
    }
    return +input.value;
}