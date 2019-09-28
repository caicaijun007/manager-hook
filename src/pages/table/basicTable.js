import React, { useState, useEffect, Fragment } from 'react';
import Axios from '../../utils/axios';
import { Card, Modal, Button, message, BackTop } from 'antd';
import Table from '../../components/Table';
import Pagination from '../../components/Pagination';
import './table.less';

export default function () {

    let [dataSource, setDataSource] = useState([]);
    let [page, setPage] = useState(1);
    let [page_size, setPageSize] = useState(10);
    let [total_count, setTotalCount] = useState(0);
    let [showSizeChanger] = useState(true);
    let [showQuickJumper] = useState(true);
    let [selectedRows, setSelectedRows] = useState(null);
    let [selectedRowKeys, setSelectedRowKeys] = useState('');

    useEffect(() => {
        if (dataSource.length === 0) {
            request();
        }
    });

    let request = (page_d, pageSize_d) => {
        Axios.ajax({
            url: '/table_list',
            data: {
                params: {
                    page: page_d ? page_d : page,
                    total: pageSize_d ? pageSize_d : page_size
                }
            }
        }).then((res) => {
            if (res.code === 0) {
                res.result.map((item, index) => {
                    return item.key = index;
                });
                setDataSource(res.result);
                setSelectedRows(null);
                setPage(res.page);
                setPageSize(res.page_size);
                setTotalCount(res.total_count);
            }
        })
    }

    // 改变分页显示条数
    let changePage = (page_d, pageSize_d = false) => {
        request(page_d, pageSize_d);
    }

    let changeSelected = (selectedRowKeys, selectedRows) => {
        setSelectedRowKeys(selectedRowKeys);
        setSelectedRows(selectedRows);
    }

    let changeRow = (selectedRowKeys, selectedRows) => {
        selectedRowKeys = [selectedRowKeys];
        setSelectedRowKeys(selectedRowKeys);
        setSelectedRows(selectedRows);
    }

    let handleDelete = () => {
        let ids = [];
        selectedRows.map((item) => {
            return ids.push(item.id);
        })

        Modal.confirm({
            title: '删除提示',
            content: `你确定要删除${ids.join(',')}数据吗？`,
            onOk: () => {
                message.success('删除成功');
                request();
            }
        })
    }


    const columns = [
        {
            title: 'id',
            dataIndex: 'id'
        },
        {
            title: '用户名',
            dataIndex: 'user_name'
        },
        {
            title: '性别',
            dataIndex: 'sex',
            render(sex) {
                return sex === '1' ? '男' : '女'
            }
        },
        {
            title: '状态',
            dataIndex: 'state',
            render(state) {
                let config = {
                    '1': '咸鱼一条',
                    '2': '海边吹风',
                    '3': '公园散步',
                    '4': '一起登山',
                    '5': '到处逛街',
                }
                return config[state];
            }
        },
        {
            title: '爱好',
            dataIndex: 'interest',
            render(data) {
                let config = {
                    '1': '游泳',
                    '2': '打篮球',
                    '3': '踢足球',
                    '4': '跑步',
                    '5': '爬山',
                    '6': '骑行',
                    '7': '桌球',
                    '8': '麦霸',
                }
                return config[data];
            }
        },
        {
            title: '生日',
            dataIndex: 'birthday'
        },
        {
            title: '地址',
            dataIndex: 'address'
        },
        {
            title: '早起时间',
            dataIndex: 'time'
        }
    ];

    const pagination = { page, page_size, total_count, showSizeChanger, showQuickJumper };

    return (
        <Fragment>
            <BackTop />
            <Card title='基础表格' className='card-wrapper'>
                <Table
                    tableType='default'
                    rowKey='id'
                    columns={columns}
                    dataSource={dataSource}
                />
            </Card>
            <Card title="单选表格" className='card-wrapper'>
                <Table
                    tableType='radio'
                    columns={columns}
                    dataSource={dataSource}
                    changeRow={changeRow}
                    selectedRowKeys={selectedRowKeys}
                />
            </Card>
            <Card title="多选表格" className='card-wrapper'>
                <div>
                    <Button type='primary' icon='edit'>编辑</Button>
                    <Button type='danger' icon='delete' onClick={handleDelete}>删除</Button>
                </div>
                <Table
                    tableType='checkbox'
                    columns={columns}
                    dataSource={dataSource}
                    changeSelected={changeSelected}
                    selectedRowKeys={selectedRowKeys}
                />
            </Card>
            <Card title="分页表格" className='card-wrapper'>
                <Table
                    tableType='default'
                    rowKey='id'
                    columns={columns}
                    dataSource={dataSource}
                />
                <Pagination callback={changePage} pagination={pagination} />
            </Card>
        </Fragment>
    )
}