import {url} from "../constants/constants";
import getNewTeacherInfo from "../myAccount.js";

export function getTeacherInfoToMyAccount(){
    let id = {
        id : getTeacherIdFromStorage()
    };
    getTeacherById(id);
}

export function getTeacherIdFromStorage(){
    let teacherId = localStorage.getItem('teacher');
     return JSON.parse(teacherId).id;
}

function getLogin(){
    return document.querySelector(`#userProfileLogin`).value;
}



function getPhone(){
    return document.querySelector(`#userProfilePhoneNumber`).value;
}

function getMail(){
    return document.querySelector(`#userProfileMail`).value;
}

function getTeacherById(id) {
    const xhr = new XMLHttpRequest();
    const json = JSON.stringify(id);
    xhr.open('POST', url + "get-teacher", false);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(json);
    let valuesForInput = JSON.parse(xhr.responseText);
         document.querySelector(`#userProfileLogin`).defaultValue = valuesForInput[0].login;
         document.querySelector(`#userProfileMail`).value = valuesForInput[0].mail;
         document.querySelector(`#userProfilePhoneNumber`).value = valuesForInput[0].phone;

        valuesForInput[0].teacher_avatar === null ?
         document.querySelector('.sidebar-avatar').style.backgroundImage = document.querySelector('.sidebar-avatar').style.backgroundImage :
         document.querySelector('.sidebar-avatar').style.backgroundImage = `url(${valuesForInput[0].teacher_avatar.toString()})`
};

export function updateTeacherInfo(newTeacherInfoObject){
    const xhr = new XMLHttpRequest();
    const json = JSON.stringify(newTeacherInfoObject);
    xhr.open('POST', url + "update_teacher", false);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(json);
    return JSON.parse(xhr.responseText);
};


export function finishValidate() {
    const teacher = {};
    teacher.login = checkLogin(document.getElementById("userProfileLogin"), document.getElementById("userOutputLogin"));
    teacher.phone = checkPhoneNumber(document.getElementById("userProfilePhoneNumber"), document.getElementById("userOutputPhoneNumber"));
    teacher.mail = checkMail(document.getElementById("userProfileMail"), document.getElementById("userOutputMail"));
    if (teacher.login && teacher.phone && teacher.mail) {
       getNewTeacherInfo();
       return true;
    } else {
       return false;
    }
}


export function checkLogin(inputLogin, outputLogin) {
    var num = parseInt(inputLogin.value[0]);
    if (isFinite(num) || inputLogin.value.trim() === "" || !inputLogin.value.split("").every(item => item.match(/[a-zA-Z0-9]/))) {
        inputLogin.classList.toggle("red-border", true);
        outputLogin.classList.toggle("error-message", true);
        return false;
    }
    return inputLogin.value;
}

export function checkPhoneNumber(inputPhoneNumber, outputPhoneNumber) {
console.log(outputPhoneNumber)
    if (inputPhoneNumber.value.trim() === "" || !inputPhoneNumber.value.split("").every(item => item.match(/[0-9]/)) || inputPhoneNumber.value.length < 9) {
        inputPhoneNumber.classList.toggle("red-border", true);
        outputPhoneNumber.classList.toggle("error-message", true);
        return false;
    }
    return inputPhoneNumber.value;
}

export function checkMail(inputMail, outputMail) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var address = inputMail.value;
    if (reg.test(address) === false) {
        inputMail.classList.toggle("red-border", true);
        outputMail.classList.toggle("error-message", true);
        return false;
    }
    return inputMail.value;
}

export function clearError(inputElement, outputElement){
    inputElement.classList.toggle("red-border", false);
    outputElement.classList.toggle("error-message", false);
}

 export function sendImage () {
   let files = document.getElementById('file').files;
   if (files.length > 0) {
       getBase64(files[0]);
   }
};

function getBase64(file) {
let dataType = file.name.substring(file.name.lastIndexOf('.')+1,file.name.length).toLowerCase()
if(dataType != 'png' && dataType != 'svg' && dataType != 'jpg') {
    return;
} else {
console.log("ffffffffff", file);
   let reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
       let body = {
           teacher_avatar: reader.result,
           id : getTeacherIdFromStorage(),
       };
       console.log(reader.result)
       let xhr = new XMLHttpRequest();
       xhr.open("POST", url + "send_image", false);
       xhr.setRequestHeader("Content-type", "application/json");
       xhr.send(JSON.stringify(body));
       getImage();
   };
  }
}


function getImage() {
    let body = {
                   id : getTeacherIdFromStorage(),
               };
     let xhr = new XMLHttpRequest();
        xhr.open("POST", url + "get-teacher", false);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(body));
         let image = JSON.parse(xhr.responseText);
         document.querySelector('.sidebar-avatar').style.backgroundImage = `url(${image[0].teacher_avatar.toString()})`
 }

 //ADD_INFO_LOGIC



export default {
    getTeacherIdFromStorage,
    getLogin,
    getMail,
    getPhone,
};

