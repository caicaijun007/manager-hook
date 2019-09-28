import React, { Fragment } from 'react';
import { Pagination } from 'antd';
import './index.less';

export default function (props) {

    const { pagination, callback } = props;

    return (
        <Fragment>
            <Pagination
                className='page'
                current={pagination.page}
                pageSize={pagination.page_size}
                total={pagination.total_count}
                onChange={(current) => {
                    callback(current)
                }}
                showTotal={() => {
                    return `共${pagination.total_count}条`
                }}
                onShowSizeChange={(current, pageSize) => {
                    callback(current, pageSize)
                }}
                showSizeChanger={pagination.showSizeChanger ? pagination.showSizeChanger : false}
                showQuickJumper={pagination.showQuickJumper ? pagination.showQuickJumper : false}
            />
        </Fragment>
    )
}