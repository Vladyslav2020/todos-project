import { CHANGE_TODOS_INPUT, EDIT_TODOS_COMPLETE, UPLOAD_TODOS, EDIT_TODOS_ID, EDIT_TODOS_TEXT, EDIT_TODOS_CLEAR, CHANGE_TODOS_TAB } from "./types";

const initialState = {
    todoInputText: "",
    editTodos: {id: "", text: "", completed: false},
    todos: [],
    todosTab: 'all'
};

export const todosReducer = (state = initialState, action) => {
    switch(action.type){
        case CHANGE_TODOS_INPUT: return {...state, todoInputText: action.payload.text};
        case UPLOAD_TODOS: return {...state, todos: action.payload.todos};
        case EDIT_TODOS_ID: return {...state, editTodos: {...state.editTodos, id: action.payload.id, 
            completed: action.payload.complete, text: action.payload.text}};
        case EDIT_TODOS_COMPLETE: return {...state, editTodos: {...state.editTodos, completed: action.payload.complete}};
        case EDIT_TODOS_TEXT: return {...state, editTodos: {...state.editTodos, text: action.payload.text}};
        case EDIT_TODOS_CLEAR: return {...state, editTodos: {...initialState.editTodos}};
        case CHANGE_TODOS_TAB: return {...state, todosTab: action.payload.tab};
        default: return {...state};
    }
}