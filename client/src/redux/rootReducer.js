import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { messageReducer } from './messagesReducer';
import { loginReducer } from './loginReducer';
import { todosReducer } from './todosReducer';
import { loaderReducer } from './loaderReducer';

export const rootReducer = combineReducers({auth: authReducer, message: messageReducer, login: loginReducer, 
    todos: todosReducer, loader: loaderReducer});
