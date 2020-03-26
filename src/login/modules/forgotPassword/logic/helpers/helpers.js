import {url} from "../constants/constants";

 function getTeacherByLogin(obj) {
    const xhr = new XMLHttpRequest();
    const json = JSON.stringify(obj);
    xhr.open('POST', url + 'check', false); // must insert url
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.send(json);
    return JSON.parse(xhr.responseText);
}

export default getTeacherByLogin;