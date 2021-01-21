import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeEmail, changePassword, showMessage, hideMessage, login, clearAuthData, showLoader, hideLoader } from '../redux/actions';
import { useHttp } from '../hooks/useHttp';

const Login = () => {
    const {loading, request, cleanErrors} = useHttp();
    const data = useSelector((state) => (state.auth));
    const dispatch = useDispatch();
    useEffect(() => {
        if (loading)
            dispatch(showLoader());
        else
            dispatch(hideLoader());
    }, [loading]);
    const loginHandler = async () =>{
        try{
            const response = await request('http://localhost:5000/api/auth/login', "POST", {email: data.email, password: data.password});
            dispatch(showMessage({type: "info", message: "User logged in"}));
            setTimeout(() => dispatch(hideMessage()), 3000);
            dispatch(login({id: response.userId, token: response.token, name: response.name}));
            dispatch(clearAuthData());
        }
        catch(err){
            dispatch(showMessage({type: 'warning', message: err.message}));
            cleanErrors();
            setTimeout(() => dispatch(hideMessage()) , 3000);
        }
    };
    return (
        <div className = 'container mt-3'>
            <form method = 'POST'>
                <div className="form-floating mb-3">
                    <input 
                        name = "email" 
                        type="email" 
                        className="form-control" 
                        value = {data.email} 
                        id="email" 
                        placeholder="name@example.com" 
                        onChange = {(event) => (dispatch(changeEmail(event.target.value)))}
                        required/>
                    <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating">
                    <input 
                        name = "password" 
                        type="password" 
                        className="form-control" 
                        value = {data.password} 
                        id="password" 
                        placeholder="Password" 
                        onChange = {(event) => (dispatch(changePassword(event.target.value)))}
                        required/>
                    <label htmlFor="password">Password</label>
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary mt-3"
                    onClick = {loginHandler}
                    disabled = {loading}
                    >Login</button>
            </form>
        </div>
    );
}

export default Login;