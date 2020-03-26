import {url} from "../../logic/constants/constants";
import {getTeacherIdFromStorage} from "../../logic/helpers/helpers.js";

export function getTextareaInfo(){
    let object = {
        id : getTeacherIdFromStorage(),
        addinfo : document.querySelector('#addInfoText').value,
    }
   sendAddInfo(object);
}
function sendAddInfo(object){
    const xhr = new XMLHttpRequest();
    const json = JSON.stringify(object);
    xhr.open('POST', url + "updateTeacher-addInfo", false);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(json);
    return JSON.parse(xhr.responseText);
    let id = object.id;
    getTeacherById();
}
export function some() {
    let id = {
        id : getTeacherIdFromStorage()
    }
    getTeacherById(id)
}
export function getTeacherById(id) {
console.log(id)
    const xhr = new XMLHttpRequest();
    const json = JSON.stringify(id);
    xhr.open('POST', url + "get-teacher", false);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(json);
    let valueForTextarea = JSON.parse(xhr.responseText);
    console.log(valueForTextarea)
         document.querySelector(`#addInfoText`).value = valueForTextarea[0].addinfo;
};