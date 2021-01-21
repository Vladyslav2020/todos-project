import React from 'react';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import Login from '../components/Login';
import Register from '../components/Register';
import { changeTab } from '../redux/actions';
import '../styles/auth.css';


const AuthPage = (props) => {
    return (
        <div>
            <div className = "container mt-2">
                <h2 className = "text-center">Please, {props.currentTab}</h2>
            </div>
            <ul className="nav nav-tabs px-3  pr-3">
                <li className="nav-item" onClick = {() => props.changeTab('login')}>
                    <a className={props.currentTab === 'login'? "nav-link active" :  "nav-link"}>Login</a>
                </li>
                <li className="nav-item" onClick = {() => props.changeTab('register')}>
                    <a className={props.currentTab === 'register'? "nav-link active": "nav-link"}>Register</a>
                </li>
            </ul>
            {props.currentTab === 'login'? 
            <Login />:
            <Register />}
        </div>
    );
}

const mapDispatchToProps = {
    changeTab
};

const mapStateToProps = (state) => {
    return state.auth;
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);