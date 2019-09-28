import React, { useState, useEffect, Fragment } from 'react';
import { Card, Button, Modal, message } from 'antd';
import Axios from '../../utils/axios';
import Utils from '../../utils/utils';
import clearUserInfo from '../../utils/clearLoginInfo';
import Register from '../../components/Register';
import Pagination from '../../components/Pagination';
import EditForm from './userEditForm';
import Table from '../../components/Table';
import Search from '../../components/Search';
import './main.less';

export default function () {

    let [search] = useState(localStorage.getItem("_search") ? JSON.parse(localStorage.getItem("_search")) : []);
    let [roleList, setRoleList] = useState([]);
    let [showEditUserForm, setShowEditUserForm] = useState(false);
    let [showCreateUserForm, setShowCreateUserForm] = useState(false);
    let [page, setPage] = useState(1);
    let [page_size, setPageSize] = useState(10);
    let [total_count, setTotalCount] = useState(0);
    let [showSizeChanger] = useState(true);
    let [showQuickJumper] = useState(true);
    let [dataSource, setDataSource] = useState([]);
    let [userInfo, setUserInfo] = useState([]);
    let [editForm] = useState([]);

    useEffect(() => {
        if (dataSource.length === 0) {
            request();
        }
    });
    useEffect(() => getRoleList(), []);


    let request = (page_d, pageSize_d, searchs = search) => {
        Axios.ajax({
            url: '/user_list',
            data: {
                params: {
                    page: page_d ? page_d : page,
                    total: pageSize_d ? pageSize_d : page_size,
                    ...searchs
                }
            }
        }).then((res) => {
            if (res.code === 0) {
                localStorage.setItem("_search", JSON.stringify(search));

                setDataSource(res.result);
                setPage(res.page);
                setPageSize(res.page_size);
                setTotalCount(res.total_count);
            }
        })
    }
    // 获取角色列表
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
                let roleList = [{ 'key': '1000', 'value': '全部' }];
                let tempList = {};
                res.result.forEach(item => {
                    tempList = {
                        'key': item.role_id,
                        'value': item.role_name
                    }
                    roleList.push(tempList);
                });
                setRoleList(roleList);
            }
        })
    }
    // 接受子组件传回来的查询参数，重新查询数据
    let searchDataSubmit = (search) => {
        request(1, page_size, search);
    }
    // 改变分页显示条数
    let changePage = (page_d, pageSize_d = false) => {
        request(page_d, pageSize_d);
    }

    let onEdit = (item, type) => {
        if (type === 'edit') {
            // 编辑
            setShowEditUserForm(true);
            setUserInfo(item)
        } else if (type === 'delete') {
            // 删除
            let uid = item.uid;
            let user_name = item.user_name;
            Modal.confirm({
                title: '删除操作',
                content: `你确定要删除"${user_name}"用户吗？`,
                onOk() {
                    Axios.ajax({
                        url: '/delete_user',
                        data: {
                            params: {
                                uid
                            }
                        }
                    }).then((res) => {
                        if (res.code === 0) {
                            request(1);
                            message.success('删除成功');
                        }
                    })
                },
                onCancel() { }
            });
        }
    }

    let onEditUserInfo = () => {
        const userDetail = editForm.getFieldsValue();
        userDetail.uid = userInfo.uid;
        Axios.ajax({
            url: '/edit_user_info',
            data: {
                params: {
                    ...userDetail
                }
            }
        }).then(res => {
            if (res.code === 0) {
                setShowEditUserForm(false);

                let user = localStorage.getItem("_userinfo") ? JSON.parse(localStorage.getItem("_userinfo"))['_username'] : 'caicaijun';
                if (userInfo.user_name === user) {
                    clearUserInfo();
                    window.location.hash = '/#/login';
                    message.success('设置成功');
                } else {
                    request();
                    message.success('设置成功');
                }
            }
        })
    }

    const pagination = { page, page_size, total_count, showSizeChanger, showQuickJumper };

    const columns = [
        {
            title: '用户ID',
            dataIndex: 'uid',
            width: 80
        },
        {
            title: '用户名',
            dataIndex: 'user_name',
            width: 120
        },
        {
            title: '性别',
            dataIndex: 'sex',
            width: 60,
            render(sex) {
                return sex === '1' ? '男' : '女'
            }
        },
        {
            title: '年龄',
            dataIndex: 'age',
            width: 60
        },
        {
            title: '联系地址',
            dataIndex: 'address',
            width: 160
        },
        {
            title: '角色ID',
            dataIndex: 'role_id',
            width: 80
        },
        {
            title: '角色名',
            dataIndex: 'role_name',
            width: 100
        },
        {
            title: '最后登录时间',
            dataIndex: 'last_login_time',
            render(time) { return Utils.dateFormate(time) },
            width: 160
        },
        {
            title: '操作',
            width: 180,
            render: (text, item) => {
                return <div>
                    <Button type='primary' icon='edit' onClick={() => { onEdit(item, 'edit') }}>编辑</Button>
                    <Button type='danger' icon='delete' onClick={() => { onEdit(item, 'delete') }}>删除</Button>
                </div>
            }
        }
    ];

    const searchConfig = [
        {
            searchType: 'select',
            label: '角色名',
            dateKey: 'role_name',
            initValue: search.role_name ? search.role_name : '1000',
            optionList: roleList
        },
        {
            searchType: 'select',
            label: '性别',
            dateKey: 'sex',
            initValue: search.sex ? search.sex : '100',
            optionList: [
                { 'key': '100', 'value': '全部' },
                { 'key': '1', 'value': '男' },
                { 'key': '2', 'value': '女' }
            ]
        },
        {
            searchType: 'input',
            label: '用户名',
            dateKey: 'user_name',
            initValue: search.user_name ? search.user_name : ''
        },
        {
            searchType: 'input_number',
            label: '年龄',
            dateKey: 'age',
            initValue: search.age ? search.age : ''
        }
    ];

    return (
        <Fragment>
            {
                showCreateUserForm ? <Card className='card-wrapper'>
                    <Register isLogin={true} changeOption={() => {
                        setShowCreateUserForm(false);
                        request();
                    }} />
                </Card> :
                    (
                        <Fragment>
                            <Card className='card-wrapper'>
                                <Search searchConfig={searchConfig} searchDataSubmit={searchDataSubmit} />
                            </Card>
                            <Card className='card-diffrent'>
                                <Button type='primary' icon='plus' onClick={() => setShowCreateUserForm(true)}>创建用户</Button>
                                <Table
                                    tableType='default'
                                    rowKey='uid'
                                    columns={columns}
                                    dataSource={dataSource}
                                />
                                <Pagination callback={changePage} pagination={pagination} />
                                <Modal
                                    title='编辑信息'
                                    visible={showEditUserForm}
                                    okText="确定"
                                    cancelText="取消"
                                    onCancel={() => setShowEditUserForm(false)} //editForm.resetFields();
                                    onOk={onEditUserInfo}>
                                    <EditForm
                                        userInfo={userInfo}
                                        wrappedComponentRef={(formData) => { editForm = formData }}
                                    />
                                </Modal>
                            </Card>
                        </Fragment>
                    )
            }
        </Fragment>
    )
}