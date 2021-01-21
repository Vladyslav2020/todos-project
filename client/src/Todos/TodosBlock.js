import React from 'react';
import './TodosBlock.css';
import TodoHeader from './TodoHeader';
import TodoFooter from './TodoFooter';
import TodoItem from './TodoItem'; 
import TodoHeaderInput from './TodoHeaderInput';

class TodosBlock extends React.Component{
    constructor (){
        super();
        this.state = {value: "", completedAll: false, key: 0, tab: '0', list: []};
        this.onChange = this.onChange.bind(this);
        this.prepareList = this.prepareList.bind(this);
        this.keyPress = document.addEventListener("keydown", (e) => {
            if (e.keyCode === 13 && this.state.value !== ''){
                this.onAddition(this.state.value);
            }
        });
        this.click = document.addEventListener("click", (e)  => {
            if (e.target.matches(".Todo-item .flag")){
                e.target.classList.toggle("completed");
                const elem = e.target.closest(".Todo-item"),
                    list = this.state.list,
                    item = list.find(item => item.key === +elem.dataset.id);
                if (item)
                {
                    item.execute = e.target.classList.contains('completed');
                }
                let cnt = this.state.list.reduce((prev, item) => {
                    if (item.execute)
                        return prev + 1;
                    return prev;
                }, 0)
                if (cnt === 0)
                    cnt = false;
                else
                if (cnt === this.state.list.length)
                    cnt = true;
                else
                    cnt = this.state.completedAll;
                
                this.setState(prevState => ({value: prevState.value, completedAll:cnt, key: prevState.key, tab: prevState.tab, list}));
            }
            if (e.target.matches(".Todo-footer .tab")){
                this.setState(prevState => ({value: prevState.value, completedAll: prevState.completedAll, key: prevState.key, tab: e.target.dataset.index, list: prevState.list}));
            }
            if (e.target.matches(".Todo-footer .Todo-clear-completed")){
                let list = this.state.list.filter(item => !item.execute);
                this.setState(prevState => ({value: prevState.value, completedAll: false, key: prevState.key, tab: prevState.tab, list}));
            }
            if (e.target.matches(".Todo-header-input .Todo-icon i")){
                if (this.state.completedAll){
                    const list = this.state.list.map(elem => {
                        elem.execute = false;
                        return elem;
                    });
                    this.setState(prevState => ({value: prevState.value, completedAll: false, key: prevState.key, tab: prevState.tab, list}));
                }
                else{
                    const list = this.state.list.map(elem => {
                        elem.execute = true;
                        return elem;
                    });
                    this.setState(prevState => ({value: prevState.value, completedAll: true, key: prevState.key, tab: prevState.tab, list}));
                }
            }
            if (e.target.matches(".Todo-item .Todo-item-close i")){
                let cntCompleted = 0;
                const list = [];
                this.state.list.forEach(item => {
                    if (item.key !== +e.target.closest(".Todo-item").dataset.id)
                    {
                        if (item.execute)
                            cntCompleted++;
                        list.push(item);
                    }
                });
                let completedAll = false;
                if (cntCompleted === 0)
                    completedAll = false;
                else
                if (cntCompleted === list.length)
                    completedAll = true;
                else
                    completedAll = this.state.completedAll;
                this.setState(prevState => ({value: prevState.value, completedAll, key: prevState.key, tab: prevState.tab, list}));
            }
        });
    }
    onChange(value){
        this.setState(prevState => ({value, completedAll: prevState.completedAll, key: prevState.key, tab: prevState.tab, list: prevState.list}));
    }
    onAddition(value){
        this.setState(prevState => ({value: "", completedAll: false, key: prevState.key + 1, tab: prevState.tab, list: [...prevState.list, {execute: false, key: prevState.key + 1, text: value}]}));
    }

    prepareList(){
        if (this.state.tab === '0')
            return this.state.list;
        else
        if (this.state.tab === '1')
            return this.state.list.filter(item => {
                if (!item.execute)
                    return true;
                else
                    return false;
            });
        else
            return this.state.list.filter(item => {
                if (item.execute)
                    return true;
                else
                    return false;
            });
    }
    
    render(){
        const items = this.prepareList().map(item => 
                (<TodoItem key = {item.key} execute = {item.execute} id = {item.key} value = {item.text}/>)
            );
        const cnt = this.state.list.reduce((prev, item) => {
            if (!item.execute)
                return prev + 1;
            else
                return prev;
        }, 0);
        return (
            <div className = 'Todos-block'>
                <TodoHeader />
                <div className = "Todo-list">
                    <TodoHeaderInput value = {this.state.value} onChange = {this.onChange} completedAll = {this.state.completedAll}/>
                        {items}
                        <TodoFooter cnt = {cnt} tab = {this.state.tab}/>
                </div>
            </div>
        );
    }
}

export default TodosBlock;