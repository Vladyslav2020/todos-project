import { CHANGE_TAB, CHANGE_NAME, CHANGE_EMAIL, CHANGE_PASSWORD, CHANGE_CHECK, CLEAR_AUTH_DATA} from "./types";

const initialState = {
    currentTab: "login",
    email: "",
    name: "",
    password: "",
    checked: false
};

export const authReducer = (state = initialState, action) => {
    switch(action.type){
        case CHANGE_TAB: return {...state, currentTab: action.payload};
        case CHANGE_NAME: return {...state, name: action.payload};
        case CHANGE_EMAIL: return {...state, email: action.payload};
        case CHANGE_PASSWORD: return {...state, password: action.payload};
        case CHANGE_CHECK: return {...state, checked: action.payload};
        case CLEAR_AUTH_DATA: return {...initialState};
        default: return {...state};
    }
}