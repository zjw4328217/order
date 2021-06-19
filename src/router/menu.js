import {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
    RadarChartOutlined,
    BarChartOutlined,
    SearchOutlined,
} from '@ant-design/icons';

const menu = [
    {
        title: '首页',
        path: '/home',
        icon: MailOutlined,
        permission: 1
    },
    {
        title: '订单创建',
        path: '/ordercreate',
        icon: AppstoreOutlined,
        permission: 1,
        children: [{
            title: '创建订单',
            path: '/ordercreate/create',
            icon:RadarChartOutlined ,
            permission: 1,
        }]
    },
    {
        title: '订单查询',
        path: '/ordersearch',
        icon: SettingOutlined,
        permission: 1,
        children: [
            {
                title: '订单状态',
                path: '/ordersearch/state',
                permission: 1,
                icon:BarChartOutlined 
            },
            {
                title: '订单搜索查询',
                path: '/ordersearch/search',
                permission: 1,
                icon:SearchOutlined
            }
        ]
    },
    {
        title: '设置',
        path: '/orderset',
        icon: SettingOutlined,
        permission: 5,
        children: [
            {
                title: '添加成员',
                path: '/orderset/add',
                icon: SettingOutlined,
                permission: 5,
            },
            {
                title: '成员权限管理',
                path: '/orderset/rights',
                icon: SettingOutlined,
                permission: 5,
            },
            {
                title: '成员列表',
                path: '/orderset/userlist',
                icon: SettingOutlined,
                permission: 5,
            },
        ]
    }
]


export default menu