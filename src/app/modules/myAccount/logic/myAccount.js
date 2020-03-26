import obj from "./helpers/helpers";
import {updateTeacherInfo} from "./helpers/helpers.js";



export default function getNewTeacherInfo() {
    var newTeacherInfoObject = {
        id: obj.getTeacherIdFromStorage(),
        login: obj.getLogin(),
        mail: obj.getMail(),
        phone: obj.getPhone()
    }
   updateTeacherInfo(newTeacherInfoObject);
}