import React, { useState, useEffect } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import RouteConfig from '../../configs/router.config';
import echartTheme from '../../configs/theme.config';
import echarts from 'echarts/lib/echarts';
import './index.less';
const { Sider } = Layout;
const { SubMenu } = Menu;

function MenuSider(props) {

    let user = localStorage.getItem("_userinfo") ? JSON.parse(localStorage.getItem("_userinfo")) : false;
    let [userInfo] = useState(user);
    let [collapsed, setCollapsed] = useState(false);
    let [openKeys, setOpenKeys] = useState(['/home']);
    let [rootSubmenuKeys] = useState(['/home']);
    let [currentKey, setCurrentKey] = useState((props.currentKey ? props.currentKey : ['/home']));
    //执行其它操作之前，判断用户是否登录
    useEffect(() => {
        if (!user) {
            window.location.hash = '/login';
        }
    });
    //预加载图表主题
    useEffect(() => echarts.registerTheme('manager', echartTheme), []);
    //hash地址改变，改变当前选中菜单项
    useEffect(() => {
        setCurrentKey(props.currentKey);
    }, [props.currentKey]);

    // 菜单递归
    let getMenuList = (routeList) => {
        let roleMenuList = userInfo ? userInfo._menus : '/home';
        roleMenuList = roleMenuList.split(',');
        return routeList.map(item => {
            if (roleMenuList.indexOf(item.path) === -1) {
                return '';
            }
            if (item.routes) {
                rootSubmenuKeys.push(item.path);
                return <SubMenu
                    key={item.path}
                    title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.name}</span>
                        </span>
                    }>
                    {getMenuList(item.routes)}
                </SubMenu>
            }
            return <Menu.Item key={item.path}>
                <NavLink to={item.path} replace>
                    <Icon type={item.icon} />
                    <span>{item.name}</span>
                </NavLink>
            </Menu.Item>
        });
    }

    let handleClick = ({ item, key }) => {
        if (key === currentKey) {
            return false;
        }

        currentKey = [key];
        setCurrentKey(currentKey);

        localStorage.setItem("_menuitem", JSON.stringify(currentKey));
        // 切换菜单，清理上次查询条件
        localStorage.setItem("_search", []);
    }

    // 菜单滑动开关
    let onCollapse = collapsed => {
        setCollapsed(collapsed);
    }
    // 展开父级菜单
    let onOpenChange = oks => {
        const latestOpenKey = oks.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(oks);
        } else {
            oks = latestOpenKey ? [latestOpenKey] : [];
            setOpenKeys(oks);
        }
    }

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} className='menu-sider'>
            <div className="logo" />
            <Menu theme="dark"
                defaultSelectedKeys={currentKey}
                onClick={handleClick}
                selectedKeys={currentKey}
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                mode="inline"
            >
                {getMenuList(RouteConfig)}
            </Menu>
        </Sider>
    )
}

export default MenuSider;