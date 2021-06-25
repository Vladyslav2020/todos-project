import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import TodosListPage from './pages/TodosListPage';
import AboutPage from './pages/AboutPage';

export const useRoutes = isAutinticated => {
    if (isAutinticated){
        return (
            <Switch>
                <Route path = '/todos' exact>
                    <TodosListPage />
                </Route>
                <Route path = '/about' exact>
                    <AboutPage />
                </Route>
                <Redirect to = '/todos' />
            </Switch>
        );
    }
    else{
        return (
            <Switch>
                <Route path = '/' exact>
                    <AuthPage />
                </Route>
                <Route path = '/about' exact>
                    <AboutPage />
                </Route>
                <Redirect to = '/' />
            </Switch>
        );
    }
}
