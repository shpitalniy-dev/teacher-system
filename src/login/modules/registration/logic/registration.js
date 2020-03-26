// const url = "https://shrouded-sea-30605.herokuapp.com/";
import { url } from "./constants/constants";
import helpers from "./helpers/helpers";

export function createTeacher() {
    const newTeacher = helpers.finishValidate();

    if (!newTeacher) {
        console.log("Check input values");
        return false;
    }

    if (!helpers.checkTeacher(newTeacher)) {
        document.getElementById("login").classList.toggle("red-border", true);
        document.getElementById("outputLogin").classList.toggle("error-message", true);
        return false
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url + "insert_teacher");
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log("Success");
            }
        }
    };
    xhr.send(JSON.stringify(newTeacher));
    return true;
}