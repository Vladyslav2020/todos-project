import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeName, changeEmail, changePassword,
    changeCheck, changeTab, showMessage, hideMessage, showLoader, hideLoader } from '../redux/actions';
import { useHttp } from '../hooks/useHttp';


const Register = () => {
    const {loading, request, cleanErrors} = useHttp();
    const data = useSelector(state => (state.auth));
    const dispatch = useDispatch();
    const registerHandler = async () =>{
        try{
            await request('http://localhost:8080/api/auth/register', "POST", {name: data.name, email: data.email, password: data.password});
            dispatch(showMessage({type: "info", message: "Success!!! User created"}));
            setTimeout(() => dispatch(hideMessage()), 3000);
            dispatch(changeTab('login'));
        }
        catch(err){
            dispatch(showMessage({type: "warning", message: err.message}));
            cleanErrors();
            setTimeout(() => dispatch(hideMessage()), 3000);
        }
    };
    useEffect(() => {
        if (loading)
            dispatch(showLoader());
        else
            dispatch(hideLoader());
    }, [loading]);

    return (
        <div className = 'container mt-3'>
            <form method = 'POST'>
                <div className="form-floating mb-3">
                    <input
                        name = "name"
                        type="text" className="form-control"
                        value = {data.name}
                        id="name"
                        placeholder="Name"
                        onChange = {(event) => (dispatch(changeName(event.target.value)))}
                        required />
                    <label htmlFor="name">Your name</label>
                </div>
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
                <div className="mb-3 form-check mt-3">
                    <input
                        name = "check"
                        type="checkbox"
                        className="form-check-input"
                        checked = {data.checked}
                        onChange = {(event) => (dispatch(changeCheck(event.target.checked)))}
                        id="check" />
                    <label className="form-check-label" htmlFor="check" required>I'm not a robot</label>
                </div>
                <button
                    type="submit"
                    className={data.checked ? "btn btn-primary mt-2" : "btn btn-primary mt-2 disabled"}
                    onClick = {registerHandler}
                    disabled = {loading}
                    >Register</button>
            </form>
        </div>
    );
}

export default Register;
