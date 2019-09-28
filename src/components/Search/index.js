import React, { Fragment } from 'react';
import { Form, Input, InputNumber, DatePicker, Radio, Select, Button } from 'antd';
import moment from 'moment';
import './index.less';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

export default Form.create()(function (props) {

    let handleSubmit = (e) => {
        e && e.preventDefault();
        props.form.validateFields((err, value) => {
            if (!err) {
                let searchInfo = props.form.getFieldsValue();
                props.searchDataSubmit(searchInfo);
            }
        })
    }

    let getItemList = (list, itemType) => {
        let itemList = [];
        list.forEach(item => {
            if (itemType === 'option') {
                itemList.push(<Option value={item.key} key={item.key}>{item.value}</Option>);
            } else if (itemType === 'radio') {
                itemList.push(<Radio value={item.key} key={item.key}>{item.value}</Radio>);
            }

        })

        return itemList;
    }

    let getFormList = () => {
        const { getFieldDecorator } = props.form;
        let formList = [];
        props.searchConfig.forEach(item => {
            if (item.searchType === 'input') {
                formList.push(
                    <FormItem label={item.label} key={item.dateKey}>
                        {
                            getFieldDecorator(item.dateKey, {
                                initialValue: item.initValue
                            })(
                                <Input maxLength={12} />)
                        }
                    </FormItem>);
            } else if (item.searchType === 'input_number') {
                formList.push(
                    <FormItem label={item.label} key={item.dateKey}>
                        {
                            getFieldDecorator(item.dateKey, {
                                initialValue: item.initValue
                            })(
                                <InputNumber />)
                        }
                    </FormItem>
                );
            } else if (item.searchType === 'select') {
                formList.push(
                    <FormItem label={item.label} key={item.dateKey}>
                        {
                            getFieldDecorator(item.dateKey, {
                                initialValue: item.initValue
                            })(
                                <Select className='select-option'>
                                    {getItemList(item.optionList, 'option')}
                                </Select>)
                        }
                    </FormItem>
                );
            } else if (item.searchType === 'radio_group') {
                formList.push(
                    <FormItem label={item.label} key={item.dateKey}>
                        {
                            getFieldDecorator(item.dateKey, {
                                initialValue: item.initValue
                            })(
                                <RadioGroup>
                                    {getItemList(item.radioList, 'radio')}
                                </RadioGroup>)
                        }
                    </FormItem>
                );
            } else if (item.searchType === 'date_picker') {
                formList.push(
                    <FormItem label={item.label} key={item.dateKey}>
                        {
                            getFieldDecorator(item.dateKey, {
                                initialValue: item.initValue ? moment(item.initValue) : moment()
                            })(<DatePicker className='date-picker' showTime={item.showTime} />)
                        }
                    </FormItem>
                );
            } else { }
        })
        return formList;
    }

    return (
        <Fragment>
            <Form layout='inline' className='form-wrapper'>
                {getFormList()}
                <Button type='primary' onClick={handleSubmit}>查询</Button>
            </Form>
        </Fragment>
    )
})