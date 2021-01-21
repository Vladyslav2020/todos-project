import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeTodosInput, showMessage, hideMessage, downloadTodos, logout, showLoader,hideLoader  } from '../redux/actions';
import { useHttp } from '../hooks/useHttp';

const AddTodoItem = () => {
    const dispatch = useDispatch();
    const value = useSelector(state => state.todos.todoInputText);
    const token = useSelector(state => state.login.token);
    const {loading, request, cleanErrors} = useHttp();
    useEffect(() => {
        if (loading)
            dispatch(showLoader());
        else
            dispatch(hideLoader());
    }, [loading]);
    const submitHandler = async (event) => {
        event.preventDefault();
        if (!value) {
            dispatch(showMessage({type: 'warning', message: "Error!! Empty input"}));
            setTimeout(() => dispatch(hideMessage()), 3000);
            return;
        }
        try{
            const response = await request('http://localhost:5000/api/todos/add', "POST", {text: value}, {authorization: token});
            dispatch(changeTodosInput(""));
            dispatch(showMessage({type: "info", message: response.message}));
            dispatch(downloadTodos(token));
            setTimeout(() => dispatch(hideMessage()) , 3000);
        }
        catch(err){
            if (err.message === 'No authorization'){
                dispatch(logout());
            }
            dispatch(showMessage({type: "warning", message: err.message}));
            setTimeout(() => dispatch(hideMessage()), 3000);
            cleanErrors();
        }
    }
    return (
        <React.Fragment>
            <div className = 'container text-center my-3 '><h3 style = {{color: '#0d6efd'}}>Add new Todos</h3></div>
            <form className = 'container' method = 'POST' onSubmit = {submitHandler}>            
                <div className="input-group mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        name="add"
                        id="add"
                        placeholder="What needs to be done?" 
                        aria-label="Recipient's username" 
                        aria-describedby="button-addon2"
                        value={value}
                        required
                        onChange = {(event) => dispatch(changeTodosInput(event.target.value))}
                    />
                    <button 
                        className="btn btn-outline-primary" 
                        type="button" 
                        id="button"
                        disabled={loading}
                        onClick = {submitHandler}
                    >Add todo</button>
                </div>
            </form>
        </React.Fragment>
    );
}

export default AddTodoItem;