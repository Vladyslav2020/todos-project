import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodos, editTodosCheck, editTodosClear, editTodosId, editTodosText, updateTodos } from '../redux/actions';

const TodoList = (props) => {
    const todosData = useSelector(state => state.todos);
    const token = useSelector(state => state.login.token);
    const dispatch = useDispatch();
    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(updateTodos(
            todosData.editTodos.id,
            todosData.editTodos.completed,
            todosData.editTodos.text,
            token
        ));
    }
    if (todosData.todos.length === 0)
        return (
            <p className="ps-3">No todos</p>
        );
    const styleDisable = {paddingTop: '12px'};
    let TodoItems = todosData.todos.filter(item => {
        if (props.filter === 'all')
            return true;
        if (props.filter === 'completed' && item.completed)
            return true;
        if (props.filter === 'active' && !item.completed)
            return true;
        return false;
    }).map((item, index) => (
        <tr key = {item.id} >
            <th scope="row"  style={styleDisable}>{index + 1}</th>
            <td style={item.id !== todosData.editTodos.id ? styleDisable: null}>{item.id !== todosData.editTodos.id? item.text :
                <form onSubmit={submitHandler}>
                    <input
                        className = "form-control"
                        value = {todosData.editTodos.text}
                        style = {{paddingTop: '3px', paddingBottom: '3px'}}
                        onChange = {(event) => dispatch(editTodosText(event.target.value))}
                    />
                </form>}
            </td>
            <td style={styleDisable}>{new Date(item.date).toLocaleString()}</td>
            <td style={styleDisable}>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        disabled = {item.id !== todosData.editTodos.id}
                        type="checkbox"
                        id={item.id}
                        checked = {item.id !== todosData.editTodos.id? item.completed : todosData.editTodos.completed}
                        onChange = {(event) => dispatch(editTodosCheck(event.target.checked))}
                    />
                    <label className="form-check-label" htmlFor={item.id}>
                        Completed
                    </label>
                </div>
            </td>
            <td>
                <ul className="list-inline m-0">
                    <li className="list-inline-item">
                        <button
                            className="btn btn-primary btn-sm rounded-0"
                            type="submit"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Save"
                            disabled = {item.id !== todosData.editTodos.id}
                            onClick={submitHandler}
                        ><i className="fa fa-table"></i></button>
                    </li>
                    <li className="list-inline-item">
                        <button
                            className="btn btn-success btn-sm rounded-0"
                            type="button"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Edit"
                            onClick = {() => todosData.editTodos.id !== item.id ? dispatch(editTodosId(item.id, item.text, item.completed))
                                : dispatch(editTodosClear())}
                        ><i className="fa fa-edit"></i></button>
                    </li>
                    <li className="list-inline-item">
                        <button
                            className="btn btn-danger btn-sm rounded-0"
                            type="button"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Delete"
                            onClick={() => dispatch(deleteTodos(item.id, token))}
                        ><i className="fa fa-trash"></i></button>
                    </li>
                </ul>
            </td>
        </tr>
    ));
    if (!TodoItems.length)
        TodoItems = (<tr><td style={{border: 'none'}}><p className="ps-3 mt-3">Empty</p></td></tr>);
    return(
        <table className="table">
            <thead>
                <tr key={0}>
                    <th scope="col" style={{width: '50px'}}>#</th>
                    <th scope="col">Todo</th>
                    <th scope="col" style={{width: '200px'}}>Date</th>
                    <th scope="col" style={{width: '150px'}}>Completed</th>
                    <th scope="col" style={{width: '130px'}}>buttons</th>
                </tr>
            </thead>
            <tbody>
                {TodoItems}
            </tbody>
        </table>
    );
}

export default TodoList;
