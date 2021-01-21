import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from './routes';
import { login } from './redux/actions';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Message from './components/Message';

function App (){
    const authData = useSelector(state => state.login);
    const loading = useSelector(state => state.loader.visible);
    const dispatch = useDispatch();
    useEffect(() => {
        const authDataStorage = JSON.parse(localStorage.getItem('user'));
        if (authDataStorage)
            dispatch(login({id: authDataStorage.id, token: authDataStorage.token, name: authDataStorage.name}));
    }, [authData.id, authData.token]);
    const routes = useRoutes(authData.isAutinticated);
    return(
        <BrowserRouter>
            <Navbar />
            <Message />
            {loading && <Loader/>}
            <div className = 'container'>
                {routes}
            </div>
        </BrowserRouter>
    );
}

export default App;
