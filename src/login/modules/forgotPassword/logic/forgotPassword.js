import {url} from "./constants/constants";
import getTeacherByLogin from "./helpers/helpers";


function getKeyWord(locale) {
    const output = document.getElementById('output');
    const loginModal = document.getElementById('inputLoginModal');
    const keyWordElement = document.getElementById('inputKeyWordModal');
    const outputLoginModal = document.getElementById("outputLoginModal");
    const outputKeyWordModal = document.getElementById("outputKeyWordModal");
    const password = document.getElementById("password");
    const obj = {};

    if(!loginModal.value.trim() || !loginModal.value.split("").every(item => item.match(/[a-zA-Z0-9]/))){
        output.classList.toggle("show-password", false);
        loginModal.classList.toggle("red-border", true);
        outputLoginModal.classList.toggle("error-message", true);
    }

    if(!keyWordElement.value.trim()){
        output.classList.toggle("show-password", false);
        keyWordElement.classList.toggle("red-border", true);
        outputKeyWordModal.classList.toggle("error-message", true);
    }

    obj.login = loginModal.value.trim();
    obj.keyWord = keyWordElement.value.trim();

    if (!(obj.login && obj.keyWord)) {
        return false
    }

    const res = getTeacherByLogin(obj);

    if(res.length === 0){
        output.classList.toggle("show-password", false);
        loginModal.classList.toggle("red-border", true);
        outputLoginModal.classList.toggle("error-message", true);
        return false;
    }

    if (res[0].keyword === obj.keyWord) {
        output.classList.toggle("show-password", true);
        password.innerHTML =  res[0].password;
    } else {
        output.classList.toggle("show-password", false);
        keyWordElement.classList.toggle("red-border", true);
        outputKeyWordModal.classList.toggle("error-message", true);
        return false;
    }
}



export default getKeyWord;
