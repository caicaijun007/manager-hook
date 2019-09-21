import React, { useState, useEffect, Fragment } from 'react';
import { Card, Button } from 'antd';
import './hook.less';
function Example() {
    const [count, setCount] = useState(0);
    const [title, setTitle] = useState('你还没点击！');

    useEffect(() => { setTitle(`你点击了${count}次`) }, [count]);

    return (
        <Fragment>
            <Card title={title} className='card-wrapper'>
                <p>{`你点击了${count}次`}</p>
                <Button type='primary' onClick={() => setCount(count + 1)}>点击</Button>
            </Card>
        </Fragment>
    )
}

export default Example;