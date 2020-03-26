import { combineReducers } from "redux";
import { commonReducer } from "./reducers/commonReducer";
import { translatesReducer } from "./reducers/translateReducer";

export default combineReducers({
    common: commonReducer,
    translates: translatesReducer,
});