import constants from "../../../constants/constants";
import { raw } from "body-parser";

export async function getAdminData(){
    return await fetch(constants.serverUrl + "get-admin-data")
}

export function dataPrepeating(rawData){
    const result = [];
    for(let i = 0; i < rawData.length; i++){
        if(rawData[i].login === 'admin') continue;
        const obj = {};
        for(let key in rawData[i]){
            if(typeof rawData[i][key] === "object"){
                let resultKey;
                let resultValue = 0;
                for(let innerKey in rawData[i][key]){
                    if(rawData[i][key][innerKey] >= resultValue){
                        resultKey = innerKey;
                        resultValue = rawData[i][key][innerKey];
                    }
                }
                obj[key] = resultKey;
            }else{
                obj[key] = rawData[i][key];
            }
        }
        result.push(obj);
    }
    return result;
}