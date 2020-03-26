import constants from "../../../../../constants/constants";

export async function updateStudent(student){
    // const student = getUpdatedStudent(element, id);
    const response = await fetch(constants.serverUrl + "update-student", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    });
    return response;
}

export function getUpdatedStudent(element, id, teacher){
    const row = element.parentElement.parentElement;
    const student = {};
    student.id = id;
    student.firstName = checkText(row.cells[1].firstChild);
    student.lastName = checkText(row.cells[2].firstChild);
    student.age = checkAge(row.cells[3].firstChild);
    student.city = checkText(row.cells[4].firstChild);
    student.teacherLogin = teacher.login;
    return student;
}

export async function deleteStudent(id, teacher){
    const response = await fetch(constants.serverUrl + "delete-student", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id, teacherLogin: teacher.login})
    });
    return response;
}

function checkText(input){
    if(!input.value.split("").every(item => item.match(/[a-zA-z]/)) || input.value.trim() === ""){
        input.classList.toggle("red-border", true);
        return false;
    }
    return input.value;
}

function checkAge(input){
    if(input.value.trim() === "" || !isFinite(input.value) || +input.value > 100 || +input.value < 0){
        input.classList.toggle("red-border", true);
        return false;
    }
    return +input.value;
}