import React, { useEffect } from 'react';
import { Layout } from 'antd';
import clearLoginInfo from '../../utils/clearLoginInfo';
import MenuSider from '../MenuSider';
import Header from '../Header';
import Footer from '../Footer';

export default function (props) {
    //拦截hash路由地址改变，越权操作
    let roleMenuList = localStorage.getItem("_userinfo") ? JSON.parse(localStorage.getItem("_userinfo"))['_menus'] : '';
    roleMenuList = roleMenuList.split(',');
    let route = window.location.hash.replace(/#|\?.*$/g, '');

    let flag = roleMenuList.indexOf(route);
    useEffect(() => {
        if ((route !== '/login' || route !== '/register') && flag === -1) {
            clearLoginInfo();
            window.location.hash = '/login';
        }
    });

    //切换当前选中菜单
    let currentKey = [route];
    //保存菜单状态
    localStorage.setItem("_menuitem", JSON.stringify([route]));

    return (
        <Layout className='base-layout'>
            <MenuSider currentKey={currentKey} />
            <Layout>
                <Header />
                {props.children}
                <Footer />
            </Layout>
        </Layout>
    )
}