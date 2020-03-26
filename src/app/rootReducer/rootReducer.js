import { chatReducer } from "./reducers/chatReducer";
import { adminReducer } from "./reducers/adminReducer";
import { paintReducer } from "./reducers/paintReducer";
import { usersReducer } from "./reducers/usersReducer";
import { commonReducer } from "./reducers/commonReducer";
import { combineReducers } from "redux";
import { converterReducer } from "./reducers/converterReducer";
import { translatesReducer } from "./reducers/translateReducer";
import { userProfileReducer } from "./reducers/userProfileReducer";
import {addInfoReducer} from "./reducers/addInfoReducer";

export default combineReducers({
    users: usersReducer,
    admin: adminReducer,
    paint: paintReducer,
    chats: chatReducer,
    common: commonReducer,
    converter: converterReducer,
    translates: translatesReducer,
    userProfile: userProfileReducer,
    addInfo: addInfoReducer,
});