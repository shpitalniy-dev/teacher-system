import helpers from "./helpers/helpers";
import { loginUrl } from "./constants/constants";
import { clearError } from "../../../../library/logic/validation";

export function login(inputLogin, outputLogin, inputPassword, outputPassword) {
    clearError(inputLogin, outputLogin);
    clearError(inputPassword, outputPassword);

    const loginTeacher = {};
    loginTeacher.login = helpers.getLogin(inputLogin, outputLogin);
    loginTeacher.password = helpers.getPassword(inputPassword, outputPassword);
    if (!(loginTeacher.login && loginTeacher.password)) {
        console.log('Check input values');
        return false;
    };

    const teacher = helpers.checkTeacher(loginTeacher);
    if (!teacher) {
        console.log('Check login');
        inputLogin.classList.toggle("red-border", true);
        outputLogin.classList.toggle("error-message", true);
        return false;
    }

    if (teacher.password == loginTeacher.password) {
        console.log('login success');
        localStorage.setItem('teacher', JSON.stringify({id: teacher.id, login: teacher.login, role: teacher.role})); //must be edited
        helpers.goToPage(loginUrl);
    } else {
        inputPassword.classList.toggle("red-border", true);
        outputPassword.classList.toggle("error-message", true);
        console.log('Check password');
        return false;
    }
}

