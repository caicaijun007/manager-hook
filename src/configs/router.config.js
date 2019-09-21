export default [
    {
        path: '/home',
        name: '首页',
        icon: 'home',
    },
    {
        path: '/main',
        name: '权限设置',
        icon: 'setting',
        routes: [
            {
                path: '/main/role',
                name: '角色列表',
                icon: 'user-add',
            },
            {
                path: '/main/user',
                name: '用户列表',
                icon: 'user',
            }
        ]
    },
    {
        path: '/ui',
        name: 'UI',
        icon: 'ant-design',
        routes: [
            {
                path: '/ui/btn',
                name: '按钮',
                icon: 'poweroff',
            },
            {
                path: '/ui/modals',
                name: '弹框',
                icon: 'border',
            },
            {
                path: '/ui/loadings',
                name: 'Loading',
                icon: 'loading',
            },
            {
                path: '/ui/notification',
                name: '通知提醒',
                icon: 'notification',
            },
            {
                path: '/ui/messages',
                name: '全局Message',
                icon: 'alert',
            }
        ]
    },
    {
        path: '/form',
        name: '表单',
        icon: 'unordered-list',
        routes: [
            {
                path: '/form/login',
                name: '登录',
                icon: 'login',
            },
            {
                path: '/form/register',
                name: '注册',
                icon: 'solution',
            }
        ]
    },
    {
        path: '/table',
        name: '表格',
        icon: 'table',
        routes: [
            {
                path: '/table/basic',
                name: '基础表格',
                icon: 'menu',
            },
            {
                path: '/table/hight',
                name: '高级表格',
                icon: 'bars',
            }
        ]
    },
    {
        path: '/charts',
        name: '图表',
        icon: 'area-chart',
        routes: [
            {
                path: '/charts/bar',
                name: '柱形图',
                icon: 'bar-chart',
            },
            {
                path: '/charts/pie',
                name: '饼图',
                icon: 'pie-chart',
            },
            {
                path: '/charts/line',
                name: '折线图',
                icon: 'line-chart',
            }
        ]
    },
    {
        path: '/phone',
        name: '手机数据',
        icon: 'project',
        routes: [
            {
                path: '/phone/table',
                name: '表格数据',
                icon: 'table',
            },
            {
                path: '/phone/charts',
                name: '图表数据',
                icon: 'area-chart',
            }]
    },
    {
        path: '/hook',
        name: '新特新Hook',
        icon: 'project',
        routes: [
            {
                path: '/hook/click',
                name: 'Click',
                icon: 'poweroff',
            },
            {
                path: '/hook/todo',
                name: 'TodoList',
                icon: 'table',
            }]
    }
];
