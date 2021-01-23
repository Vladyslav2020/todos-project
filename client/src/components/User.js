import React from 'react';

const User = (props) => {
    return (
        <form className="d-flex" onSubmit = {props.onSubmit}>
            <div className="pt-1 me-2">
                <i className="fa fa-user me-2" style={{fontSize: '25px', color: '#0d6efd'}}></i>
                <div className='d-inline' style={{fontSize: '20px', fontWeight: 500, color: '#0d6efd'}}>{props.name}</div>
            </div>
            <button 
                className="btn btn-outline-danger" 
                type="submit"
            >Logout</button>
        </form>
    );
}

export default User;