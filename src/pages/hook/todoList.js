import React, { useState, useEffect, createContext, useReducer, Fragment } from 'react';
import { Card, Button, Input, List, Icon } from 'antd';
import Reducer, { defaultState } from '../../store/reducer';
import { addMessageOption, deleteMessageOption } from '../../store/actionCreater';
import ReduxPage from './redux';
import './hook.less';
const ListItem = List.Item;
export const Message = createContext({});

export default function () {
    const [inputValue, setInputValue] = useState('');
    const [state, dispatch] = useReducer(Reducer, defaultState);

    useEffect(() => localStorage.setItem('_itemlist', JSON.stringify(state)));

    function changeInputValue(e) {
        setInputValue(e.target.value);
    }

    function addInputValue() {
        if (inputValue && '' !== inputValue) {
            dispatch(addMessageOption(inputValue));
            setInputValue('');
        }
    }

    function getItemList() {
        return state.map((item, index) => <ListItem key={index} onClick={() => deleteItem(index)}>{item}<Icon className='icon' type="minus-circle" theme="twoTone" /></ListItem>);
    }

    function deleteItem(index) {
        dispatch(deleteMessageOption(index));
    }

    return (
        <Message.Provider value={{ state, dispatch }}>
            <Fragment>
                <Card title='任务清单' className='card-wrapper'>
                    <Input className='input' placeholder='请输入任务' value={inputValue} onChange={changeInputValue} />
                    <Button type='primary' onClick={addInputValue}>添加</Button>
                    <List className='list' size="small" bordered>
                        {
                            state.length > 0 ? getItemList() : ''
                        }
                    </List>
                </Card>
                <ReduxPage />
            </Fragment>
        </Message.Provider>
    )
}