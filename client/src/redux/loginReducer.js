import { LOGIN, LOGOUT } from "./types";

const initalState = {
    userId: null, 
    token: null, 
    isAutinticated: false
};

export const loginReducer = (state = initalState, action) => {
    switch(action.type){
        case LOGIN: return {...state, userId: action.payload.id, token: action.payload.token, name: action.payload.name, isAutinticated: !!action.payload.token};
        case LOGOUT: return {...initalState};
        default: return {...state};
    }
}