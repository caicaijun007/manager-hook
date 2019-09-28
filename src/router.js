import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import RouteAuth from './auth';
import App from './App';
import BaseLayout from './components/BaseLayout';
import ContentLayout from './components/Content';
import Btn from './pages/ui/btn';
import Modals from './pages/ui/modals';
import Loadings from './pages/ui/loadings';
import Notifications from './pages/ui/notifications';
import Messages from './pages/ui/messages';
import Login from './pages/form/login';
import Register from './pages/form/register';
import BasicTable from './pages/table/basicTable';
import HightTable from './pages/table/hightTable';
import Bar from './pages/echarts/bar';
import Pie from './pages/echarts/pie';
import Line from './pages/echarts/line';
import Role from './pages/main/role';
import User from './pages/main/user';
import LoginPage from './components/Login';
import RegisterPage from './components/Register';
import PhoneTable from './pages/phone/table';
import PhoneCharts from './pages/phone/charts';
import Click from './pages/hook/click';
import TodoList from './pages/hook/todoList';

export default function () {
    return (
        <HashRouter>
            <App>
                <Switch>
                    <Route path='/login' component={LoginPage} />
                    <Route path='/register' component={RegisterPage} />
                    <Route path='/' render={() =>
                        <BaseLayout>
                            <Switch>
                                <RouteAuth path='/home' component={ContentLayout} />
                                <RouteAuth path='/ui/btn' component={Btn} />
                                <RouteAuth path='/ui/modals' component={Modals} />
                                <RouteAuth path='/ui/loadings' component={Loadings} />
                                <RouteAuth path='/ui/notification' component={Notifications} />
                                <RouteAuth path='/ui/messages' component={Messages} />
                                <RouteAuth path='/form/login' component={Login} />
                                <RouteAuth path='/form/register' component={Register} />
                                <RouteAuth path='/table/basic' component={BasicTable} />
                                <RouteAuth path='/table/hight' component={HightTable} />
                                <RouteAuth path='/charts/bar' component={Bar} />
                                <RouteAuth path='/charts/pie' component={Pie} />
                                <RouteAuth path='/charts/line' component={Line} />
                                <RouteAuth path='/main/role' component={Role} />
                                <RouteAuth path='/main/user' component={User} />
                                <RouteAuth path='/phone/table' component={PhoneTable} />
                                <RouteAuth path='/phone/charts' component={PhoneCharts} />
                                <RouteAuth path='/hook/click' component={Click} />
                                <RouteAuth path='/hook/todo' component={TodoList} />
                                <Redirect to="/login" />
                            </Switch>
                        </BaseLayout>
                    } />
                </Switch>
            </App>
        </HashRouter>
    )
}