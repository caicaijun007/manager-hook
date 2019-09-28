import React from 'react';
import { Layout } from 'antd';
import './index.less';
const { Content } = Layout;

export default function () {
    return (
        <Content className='content'>
            <div>学习 React 和 Ant Design</div>
        </Content>
    )
}