import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideMessage } from '../redux/actions';
import { CSSTransition } from 'react-transition-group';
import '../styles/message.css';

const Message = () => {
    const dispatch = useDispatch();
    const alert = useSelector(state => state.message);
    const _className = "alert-dismissible message fade show alert alert-" + alert.type;
    return (
        <CSSTransition 
            in={alert.type.length > 0}
            timeout={400}
            classNames='message'
            mountOnEnter
            unmountOnExit
        >
            <div className={_className} role="alert">
                <strong>Attention!! </strong>{alert.message}
                <button 
                    type="button" 
                    className="btn-close" 
                    data-bs-dismiss="alert" 
                    aria-label="Close"
                    onClick = {() => dispatch(hideMessage())}
                ></button>
            </div>
        </CSSTransition>
    );
};

export default Message;