import React, { useState, Fragment } from 'react';
import { Card, Form, Button, Input, Checkbox, Radio, Select, Switch, DatePicker, TimePicker, Upload, Icon, message, InputNumber, BackTop } from 'antd';
import moment from 'moment';
import './form.less';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;

export default Form.create()(function (props) {

    let [userImg, setUserImg] = useState(null);
    let [loading, setLoading] = useState(false);
    const { getFieldDecorator, validateFields, getFieldsValue } = props.form;

    const formItemLayout = {
        labelCol: {
            xs: 24,
            sm: 4
        },
        wrapperCol: {
            xs: 24,
            sm: 12
        }
    }
    const offsetLayout = {
        wrapperCol: {
            xs: 24,
            sm: {
                span: 12,
                offset: 4
            }
        }
    }
    const rowObject = {
        minRows: 4, maxRows: 6
    }

    let handleSubmit = () => {
        let userInfo = getFieldsValue();
        validateFields((err, value) => {
            if (!err) {
                message.success(`${userInfo.userName} 恭喜登录成功！登陆密码为： ${userInfo.userPwd}`);
            }
        });
    }

    let getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    let handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                setUserImg(imageUrl);
                setLoading(false);
            });
        }
    }

    return (
        <Fragment>
            <BackTop />
            <Card title="注册表单" className='card-wrapper'>
                <Form layout="horizontal">
                    <FormItem label="用户名" {...formItemLayout}>
                        {
                            getFieldDecorator('userName', {
                                initialValue: '',
                                rules: [
                                    {
                                        required: true,
                                        message: '用户名不能为空'
                                    }
                                ]
                            })(
                                <Input placeholder="请输入用户名" />
                            )
                        }
                    </FormItem>
                    <FormItem label="密码" {...formItemLayout}>
                        {
                            getFieldDecorator('userPwd', {
                                initialValue: ''
                            })(
                                <Input type="password" placeholder="请输入密码" />
                            )
                        }
                    </FormItem>
                    <FormItem label="性别" {...formItemLayout}>
                        {
                            getFieldDecorator('sex', {
                                initialValue: '1'
                            })(
                                <RadioGroup>
                                    <Radio value="1">男</Radio>
                                    <Radio value="2">女</Radio>
                                </RadioGroup>
                            )
                        }
                    </FormItem>
                    <FormItem label="年龄" {...formItemLayout}>
                        {
                            getFieldDecorator('age', {
                                initialValue: 18
                            })(
                                <InputNumber />
                            )
                        }
                    </FormItem>
                    <FormItem label="当前状态" {...formItemLayout}>
                        {
                            getFieldDecorator('state', {
                                initialValue: '1'
                            })(
                                <Select>
                                    <Option value="1">咸鱼一条</Option>
                                    <Option value="2">海边吹风</Option>
                                    <Option value="3">公园散步</Option>
                                    <Option value="4">一起登山</Option>
                                    <Option value="5">到处逛街</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label="爱好" {...formItemLayout}>
                        {
                            getFieldDecorator('interest', {
                                initialValue: ['2', '5']
                            })(
                                <Select mode="multiple">
                                    <Option value="1">游泳</Option>
                                    <Option value="2">打篮球</Option>
                                    <Option value="3">踢足球</Option>
                                    <Option value="4">跑步</Option>
                                    <Option value="5">爬山</Option>
                                    <Option value="6">骑行</Option>
                                    <Option value="7">桌球</Option>
                                    <Option value="8">麦霸</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label="是否已婚" {...formItemLayout}>
                        {
                            getFieldDecorator('isMarried', {
                                valuePropName: 'checked',
                                initialValue: true
                            })(
                                <Switch />
                            )
                        }
                    </FormItem>
                    <FormItem label="生日" {...formItemLayout}>
                        {
                            getFieldDecorator('birthday', {
                                initialValue: moment('2019-08-21')
                            })(
                                <DatePicker
                                    showTime
                                    format="YYYY-MM-DD HH:mm:ss"
                                />
                            )
                        }
                    </FormItem>
                    <FormItem label="联系地址" {...formItemLayout}>
                        {
                            getFieldDecorator('address', {
                                initialValue: '太空宇宙'
                            })(
                                <TextArea
                                    autosize={rowObject}
                                />
                            )
                        }
                    </FormItem>
                    <FormItem label="早起时间" {...formItemLayout}>
                        {
                            getFieldDecorator('time')(
                                <TimePicker />
                            )
                        }
                    </FormItem>
                    <FormItem label="头像" {...formItemLayout}>
                        {
                            getFieldDecorator('userImg')(
                                <div>
                                    <Upload
                                        listType="picture-card"
                                        // showUploadList={false}
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        onChange={handleChange}
                                        loading={loading}
                                    >
                                        {userImg ? <img alt='' src={userImg} /> : <Icon type="plus" />}
                                    </Upload>
                                </div>
                            )
                        }
                    </FormItem>
                    <FormItem {...offsetLayout}>
                        {
                            getFieldDecorator('read')(
                                <Checkbox checked>我已阅读过<a href="/">简单协议</a></Checkbox>
                            )
                        }
                    </FormItem>
                    <FormItem {...offsetLayout}>
                        <Button type="primary" onClick={handleSubmit}>注册</Button>
                    </FormItem>
                </Form>
            </Card>
        </Fragment>
    )
})