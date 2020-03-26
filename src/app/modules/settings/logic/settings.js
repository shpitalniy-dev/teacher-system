import constants from "../../../constants/constants";

export async function resetAllDB(teacher, groupNames){
    return await fetch(constants.serverUrl + "reset-students", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(groupNames)
    }).then(fetch(constants.serverUrl + "reset-groups", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(teacher)
    })).catch(error => console.log(error));
}