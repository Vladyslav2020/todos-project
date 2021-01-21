import { SHOW_MESSAGE, HIDE_MESSAGE } from "./types";

const initalState = {
    type: "", 
    message: ""
}

export const messageReducer = (state = initalState, action) => {
    switch(action.type){
        case SHOW_MESSAGE: return {...state, type: action.payload.type, message: action.payload.message};
        case HIDE_MESSAGE: return {...state, type: "", message: ""};
        default: return {...state};
    }
}