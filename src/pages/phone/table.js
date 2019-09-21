import React, { useState, useEffect, Fragment } from 'react';
import { Card, BackTop } from 'antd';
import Table from '../../components/Table';
import Pagination from '../../components/Pagination';
import Search from '../../components/Search';
import Axios from '../../utils/axios';
import moment from 'moment';
import './phone.less';

function PhoneTable() {

    let [search] = useState(localStorage.getItem("_search") ? JSON.parse(localStorage.getItem("_search")) : []);
    let [page, setPage] = useState(1);
    let [page_size, setPageSize] = useState(10);
    let [total_count, setTotalCount] = useState(0);
    let [showSizeChanger] = useState(true);
    let [showQuickJumper] = useState(true);
    let [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        if (dataSource.length === 0) {
            request();
        }
    });

    let request = (page_d, pageSize_d, searchs = search) => {
        Axios.ajax({
            url: '/phone_list',
            data: {
                params: {
                    page: page_d ? page_d : page,
                    total: pageSize_d ? pageSize_d : page_size,
                    ...searchs
                }
            }
        }).then((res) => {
            if (res.code === 0) {
                res.result.map((item, index) => {
                    return item.key = index;
                })
                localStorage.setItem("_search", JSON.stringify(searchs));
                total_count = res.total_count;
                setDataSource(res.result);
                setPage(res.page);
                setPageSize(res.page_size);
                setTotalCount(total_count);
            }
        })
    }

    let searchDataSubmit = (searchs) => {
        if (searchs.product_time) {
            searchs.product_time = moment(searchs.product_time).format('YYYY-MM-DD');
        }
        request(1, page_size, searchs);
    }

    // 改变分页显示条数
    let changePage = (page_d, pageSize_d = false) => {
        request(page_d, pageSize_d);
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: '手机型号',
            dataIndex: 'product_name'
        },
        {
            title: '款式',
            dataIndex: 'product_color',
            render(color) {
                let config = {
                    '1': '梦幻蓝',
                    '2': '魅惑红',
                    '3': '优雅黑',
                    '4': '土豪金',
                    '5': '华丽白'
                };
                return config[color];
            }
        },
        {
            title: '价格',
            dataIndex: 'product_price',
            sorter: (a, b) => a.product_price - b.product_price,
            render(price) {
                return `$${price}`
            }
        },
        {
            title: '库存',
            dataIndex: 'product_store',
            render(store) {
                return store === '1' ? '有' : '无';
            }
        },
        {
            title: '发布日期',
            dataIndex: 'product_time'
        }
    ];

    const pagination = { page, page_size, total_count, showSizeChanger, showQuickJumper };

    const searchConfig = [
        {
            searchType: 'select',
            label: '手机型号',
            dateKey: 'product_name',
            initValue: search.product_name ? search.product_name : '0',
            optionList: [
                { 'key': '0', 'value': '全部' },
                { 'key': '1', 'value': '华为' },
                { 'key': '2', 'value': '小米' },
                { 'key': '3', 'value': 'OPPO' },
                { 'key': '4', 'value': '三星' },
                { 'key': '5', 'value': 'apple' }
            ]
        },
        {
            searchType: 'select',
            label: '款式',
            dateKey: 'product_color',
            initValue: search.product_color ? search.product_color : '0',
            optionList: [
                { 'key': '0', 'value': '全部' },
                { 'key': '1', 'value': '梦幻蓝' },
                { 'key': '2', 'value': '魅惑红' },
                { 'key': '3', 'value': '优雅黑' },
                { 'key': '4', 'value': '土豪金' },
                { 'key': '5', 'value': '华丽白' }
            ]
        },
        {
            searchType: 'input_number',
            label: '价格',
            dateKey: 'product_price',
            initValue: search.product_price
        },
        {
            searchType: 'radio_group',
            label: '库存',
            dateKey: 'product_store',
            initValue: search.product_store ? search.product_store : '',
            radioList: [
                { 'key': '', 'value': '全部' },
                { 'key': '1', 'value': '有' },
                { 'key': '0', 'value': '无' }
            ]
        },
        {
            searchType: 'date_picker',
            label: '发布日期',
            dateKey: 'product_time',
            initValue: search.product_time,
            showTime: false
        }
    ];

    return (
        <Fragment>
            <BackTop />
            <Card className='card-wrapper'>
                <Search searchConfig={searchConfig} searchDataSubmit={searchDataSubmit} />
            </Card>
            <Card className='card-diffrent'>
                <Table
                    tableType='default'
                    columns={columns}
                    dataSource={dataSource}
                />
                <Pagination callback={changePage} pagination={pagination} />
            </Card>
        </Fragment>
    )
}

export default PhoneTable;