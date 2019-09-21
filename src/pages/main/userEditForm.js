import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Form, Input, Radio, InputNumber, Select } from 'antd';
import Axios from '../../utils/axios';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const Option = Select.Option;
const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 18
    }
}
const rowObject = {
    minRows: 4, maxRows: 6
}

function EditForm(props, ref) {

    let [roleList, setRoleList] = useState([]);

    useEffect(() => getRoleList(), []);

    let getRoleList = () => {
        Axios.ajax({
            url: '/role_list',
            data: {
                params: {
                    type: 1
                }
            }
        }).then(res => {
            if (res.code === 0) {
                setRoleList(res.result);
            }
        })
    }

    const { getFieldDecorator } = props.form;
    const { userInfo } = props;

    useImperativeHandle(ref, () => {
        //暴露子组件的属性与方法
        return props.form;
    })

    return (
        <Form>
            <FormItem label='用户ID' {...formItemLayout} >
                <Input disabled type='text' placeholder={userInfo.uid} />
            </FormItem>
            <FormItem label='用户名' {...formItemLayout} >
                <Input disabled type='text' placeholder={userInfo.user_name} />
            </FormItem>
            <FormItem label="性别" {...formItemLayout}>
                {
                    getFieldDecorator('sex', {
                        initialValue: userInfo.sex
                    })(
                        <RadioGroup>
                            <Radio value='1'>男</Radio>
                            <Radio value='2'>女</Radio>
                        </RadioGroup>
                    )
                }
            </FormItem>
            <FormItem label="年龄" {...formItemLayout}>
                {
                    getFieldDecorator('age', {
                        initialValue: userInfo.age
                    })(
                        <InputNumber />
                    )
                }
            </FormItem>
            <FormItem label="联系地址" {...formItemLayout}>
                {
                    getFieldDecorator('address', {
                        initialValue: userInfo.address
                    })(
                        <TextArea
                            autosize={rowObject}
                        />
                    )
                }
            </FormItem>
            <FormItem label='角色' {...formItemLayout}>
                {
                    getFieldDecorator('role_id', {
                        initialValue: userInfo.role_id
                    })(
                        <Select>
                            {
                                roleList ? roleList.map(item => {
                                    return <Option value={item.role_id} key={item.role_id}>{item.role_name}</Option>
                                }) : <Option value={userInfo.role_id} key={userInfo.role_id}>{userInfo.role_name}</Option>
                            }
                        </Select>)
                }
            </FormItem>
        </Form>
    )
}

export default Form.create()(forwardRef(EditForm));