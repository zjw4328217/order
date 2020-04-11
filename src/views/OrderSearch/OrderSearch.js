import React, { Component } from 'react'
import {
    Input, Descriptions, Tabs, Button,
    Table
} from 'antd';
import Axios from 'axios';
import {
    PlayCircleFilled,
    CheckCircleTwoTone,
    CloseSquareTwoTone
} from '@ant-design/icons'
import { connect } from 'react-redux';
const { Search } = Input;
const { TabPane } = Tabs;
class OrderSearch extends Component {
    state = {
        defaultActiveKey: '/ordersearch/state',
        dataList: []
    }

    onSearch = (value) => {
        console.log(value)
        this.props.actionCreator(value)

    }

    componentDidMount() {
        this.setState({
            defaultActiveKey: this.props.location.pathname
        })
        this.props.getDataList()

    }





    goPreview = (id) => {
        console.log(id)
        this.props.history.push(`/orderpreview/${id}`)

    }

    callback = (key) => {
        console.log(key)
        this.props.history.push(key)
    }

    render() {
        const columnsAready = [
            {
                title: '订单是否生产',
                dataIndex: 'isBuilded',
                key: 'isBuilded',
                render: (item) => item ? <CheckCircleTwoTone /> : <CloseSquareTwoTone />

            },
            {
                title: '订单号',
                dataIndex: 'orderID',
                key: 'orderID',
            },
            {
                title: '订单创建',
                dataIndex: 'orderCreate',
                key: 'orderCreate',
            },
            {
                title: '订单修改',
                dataIndex: 'orderDesign',
                key: 'orderDesign',
            },
            {
                title: '订单创建时间',
                dataIndex: 'date',
                key: 'date',
            },
            {
                title: '操作',
                dataIndex: '',
                key: 'a',
                render: (item) => <div>
                    <Button type="primary" shape="circle"
                        onClick={() => this.goPreview(item.id)}
                        icon={<PlayCircleFilled />} />
                </div>
            },
        ]

        return (
            <div>
                <Tabs defaultActiveKey={this.state.defaultActiveKey}
                    activeKey={this.props.location.pathname}
                    onChange={this.callback}>
                    <TabPane tab="订单状态" key="/ordersearch/state">
                        <Table columns={columnsAready} dataSource={this.props.dataList}
                            rowKey={item => item.id}
                        />

                    </TabPane>
                    <TabPane tab="订单号搜索" key="/ordersearch/search">
                        <Search placeholder="请输入订单号查询订单详情"
                            onSearch={this.onSearch}
                            enterButton />
                        <Descriptions layout="vertical" bordered
                            title="订单详情"
                            style={{ display: this.props.orderInfo.orderID ? 'block' : 'none' }}
                        >
                            <Descriptions.Item span={3} label="订单提供者">{this.props.orderInfo.orderCreate}</Descriptions.Item>
                            <Descriptions.Item span={3} label="订单名称">{this.props.orderInfo.ordername}</Descriptions.Item>
                            <Descriptions.Item span={3} label="订单单号">{this.props.orderInfo.orderID}</Descriptions.Item>
                            {
                                this.props.orderInfo.orderDescribe && <Descriptions.Item span={3} label="订单描述">{this.props.orderInfo.orderDescribe}</Descriptions.Item>
                            }
                            <Descriptions.Item span={3} label="订单所需材料">{this.props.orderInfo.orderInfo}</Descriptions.Item>
                            <Descriptions.Item span={3} label="订单价格表">{this.props.orderInfo.orderprice}</Descriptions.Item>
                            <Descriptions.Item span={3} label="订单价格合计">{this.props.orderInfo.orderpricesubtotal}</Descriptions.Item>
                            <Descriptions.Item span={3} label="订单一阶段设计师">{this.props.orderInfo.orderDesign}</Descriptions.Item>
                            <Descriptions.Item span={3} label="是否投入生产">{this.props.orderInfo.isBuilded ? '生产中' : '订单流失'}</Descriptions.Item>
                        </Descriptions>
                    </TabPane>
                </Tabs>



            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orderInfo: state.orderInfo,
        dataList:state.stateList
    }
}

const mapDispatchToprops = {
    actionCreator: (value) => {
        return Axios.get(`http://59.110.173.149:8000/orders?orderID=${value}`).then(res => {
            console.log(res.data)
            return {
                type: 'MOrderInfo',
                payload: res.data[0]
            }
        })
    },
    getDataList: () => {
        return Axios.get('http://59.110.173.149:8000/orders').then(res => {
            return {
                type:'MStateList',
                payload: res.data
            }
        })
    }
}



export default connect(mapStateToProps, mapDispatchToprops)(OrderSearch)