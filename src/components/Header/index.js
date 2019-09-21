import React, { useState, Fragment } from 'react';
import { Layout, Avatar, Breadcrumb, Button } from 'antd';
import clearLoginInfo from '../../utils/clearLoginInfo';
import './index.less';
const { Header } = Layout;

function HeaderLayout() {

    let user = localStorage.getItem("_userinfo") ? JSON.parse(localStorage.getItem("_userinfo"))['_username'] : '菜菜君';
    let [userName] = useState(user);

    // 注销
    let onLogout = () => {
        clearLoginInfo();
        window.location.hash = '/login';
    }

    return (
        <Fragment>
            <Header className='header'>
                <span> <Avatar className='icon' icon="user" />{userName}</span>
                <Button type='link' onClick={onLogout}>注销</Button>
            </Header>
            <Breadcrumb className='bread'>
                <Breadcrumb.Item>首页</Breadcrumb.Item>
            </Breadcrumb>
        </Fragment>
    )
}

export default HeaderLayout;