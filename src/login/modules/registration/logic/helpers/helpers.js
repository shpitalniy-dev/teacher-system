import { url } from "../constants/constants";

function checkLogin(inputLogin, outputLogin) {
    var num = parseInt(inputLogin.value[0])
    if (isFinite(num) || inputLogin.value.trim() === "" || !inputLogin.value.split("").every(item => item.match(/[a-zA-Z0-9]/)) || inputLogin.value.length < 5) {
        inputLogin.classList.toggle("red-border", true);
        outputLogin.classList.toggle("error-message", true);
        return false;
    }
    return inputLogin.value;
}
function checkPassword(inputPassword, inputConfirmPassword, outputPassword, outputConfirmPassword) {
    if (inputPassword.value !== inputConfirmPassword.value || inputPassword.value.trim().length < 5 || !inputPassword.value.split("").every(item => item.match(/[a-zA-Z0-9]/))) {
        inputPassword.classList.toggle("red-border", true);
        inputConfirmPassword.classList.toggle("red-border", true);
        outputPassword.classList.toggle("error-message", true);
        outputConfirmPassword.classList.toggle("error-message", true);
        return false;
    }
    return inputPassword.value;
}
function checkPhoneNumber(inputPhoneNumber, outputPhoneNumber) {
    if (inputPhoneNumber.value.trim() === "" || !inputPhoneNumber.value.split("").every(item => item.match(/[0-9]/)) || inputPhoneNumber.value.length < 9) {
        inputPhoneNumber.classList.toggle("red-border", true);
        outputPhoneNumber.classList.toggle("error-message", true);
        return false;
    }
    return inputPhoneNumber.value;
}
function checkMail(inputMail, outputMail) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var address = inputMail.value;
    if (reg.test(address) === false) {
        inputMail.classList.toggle("red-border", true);
        outputMail.classList.toggle("error-message", true);
        return false;
    }
    return inputMail.value;
}
function finishValidate() {
    const teacher = {};
    teacher.login = checkLogin(document.getElementById("login"), document.getElementById("outputLogin"));
    teacher.password = checkPassword(document.getElementById("password"), document.getElementById("confirmPassword"),
                                    document.getElementById("outputPassword"), document.getElementById("outputConfirmPassword"));
    teacher.phone = checkPhoneNumber(document.getElementById("phoneNumber"), document.getElementById("outputPhoneNumber"));
    teacher.mail = checkMail(document.getElementById("mail"), document.getElementById("outputMail"));
    teacher.keyWord = document.getElementById('keyWord').value;

    if (teacher.login && teacher.password && teacher.phone && teacher.mail) {
        return teacher;
    }

    return false;
}

function getTeacherByLogin(teacher) {
    const xhr = new XMLHttpRequest();
    const json = JSON.stringify(teacher);
    xhr.open('POST', url + "check", false);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(json);
    return JSON.parse(xhr.responseText);
};

function checkTeacher(teacher) {
    var answerFromServer = getTeacherByLogin(teacher);
    if (answerFromServer.length == 0) {
        return true;
    }
    return false;
}

export default {
    checkTeacher,
    finishValidate,
};