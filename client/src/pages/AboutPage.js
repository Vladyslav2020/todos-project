import React from 'react';
import { NavLink } from 'react-router-dom';

const AboutPage = () => {
    return (
        <div className = 'd-flex justify-content-center mt-3'>
            <div className="card text-center" style={{width: '25rem'}}>
                <div className="card-body">
                    <h3 className="card-title">About project</h3>
                    <h5 className="mb-3"><p className="card-text">This is a simple app for todos. 
                    <br/>This application uses the following technologies: <strong>React JS</strong>,&nbsp;
                    <strong>Mongodb</strong>, <strong>Node JS</strong>, <strong>Express</strong>.</p></h5>
                    <NavLink className="btn btn-primary" to='/todos'>Go home</NavLink>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;