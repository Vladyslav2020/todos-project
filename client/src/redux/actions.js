import { CHANGE_CHECK, CHANGE_EMAIL, CHANGE_NAME, CHANGE_TAB, 
    CHANGE_PASSWORD, SHOW_MESSAGE, HIDE_MESSAGE, LOGIN, LOGOUT, 
    CHANGE_TODOS_INPUT, UPLOAD_TODOS, CLEAR_AUTH_DATA, EDIT_TODOS_COMPLETE, 
    EDIT_TODOS_TEXT, EDIT_TODOS_ID, EDIT_TODOS_CLEAR, CHANGE_TODOS_TAB, SHOW_LOADER, HIDE_LOADER } from "./types"

export const changeTab = (tab) => {
    return {
        type: CHANGE_TAB,
        payload: tab
    };
}

export const changeName = (name) => {
    return {
        type: CHANGE_NAME,
        payload: name
    };
}

export const changeEmail = (email) => {
    return {
        type: CHANGE_EMAIL,
        payload: email
    };
}

export const changePassword = (password) => {
    return {
        type: CHANGE_PASSWORD,
        payload: password
    };
}

export const changeCheck = (check) => {
    return {
        type: CHANGE_CHECK,
        payload: check
    };
}

export const clearAuthData = () => {
    return {
        type: CLEAR_AUTH_DATA
    };
}

export const showMessage = ({type, message}) =>{
    return {
        type: SHOW_MESSAGE,
        payload: {type, message}
    };
}

export const hideMessage = () => {
    return {
        type: HIDE_MESSAGE
    };
}

export const login = ({id, token, name}) => {
    localStorage.setItem('user', JSON.stringify({id, token, name}));
    return {
        type: LOGIN,
        payload: {id, token, name}
    };
}

export const logout = () => {
    localStorage.removeItem('user');
    return {
        type: LOGOUT
    };
}

export const changeTodosInput = (value) => {
    return {
        type: CHANGE_TODOS_INPUT,
        payload: {text: value}
    };
}

export const uploadTodos = (todos) => {
    return {
        type: UPLOAD_TODOS,
        payload: {todos: (todos || [])}
    };
}


export const downloadTodos = (token) => {
    return async dispatch => {
        try{
            dispatch(showLoader());
            const response = await fetch('http://localhost:5000/api/todos/', {method: "GET", body: null, 
                headers: {authorization: token, 'Content-Type' : 'application/json'}});
            const data = await response.json() || {todos: []};
            dispatch(hideLoader());
            if (response.status === 401)
                dispatch(logout());
            dispatch(uploadTodos(data.todos));
        }
        catch(err){
            //console.log("ERROR:", err.message);
            dispatch(hideLoader());
            if (err.message === 'No authorization'){
                dispatch(logout());
            }
            dispatch(showMessage({type: 'warning', message: 'Something is wrong...'}));
            setTimeout(() => dispatch(hideMessage()), 3000);
            return;
        }
    };
}

export const editTodosId = (id, text, complete) => {
    return {
        type: EDIT_TODOS_ID,
        payload: {id, text, complete}
    };
}

export const editTodosCheck = (complete) => {
    return {
        type: EDIT_TODOS_COMPLETE,
        payload: {complete}
    };
}

export const editTodosText = (text) => {
    return {
        type: EDIT_TODOS_TEXT,
        payload: {text}
    };
}

export const editTodosClear = () => {
    return {
        type: EDIT_TODOS_CLEAR
    };
}

export const deleteTodos = (id, token) => {
    return async dispatch => {
        try{
            dispatch(showLoader());
            const response = await fetch('http://localhost:5000/api/todos/delete', {method: "POST", body: JSON.stringify({id}), 
                headers: {authorization: token, 'Content-Type' : 'application/json'}});
            const data = await response.json();
            dispatch(hideLoader());
            dispatch(showMessage({type: 'info', message: data.message}));
            if (response.status === 401)
                dispatch(logout());
            setTimeout(() => dispatch(hideMessage()), 3000);
            dispatch(downloadTodos(token));
        }
        catch(err) {
            //console.log("ERROR:", err.message);
            if (err.message === 'No authorization'){
                dispatch(logout());
            }
            dispatch(hideLoader());
            dispatch(showMessage({type: 'warning', message: "Something is wrong..."}))
            setTimeout(() => dispatch(hideMessage()), 3000);
        }
    }
}

export const updateTodos = (id, completed, text, token) => {
    return async dispatch => {
        try{
            dispatch(showLoader());
            const response = await fetch('http://localhost:5000/api/todos/update', {method: "POST", 
                body: JSON.stringify({id, completed, text}), 
                headers: {'Content-Type': 'application/json', authorization: token}});
            const data = await response.json();
            dispatch(editTodosClear());
            dispatch(hideLoader());
            dispatch(showMessage({type: 'info', message: data.message}));
            if (response.status === 401)
                dispatch(logout());
            setTimeout(() => dispatch(hideMessage()), 3000);
            dispatch(downloadTodos(token));
        }
        catch (err) {
            //console.log("ERROR:", err.message);
            if (err.message === 'No authorization'){
                dispatch(logout());
            }
            dispatch(hideLoader());
            dispatch(showMessage({type: 'warning', message: "Something is wrong..."}))
            setTimeout(() => dispatch(hideMessage()), 3000);
        }
    }
}

export const changeTodosTab = (tab) => {
    return {
        type: CHANGE_TODOS_TAB,
        payload: {tab}
    };
}

export const showLoader = () => {
    return {
        type: SHOW_LOADER
    };
}

export const hideLoader = () => {
    return {
        type: HIDE_LOADER
    };
}