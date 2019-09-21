import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function RouteAuth({ path, component: AuthComponent }) {

    let isLogin = localStorage.getItem('_userinfo') ? JSON.parse(localStorage.getItem('_userinfo')) : false;

    return (
        <Route path={path} render={() => isLogin ? <AuthComponent /> : <Redirect to='/login' />} />
    )
}

export default RouteAuth;