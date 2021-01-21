import React from 'react';
import './TodoItem.css';

class TodoItem extends React.Component{
    render(){
        return(
            <div className = "Todo-item" data-id = {this.props.id}>
                {this.props.execute ? <div className = "flag completed"></div> : <div className = "flag"></div>}
                <p>{this.props.value}</p>
                <div className = "Todo-item-close"><i className="fa fa-times"></i></div>
            </div>
        );
    }
}

export default TodoItem;