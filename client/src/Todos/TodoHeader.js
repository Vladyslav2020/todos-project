import React from 'react';
import './TodoHeader.css';

class TodoHeader extends React.Component{
    render(){
        return(
            <div className = 'Todo-header'>
                <div className = 'Todo-header-label'>todos</div>
            </div>
        );
    }
}

export default TodoHeader;