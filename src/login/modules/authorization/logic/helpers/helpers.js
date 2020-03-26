import {url} from "../constants/constants";
import {loginUrl} from "../constants/constants";

function getLogin(inputLogin, outputLogin){
    if(!document.querySelector(`#inputLogin`).value.trim() || 
    !document.querySelector(`#inputLogin`).value.split("").every(item => item.match(/[a-zA-Z0-9]/))){
        inputLogin.classList.toggle("red-border", true);
        outputLogin.classList.toggle("error-message", true);
        return false;
    }
    return document.querySelector(`#inputLogin`).value;
}

function getPassword(inputPassword, outputPassword){
    if(!document.querySelector(`#inputPassword`).value.trim() ||
    !document.querySelector(`#inputPassword`).value.split("").every(item => item.match(/[a-zA-Z0-9]/))){
        inputPassword.classList.toggle("red-border", true);
        outputPassword.classList.toggle("error-message", true);
        return false;
    }
    return document.querySelector(`#inputPassword`).value;
}

function checkTeacher(teacher){
    var answerFromServer = getTeacherByLogin(teacher);
    if(answerFromServer.length == 0){
      return false;
    }
    return answerFromServer[0];
};

function goToPage(url){
	document.location.href = url;
}

function setTeacherInLocalStorage(key, object){
    localStorage.setItem(key, JSON.stringify(object));
}

export function getTeacherByLogin(teacher){
    const xhr = new XMLHttpRequest();
    const json = JSON.stringify(teacher);
    console.log(teacher)
    xhr.open('POST', url + "check", false);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.send(json);
    return JSON.parse(xhr.responseText);
}

export default {
    getTeacherByLogin,
    setTeacherInLocalStorage,
    goToPage,
    checkTeacher,
    getPassword,
    getLogin
};