import React from 'react';
import './TodoHeader.css';

class TodoHeaderInput extends React.Component{
    render(){
        return(
            <div className = 'Todo-header'>
                <div className = 'Todo-header-input'>
                    {this.props.completedAll? <div className = 'Todo-icon active'><i className="fa fa-angle-down fa-2x"></i></div>
                    : <div className = 'Todo-icon'><i className="fa fa-angle-down fa-2x"></i></div>}
                    <div className = 'Todo-input'><input onChange = {(e) => this.props.onChange(e.target.value)} value = {this.props.value} placeholder = "What needs to be done?"/></div>
                </div>
            </div>
        );
    }
}

export default TodoHeaderInput;