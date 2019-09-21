import React from 'react';
import { Card, Button, message } from 'antd';
import './ui.less';

function Messages() {

    let showMessage = type => {
        message[type]("学习React Antd基础知识")
    }

    let handleMessage = type => {
        message[type]('学习React Antd基础知识', 5);
    }

    return (
        <div>
            <Card title="全局提示框" className="card-wrapper">
                <Button type="primary" onClick={() => showMessage('success')}>Success</Button>
                <Button onClick={() => showMessage('info')}>Info</Button>
                <Button onClick={() => showMessage('warning')}>Warning</Button>
                <Button onClick={() => showMessage('error')}>Error</Button>
                <Button onClick={() => showMessage('loading')}>Loading</Button>
            </Card>
            <Card title="定时关闭全局提示框" className="card-wrapper">
                <Button type="primary" onClick={() => handleMessage('info')}>Open</Button>
                <Button onClick={() => handleMessage('loading')}>Loading</Button>
            </Card>
        </div>
    )
}

export default Messages;