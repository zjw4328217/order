import React, { Component } from 'react'
import Axios from 'axios'
import { Descriptions, Button, message, PageHeader, Select } from 'antd';
const { Option } = Select;
export default class OrderDetail extends Component {
    state = {
        orderInfo: {},
        options: ['再次提交设计师修改', '订单流失', '已收到定金投入生产'],
        value: '',
    }

    componentDidMount() {
        Axios.get(`http://59.110.173.149:8000/orders/${this.props.match.params.id}`).then(res => {
            this.setState({
                orderInfo: res.data
            })
        })

    }

    onChange = (value) => {
        console.log(value)
        this.setState({
            value
        })
    }

    submit = () => {
        if (!this.state.value) {
            message.error('请选择是否继续流程之后再提交！')
            return null
        }
        if (this.state.value === '再次提交设计师修改') {
            Axios.put(`http://59.110.173.149:8000/orders/${this.state.orderInfo.id}`, {
                ...this.state.orderInfo,
                isChangeDesign: false
            }).then(res => {
                console.log(res.data)
                this.props.history.push('/')
            })
        } else {
            const isBuilded = this.state.value === '已收到定金投入生产' ? true : false
            Axios.put(`http://59.110.173.149:8000/orders/${this.state.orderInfo.id}`,{
                ...this.state.orderInfo,
                isBuilded,
                isChangeCreator:true
            }).then(res => {
                console.log(res.data)
                this.props.history.push('/')
            })
        }

    }

    render() {
        return (
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
                    <Descriptions.Item span={3} label="请选择是否继续">
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="请选择设计师"
                            optionFilterProp="children"
                            onChange={this.onChange}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {
                                this.state.options.map((item, i) => {
                                    return <Option key={i} value={item}>{item}</Option>
                                })
                            }

                        </Select>
                    </Descriptions.Item>
                </Descriptions>
                <Button type="primary" onClick={this.submit}>提交</Button>
            </div>
        )
    }
}
