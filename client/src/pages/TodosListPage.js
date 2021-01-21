import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddTodoItem from '../components/AddTodoItem';
import TodoList from '../components/TodoList';
import { changeTodosTab, downloadTodos } from '../redux/actions';


const TodosListPage = () => {
    const token = useSelector(state => state.login.token);
    const tab = useSelector(state => state.todos.todosTab);
    const tabsDisplay = useSelector(state => state.todos.todos.length !== 0) ? '' : 'none';
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(downloadTodos(token));
    }, []);
    return (
        <div className = "container mt-3">
            <div className = 'container'>
                <AddTodoItem />
            </div>
            <div className = 'container'>
                <div className = 'container text-center my-3 '><h3 style = {{color: '#0d6efd'}}>Todos list</h3></div>
                <ul style={{display: tabsDisplay}} className="nav nav-tabs mb-3">
                    <li className="nav-item" onClick = {() => dispatch(changeTodosTab('all'))}>
                        <a 
                            className={tab ==="all"? "nav-link active" : "nav-link"} 
                            aria-current="page"
                        >All</a>
                    </li>
                    <li className="nav-item" onClick = {() => dispatch(changeTodosTab('active'))}>
                        <a 
                            className={tab ==="active"? "nav-link active" : "nav-link"} 
                        >Active</a>
                    </li>
                    <li className="nav-item" onClick = {() => dispatch(changeTodosTab('completed'))}>
                        <a 
                            className={tab ==="completed"? "nav-link active" : "nav-link"} 
                        >Completed</a>
                    </li>
                    
                </ul>
                <TodoList filter={tab}/>
            </div>
            
        </div>
    );
}

export default TodosListPage;