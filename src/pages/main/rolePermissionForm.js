import React, { forwardRef, useImperativeHandle } from 'react';
import { Form, Input, Select, Tree } from 'antd';
import menuConfig from '../../configs/router.config';
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;

export default Form.create({})(forwardRef(function (props, ref) {

    const { getFieldDecorator } = props.form;
    const { roleDetail, menuInfo, checkMenuInfo } = props;
    const formItemLayout = {
        labelCol: {
            span: 6
        },
        wrapperCol: {
            span: 18
        }
    }

    let getMenuList = (data) => {
        return data.map((item) => {
            if (item.routes) {
                return (
                    <TreeNode title={item.name} key={item.path}>
                        {getMenuList(item.routes)}
                    </TreeNode>
                );
            }
            return <TreeNode title={item.name} key={item.path} />;
        });
    }

    // 设置选中的节点，通过父组件方法再传递回来
    let onCheck = (checkedKeys) => {
        checkMenuInfo(checkedKeys);
    };

    useImperativeHandle(ref, () => {
        //暴露子组件的属性与方法
        return props.form;
    });

    return (
        <Form>
            <FormItem label='角色名' {...formItemLayout}>
                <Input disabled placeholder={roleDetail.role_name} />
            </FormItem>
            <FormItem label='使用状态' {...formItemLayout}>
                {
                    getFieldDecorator('status', {
                        initialValue: roleDetail.status
                    })(
                        <Select>
                            <Option value='1'>开启</Option>
                            <Option value='0'>关闭</Option>
                        </Select>
                    )
                }
            </FormItem>
            <FormItem label='选择权限' {...formItemLayout}>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={(checkedKeys) => onCheck(checkedKeys)}
                    checkedKeys={menuInfo || []}>
                    <TreeNode title="平台权限" key="plat">
                        {getMenuList(menuConfig)}
                    </TreeNode>
                </Tree>
            </FormItem>
        </Form>
    )
}))