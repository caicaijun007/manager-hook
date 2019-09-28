import React, { Fragment, useEffect } from 'react';
import { Form, Input, Button, Icon, message } from 'antd';
import Axios from '../../utils/axios';
import Utils from '../../utils/utils';
import clearLoginInfo from '../../utils/clearLoginInfo';
import { now } from 'moment';
import './index.less';
const FormItem = Form.Item;

export default Form.create({})(function (props) {

    //登录之前，清除上次登录信息
    let user = localStorage.getItem('_userinfo') ? JSON.parse(localStorage.getItem('_userinfo')) : false;
    useEffect(() => {
        if (user) {
            clearLoginInfo();
        }
    });

    const { getFieldDecorator, validateFields, getFieldsValue } = props.form;

    let onlogin = (e) => {
        e && e.preventDefault();
        validateFields((err, value) => {
            if (!err) {
                let userInfo = getFieldsValue();
                userInfo.password = Utils.encrypt(userInfo.password);
                userInfo.time = now();
                Axios.ajax({
                    url: '/login',
                    method: 'POST',
                    data: {
                        params: {
                            ...userInfo
                        }
                    }
                }).then((res) => {
                    if (res.code === 0) {
                        let _userinfo = {
                            '_username': userInfo.username,
                            '_roleid': res.result.role_id,
                            '_menus': res.result.menus
                        }
                        localStorage.setItem("_userinfo", JSON.stringify(_userinfo));
                        window.location.href = '/#/home';
                        message.success(`欢迎 ${userInfo.username} 登录管理后台！`);
                    }
                })
            }
        });
    }

    let checkReg = (rule, value, callback) => {
        let reg = /^\w+$/g;
        if (!value) {
            callback(`不能为空`);
        } else if (value.length < 6 || value.length > 12) {
            callback(`长度必须在6-12范围内`);
        } else if (!reg.test(value)) {
            callback(`必须是字母或者数字`);
        } else {
            callback();
        }
    }

    return (
        <Fragment>
            <div className='login-container'>
                <div className='login-form'>
                    <div className='login-title'>管理后台</div>
                    <Form>
                        <FormItem>
                            {
                                getFieldDecorator('username', {
                                    initialValue: '',
                                    rules: [{ validator: checkReg }]
                                })(
                                    <Input prefix={<Icon type="user" />} placeholder="请输入用户名" />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('password', {
                                    initialValue: '',
                                    rules: [
                                        { validator: checkReg }
                                    ]
                                })(
                                    <Input prefix={<Icon type="lock" />} type="password" placeholder="请输入密码" />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            <Button type='link' className='left-link' onClick={() => { window.location.hash = '/register'; }}>注册用户</Button>
                            <Button type='link' className='right-link'>忘记密码</Button>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" className='login-button' onClick={onlogin}>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        </Fragment>
    )
})
