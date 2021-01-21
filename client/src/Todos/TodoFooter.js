import React from 'react';
import './TodoFooter.css';

class TodoFooter extends React.Component{
    render(){
        return (
            <div className = 'Todo-footer'>
                <div className = "Todo-cnt">{this.props.cnt} items left</div>
                <div className = 'Todo-footer-tabs'>
                    {this.props.tab === '0' ? <div data-index = "0" className = "tab active">All</div> : <div data-index = "0" className = "tab">All</div>}
                    {this.props.tab === '1' ? <div data-index = "1" className = "tab active">Active</div> : <div data-index = "1" className = "tab">Active</div>}
                    {this.props.tab === '2' ? <div data-index = "2" className = "tab active">Completed</div> : <div data-index = "2" className = "tab">Completed</div>}
                </div>
                <div className = "Todo-clear-completed">Clear completed</div>
            </div>
        );
    }
}

export default TodoFooter;