import constants from "../../app/constants/constants";

export function sendTime(teacher, mode, time){
    fetch(constants.serverUrl + "send-time", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            teacherLogin: teacher.login, 
            mode: mode,
            time: time
        })
    }).catch(error => console.log(error));
}