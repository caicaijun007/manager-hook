import React, { useState, useEffect, Fragment } from 'react';
import { Card, Button, Modal, message } from 'antd';
import Axios from '../../utils/axios';
import Utils from '../../utils/utils';
import menuChange from '../../configs/menu.config';
import clearLoginInfo from '../../utils/clearLoginInfo';
import Pagination from '../../components/Pagination';
import PermissonForm from './rolePermissionForm';
import RoleForm from './roleForm';
import Table from '../../components/Table';
import Search from '../../components/Search';
import './main.less';

function Role() {

    let [search] = useState(localStorage.getItem("_search") ? JSON.parse(localStorage.getItem("_search")) : []);
    let [roleList, setRoleList] = useState([]);
    let [showCreateRole, setShowCreateRole] = useState(false);
    let [showSetPermission, setShowSetPermission] = useState(false);
    let [page, setPage] = useState(1);
    let [page_size, setPageSize] = useState(10);
    let [total_count, setTotalCount] = useState(0);
    let [showSizeChanger] = useState(true);
    let [showQuickJumper] = useState(true);
    let [dataSource, setDataSource] = useState([]);
    let [selectedRowKeys, setSelectedRowKeys] = useState('');
    let [selectedRows, setSelectedRows] = useState(null);
    let [menuInfo, setMenuInfo] = useState([]);
    let [roleDetail, setRoleDetail] = useState([]);
    let [roleForm] = useState([]);
    let [permissonForm] = useState([]);

    useEffect(() => {
        if (dataSource.length === 0) {
            request();
        }
    });
    useEffect(() => getRoleList(), []);

    let request = (page_d, pageSize_d, search_d = search) => {
        Axios.ajax({
            url: '/role_list',
            data: {
                params: {
                    page: page_d ? page_d : page,
                    total: pageSize_d ? pageSize_d : page_size,
                    ...search_d
                }
            }
        }).then((res) => {
            if (res.code === 0) {
                res.result.map((item, index) => {
                    return item.key = index;
                });
                localStorage.setItem("_search", JSON.stringify(search_d));

                setDataSource(res.result);
                setSelectedRowKeys('');
                setSelectedRows(null);
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
    let searchDataSubmit = (searchs) => {
        request(1, page_size, searchs);
    }
    // 改变分页显示条数
    let changePage = (page_d, pageSize_d = false, searchs = search) => {
        request(page_d, pageSize_d, searchs);
    }

    let changeRow = (selectedRowKeys, selectedRows) => {
        selectedRowKeys = [selectedRowKeys];
        setSelectedRowKeys(selectedRowKeys);
        setSelectedRows(selectedRows);
    }

    let onCreateRole = () => {
        setShowCreateRole(true);
    }

    let createRole = () => {
        // console.log(parentRef.current.getFieldsValue());
        // console.log(roleForm.getFieldsValue());
        let data = roleForm.getFieldsValue();
        data.authorize_user = JSON.parse(localStorage.getItem("_userinfo"))['_username'];
        Axios.ajax({
            url: '/create_role',
            data: {
                params: {
                    ...data
                }
            }
        }).then((res) => {
            if (res.code === 0) {
                setShowCreateRole(false);
                request(1);
                message.info('创建成功');
            }
        })
    }

    let onSetPermission = () => {
        if (!selectedRows) {
            Modal.info({
                title: '提示信息',
                content: '请选择一个角色'
            })
            return;
        }
        let menuInfo = selectedRows.menus;
        menuInfo = menuInfo ? menuInfo.split(',') : [];
        setShowSetPermission(true);
        setMenuInfo(menuInfo);
        setRoleDetail(selectedRows);
    }

    let setPermission = () => {
        let data = permissonForm.getFieldsValue();
        data.role_id = selectedRows.role_id;
        data.menus = menuInfo;
        Axios.ajax({
            url: '/edit_permission',
            data: {
                params: {
                    ...data
                }
            }
        }).then((res) => {
            if (res.code === 0) {
                setShowSetPermission(false);
                if (data.role_id === 1001) {
                    clearLoginInfo();
                    window.location.hash = '/#/login';
                    message.success('设置成功');
                } else {
                    request();
                    message.success('设置成功');
                }

            }
        });
    }

    let onDeleteRole = () => {
        if (!selectedRows) {
            Modal.info({
                title: '提示信息',
                content: '请选择一个角色'
            })
            return;
        }

        const { role_id, role_name } = selectedRows;
        Modal.confirm({
            title: '删除操作',
            content: `你确定要删除"${role_name}"角色吗？`,
            onOk() {
                Axios.ajax({
                    url: '/delete_role',
                    data: {
                        params: {
                            role_id
                        }
                    }
                }).then((res) => {
                    if (res.code === 0) {
                        request(1);
                        message.success('删除成功');
                    }
                });
            },
            onCancel() { }
        });
    }

    const pagination = { page, page_size, total_count, showSizeChanger, showQuickJumper };

    const columns = [
        {
            title: '角色ID',
            dataIndex: 'role_id',
            width: 100
        },
        {
            title: '角色名称',
            dataIndex: 'role_name',
            width: 150
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            render(time) { return Utils.dateFormate(time) },
            width: 150
        },
        {
            title: '使用状态',
            dataIndex: 'status',
            render(status) {
                if (status === '1') {
                    return "启用"
                } else {
                    return "停用"
                }
            },
            width: 100
        },
        {
            title: '权限',
            dataIndex: 'menus',
            render(menus) {
                return menus.split(',').map((item) => {
                    if (menuChange[item]) {
                        return menuChange[item];
                    }
                    return '';
                }).filter((item) => {
                    return item;
                }).join('/');
            },
            width: 250
        },
        {
            title: '授权人',
            dataIndex: 'authorize_user',
            width: 100
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
            label: '使用状态',
            dateKey: 'status',
            initValue: search.status ? search.status : '100',
            optionList: [
                { 'key': '100', 'value': '全部' },
                { 'key': '1', 'value': '启用' },
                { 'key': '0', 'value': '停用' }
            ]
        },
        {
            searchType: 'input',
            label: '授权人',
            dateKey: 'authorize_user',
            initValue: search.authorize_user ? search.authorize_user : ''
        }
    ];

    return (
        <Fragment>
            <Card className='card-wrapper'>
                <Search searchConfig={searchConfig} searchDataSubmit={searchDataSubmit} />
            </Card>
            <Card className='card-diffrent'>
                <Button type='primary' icon='plus' onClick={onCreateRole}>创建角色</Button>
                <Button type='primary' icon='edit' onClick={onSetPermission}>设置权限</Button>
                <Button type='danger' icon='delete' onClick={onDeleteRole}>删除</Button>
                <Table
                    tableType='radio'
                    columns={columns}
                    dataSource={dataSource}
                    changeRow={changeRow}
                    selectedRowKeys={selectedRowKeys}
                />
                <Pagination callback={changePage} pagination={pagination} />
            </Card>
            <Modal
                title='创建角色'
                visible={showCreateRole}
                okText="确定"
                cancelText="取消"
                onCancel={() => {
                    setShowCreateRole(false);
                }}
                onOk={createRole}>
                {/* <RoleForm ref={parentRef} /> */}
                <RoleForm wrappedComponentRef={(formData) => { roleForm = formData }} />
            </Modal>
            <Modal
                title='设置权限'
                visible={showSetPermission}
                okText="确定"
                cancelText="取消"
                onCancel={() => setShowSetPermission(false)}
                onOk={setPermission}>
                <PermissonForm
                    wrappedComponentRef={(formData) => { permissonForm = formData }}
                    roleDetail={roleDetail}
                    menuInfo={menuInfo || []}
                    checkMenuInfo={(checkedKeys) => setMenuInfo(checkedKeys)}
                />
            </Modal>
        </Fragment>
    )
}

export default Role;