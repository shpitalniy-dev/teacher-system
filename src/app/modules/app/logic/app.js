import constants from '../../../constants/constants';

export async function getGroupsFromServer(teacher){
    const response = await fetch(constants.serverUrl + "get-groups", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(teacher)
    })
    return await response.json();
}

export async function getUsersRawDataFromServer(teacher){
    const response = await fetch(constants.serverUrl + "get-students", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(teacher)
    })
    return await response.json();
}

export async function renameGroupDB(group){
    return await fetch(constants.serverUrl + "rename-group", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(group)
    })
}

export async function createNewGroup(teacher){
    const newGroup = {};
    newGroup.name = "newGroup";
    newGroup.idTeacher = teacher.id;
    return await fetch(constants.serverUrl + "create-group", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newGroup)
    })
}

