import React, { Fragment } from 'react';
import { Card, Button, notification, Select } from 'antd';
import './ui.less';
const { Option } = Select;

export default function () {

    let handleOpen = () => {
        notification.open({
            message: 'react',
            description: 'react and antd',
            onClick: () => {
                console.log('notification')
            },
            onClose: () => {
                console.log('notification')
            }
        });
    }

    let openNotification = (type) => {
        notification[type]({
            message: 'react',
            description: 'react and antd'
        });
    }


    const options = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
    return (
        <Fragment>
            <Card title='基本使用' className='card-wrapper'>
                <Button type='primary' onClick={handleOpen}>Open</Button>
            </Card>
            <Card title="带图标通知提醒框" className="card-wrapper">
                <Button onClick={() => openNotification('success')}>Success</Button>
                <Button onClick={() => openNotification('info')}>Info</Button>
                <Button onClick={() => openNotification('warning')}>Warning</Button>
                <Button onClick={() => openNotification('error')}>Error</Button>
            </Card>
            <Card title="不同位置通知提醒框" className="card-wrapper">
                <Select
                    style={{ width: 120, marginRight: 16 }}
                    defaultValue="topRight"
                    onChange={placement => {
                        notification.config({
                            placement
                        });
                    }}
                >
                    {options.map(item => (
                        <Option key={item} value={item}>
                            {item}
                        </Option>
                    ))}
                </Select>
                <Button type='primary' onClick={handleOpen}>Open</Button>
            </Card>
        </Fragment>
    )
}