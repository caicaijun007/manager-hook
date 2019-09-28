import React, { useContext } from 'react';
import { Card, Button } from 'antd';
import { Message } from './todoList';
import { addMessageOption } from '../../store/actionCreater';
import './hook.less';

export default function () {
    const { state, dispatch } = useContext(Message);
    function addItem() {
        dispatch(addMessageOption('默认信息'));
    }

    return (
        <Card className='card-wrapper'>
            <Button type='primary' onClick={addItem}>添加默认</Button>
            {
                state.length > 0 ? state.map((item, index) => {
                    return <li key={index}>{item}</li>
                }) : ''
            }
        </Card>
    );
}