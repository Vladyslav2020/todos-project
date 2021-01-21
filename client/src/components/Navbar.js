import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout, clearAuthData } from '../redux/actions';
import User from './User';

const Navbar = () => {
    const dispatch = useDispatch();
    const loginData = useSelector(state => state.login);
    const [openNav, setOpenNav] = useState(false);
    const submitHandler = event => {
        event.preventDefault(); 
        dispatch(logout());
        dispatch(clearAuthData());
    }
    const toggleHandler = () => {
        setOpenNav(!openNav);
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href = "" onClick = {(event) => event.preventDefault()}>Todos application</a>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                    onClick = {toggleHandler}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={"collapse navbar-collapse" + (openNav ? ' show' : '')} id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link active" aria-current="page" to="/todos">Todos list</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to = '/about'>About</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to = '/detail/12'>Details</NavLink>
                    </li>
                </ul>
                    <form className="d-flex" onSubmit = {submitHandler}>
                        {loginData.isAutinticated && <User name={loginData.name}/>}
                        <button 
                            className="btn btn-outline-danger" 
                            type="submit"
                            >Logout</button>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;