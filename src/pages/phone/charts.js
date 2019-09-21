import React, { useState, useEffect, Fragment } from 'react';
import { Card } from 'antd';
import Search from '../../components/Search';
import Axios from '../../utils/axios';
import ReactEcharts from 'echarts-for-react';
import echartTheme from '../../configs/theme.config';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import './phone.less';

function PhoneCharts() {

    let colorList = {
        '1': '梦幻蓝',
        '2': '魅惑红',
        '3': '优雅黑',
        '4': '土豪金',
        '5': '华丽白'
    };

    let colorArr = [
        '梦幻蓝',
        '魅惑红',
        '优雅黑',
        '土豪金',
        '华丽白'];

    let [search, setSearch] = useState(localStorage.getItem("_search") ? JSON.parse(localStorage.getItem("_search")) : []);
    let [page, setPage] = useState(1);
    let [page_size, setPageSize] = useState(10);
    let [total_count, setTotalCount] = useState(0);
    let [dataSource, setDataSource] = useState([]);
    let [optionData, setOptionData] = useState(colorArr);

    useEffect(() => {
        if (dataSource.length === 0) {
            request();
        }
    });
    useEffect(() => echarts.registerTheme('manager', echartTheme), []);

    useEffect(() => {
        if (search.product_color && search.product_color !== '0') {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            colorArr = [colorList[search.product_color]];
            setOptionData(colorArr);
        } else {
            setOptionData(colorArr);
        }
    }, [search.product_color]);

    let request = (page_d, pageSize_d, searchs = search) => {
        Axios.ajax({
            url: '/phone_list',
            data: {
                params: {
                    charts: true,
                    page: page_d ? page_d : page,
                    total: pageSize_d ? pageSize_d : page_size,
                    ...searchs
                }
            }
        }).then((res) => {
            if (res.code === 0) {
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
        setSearch(searchs);
        request(1, page_size, searchs);
    }

    let getOption = () => {
        // let optionData = (!search.product_color || search.product_color === '0') ? [
        //     '梦幻蓝',
        //     '魅惑红',
        //     '优雅黑',
        //     '土豪金',
        //     '华丽白'
        // ] : [colorList[search.product_color]];
        let option = {
            title: {
                text: '手机价格型号趋势对比'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['华为', '小米', 'OPPO', '三星', 'apple']
            },
            xAxis: {
                data: optionData
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '华为',
                    type: 'bar',
                    data: dataSource['华为']
                },
                {
                    name: '小米',
                    type: 'bar',
                    data: dataSource['小米']
                },
                {
                    name: 'OPPO',
                    type: 'bar',
                    data: dataSource['OPPO']
                },
                {
                    name: '三星',
                    type: 'bar',
                    data: dataSource['三星']
                }
                ,
                {
                    name: 'apple',
                    type: 'bar',
                    data: dataSource['apple']
                }
            ]
        }

        return option;
    }

    let getOption2 = () => {
        // let optionData = !search.product_color || search.product_color === '0' ? [
        //     '梦幻蓝',
        //     '魅惑红',
        //     '优雅黑',
        //     '土豪金',
        //     '华丽白'
        // ] : [colorList[search.product_color]];
        let option = {
            title: {
                text: '手机价格型号趋势对比'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['华为', '小米', 'OPPO', '三星', 'apple']
            },
            xAxis: {
                data: optionData
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '华为',
                    type: 'line',
                    data: dataSource['华为']
                },
                {
                    name: '小米',
                    type: 'line',
                    data: dataSource['小米']
                },
                {
                    name: 'OPPO',
                    type: 'line',
                    data: dataSource['OPPO']
                },
                {
                    name: '三星',
                    type: 'line',
                    data: dataSource['三星']
                }
                ,
                {
                    name: 'apple',
                    type: 'line',
                    data: dataSource['apple']
                }
            ]
        }

        return option;
    }

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
        }
    ];

    return (
        <Fragment>
            <Card className='card-wrapper'>
                <Search searchConfig={searchConfig} searchDataSubmit={searchDataSubmit} />
            </Card>
            <Card className='card-diffrent'>
                <ReactEcharts option={getOption()} theme='manager' />
            </Card>
            <Card className='card-diffrent'>
                <ReactEcharts option={getOption2()} theme='manager' />
            </Card>
        </Fragment>
    )
}

export default PhoneCharts;