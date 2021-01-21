import { HIDE_LOADER, SHOW_LOADER } from "./types";

const initalState = {
    visible: false
};

export const loaderReducer = (state = initalState, action) => {
    switch(action.type){
        case HIDE_LOADER: return {...state, visible: false};
        case SHOW_LOADER: return {...state, visible: true};
        default: return {...state};
    }
}