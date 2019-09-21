import React, { useState, Fragment } from 'react';
import { Card, Button, Modal } from 'antd';

function Modals() {

    let [showModal1, setShowModal1] = useState(false);
    let [showModal2, setShowModal2] = useState(false);
    let [showModal3, setShowModal3] = useState(false);
    let [showModal4, setShowModal4] = useState(false);

    let handleOpen = type => type(true);

    let handleInfoTip = (type) => {
        Modal[type]({
            title: 'React antd',
            content: (
                <div>
                    <p>学习React antd基础知识...</p>
                    <p>学习React antd基础知识...</p>
                </div>
            ),
            onOk() { },
        });
    }

    let handleComfirm = () => {
        Modal.confirm({
            title: 'React antd',
            content: '学习React antd基础知识...',
            onOk() {
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                }).catch(() => console.log('errors!'));
            },
            onCancel() { }
        });
    }

    return (
        <Fragment>
            <Card title='基本对话框' className='card-wrapper'>
                <Button type="primary" onClick={() => handleOpen(setShowModal1)}>Open</Button>
                <Button type="primary" onClick={() => handleOpen(setShowModal2)}>自定义页脚</Button>
                <Button type="primary" onClick={() => handleOpen(setShowModal3)}>顶部20px弹框</Button>
                <Button type="primary" onClick={() => handleOpen(setShowModal4)}>水平垂直居中</Button>
            </Card>
            <Card title='信息提示' className='card-wrapper'>
                <Button onClick={() => { handleInfoTip('info') }}>Info</Button>
                <Button onClick={() => { handleInfoTip('success') }}>Success</Button>
                <Button onClick={() => { handleInfoTip('error') }}>Error</Button>
                <Button onClick={() => { handleInfoTip('warning') }}>Warning</Button>
            </Card>
            <Card title='确认对话框' className='card-wrapper'>
                <Button onClick={handleComfirm}>Confirm</Button>
                <Button type='primary' onClick={handleComfirm}>Confirm</Button>
            </Card>
            <Modal
                title='open'
                visible={showModal1}
                onCancel={() => setShowModal1(false)}
                onOk={() => setShowModal1(false)}
            >
                <p>第一个对话框</p>
            </Modal>
            <Modal
                title="React"
                visible={showModal2}
                okText="完成"
                cancelText="取消"
                onOk={() => setShowModal2(false)}
                onCancel={() => setShowModal2(false)}
            >
                <p>学习React antd基础知识</p>
            </Modal>
            <Modal
                title="React"
                visible={showModal3}
                style={{ top: 20 }}
                onOk={() => setShowModal3(false)}
                onCancel={() => setShowModal3(false)}
            >
                <p>学习React antd基础知识</p>
            </Modal>
            <Modal
                title="React"
                visible={showModal4}
                centered
                onOk={() => setShowModal4(false)}
                onCancel={() => setShowModal4(false)}
            >
                <p>学习React antd基础知识</p>
            </Modal>
        </Fragment>
    )
}

export default Modals;