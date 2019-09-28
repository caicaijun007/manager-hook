import React, { useEffect, Fragment } from 'react';
import { Card, BackTop } from 'antd';
import ReactEcharts from 'echarts-for-react';
import echartTheme from '../../../configs/theme.config';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import '../echart.less';

export default function () {

    useEffect(() => echarts.registerTheme('manager', echartTheme), []);

    let getOption = () => {
        let option = {
            title: {
                text: '用户订单量'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: [
                    '周一',
                    '周二',
                    '周三',
                    '周四',
                    '周五',
                    '周六',
                    '周日'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '订单量',
                    type: 'bar',
                    data: [
                        2000,
                        1000,
                        1500,
                        3000,
                        2000,
                        1200,
                        800
                    ]
                }
            ]
        }

        return option;
    }

    let getOption2 = () => {
        let option = {
            title: {
                text: '用户订单量'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['jack', 'marry', 'tom']
            },
            xAxis: {
                data: [
                    '周一',
                    '周二',
                    '周三',
                    '周四',
                    '周五',
                    '周六',
                    '周日'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Jack',
                    type: 'bar',
                    data: [
                        2000,
                        1000,
                        1500,
                        3000,
                        2000,
                        1200,
                        800
                    ]
                },
                {
                    name: 'Marry',
                    type: 'bar',
                    data: [
                        1000,
                        2000,
                        1200,
                        2000,
                        3000,
                        1500,
                        900
                    ]
                },
                {
                    name: 'Tom',
                    type: 'bar',
                    data: [
                        1500,
                        2500,
                        3000,
                        1000,
                        2000,
                        1200,
                        600
                    ]
                }
            ]
        }

        return option;
    }

    return (
        <Fragment>
            <BackTop />
            <Card title='柱形图表之一' className='card-wrapper'>
                <ReactEcharts option={getOption()} theme='manager' style={{ height: 500 }} />
            </Card>
            <Card title='柱形图表之二' className='card-wrapper'>
                <ReactEcharts option={getOption2()} theme='manager' style={{ height: 500 }} />
            </Card>
        </Fragment>
    )
}