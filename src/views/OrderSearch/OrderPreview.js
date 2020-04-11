import React, { Component } from 'react'
import { Spin } from 'antd'
import Axios from 'axios';
import { Descriptions, PageHeader, Select } from 'antd';
export default class OrderPreview extends Component {
    state = {
        orderInfo: null
    }
    componentDidMount() {
        console.log(this.props.match)
        Axios.get(`http://59.110.173.149:8000/orders/${this.props.match.params.id}`).then(res => {
            console.log(res.data)
            this.setState({
                orderInfo: res.data
            })
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.orderInfo ?
                        <div>
                            <PageHeader
                                className="site-page-header"
                                onBack={() => this.props.history.goBack()}
                                title="订单详细信息"
                            />
                            <Descriptions layout="vertical" bordered >
                                <Descriptions.Item span={3} label="订单提供者">{this.state.orderInfo.orderCreate}</Descriptions.Item>
                                <Descriptions.Item span={3} label="订单名称">{this.state.orderInfo.ordername}</Descriptions.Item>
                                <Descriptions.Item span={3} label="订单单号">{this.state.orderInfo.orderID}</Descriptions.Item>
                                {
                                    this.state.orderInfo.orderDescribe && <Descriptions.Item span={3} label="订单描述">{this.state.orderInfo.orderDescribe}</Descriptions.Item>
                                }
                                <Descriptions.Item span={3} label="订单所需材料">{this.state.orderInfo.orderInfo}</Descriptions.Item>
                                <Descriptions.Item span={3} label="订单价格表">{this.state.orderInfo.orderprice}</Descriptions.Item>
                                <Descriptions.Item span={3} label="订单价格合计">{this.state.orderInfo.orderpricesubtotal}</Descriptions.Item>
                                <Descriptions.Item span={3} label="订单一阶段设计师">{this.state.orderInfo.orderDesign}</Descriptions.Item>
                                <Descriptions.Item span={3} label="订单是否生产">{this.state.orderInfo.isBuilded?'正在生产中':'已弃单或者在第一二阶段'}</Descriptions.Item>
                            </Descriptions>
                        </div> :
                        <Spin size="large" />
                }
            </div>
        )
    }
}
