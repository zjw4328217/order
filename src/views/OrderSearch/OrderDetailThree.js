import React, { Component } from 'react'
import Axios from 'axios'
import { Descriptions, Button, message, PageHeader, Select, Spin } from 'antd';
const { Option } = Select;
export default class OrderDetail extends Component {
    state = {
        orderInfo: {},
        options: null,
        value: '',
        isBuild: false
    }

    componentDidMount() {
        const roleType = JSON.parse(sessionStorage.getItem('users')).roleType
        Axios.get(`http://59.110.173.149:8000/orders/${this.props.match.params.id}`).then(res => {
            console.log(res.data)
            if(res.data.orderDesignThree!=='' &&res.data.orderDesignFour !== ''){
                this.setState({
                    isBuild:true
                })
            }
            this.setState({
                orderInfo: res.data
            })
        })
        if (roleType === 5) {
            Axios.get(`http://59.110.173.149:8000/orders/${this.props.match.params.id}`).then(res => {
                console.log(res.data.orderDesignFour)
                if (res.data.orderDesignFour !== '') {
                    Axios.get('http://59.110.173.149:8000/users?roleType=5').then(res => {
                        console.log(res.data)
                        this.setState({
                            options: res.data
                        })
                    })
                } else {
                    Axios.get('http://59.110.173.149:8000/users?roleType=4').then(res => {
                        console.log(res.data)
                        this.setState({
                            options: res.data
                        })
                        Axios.get('http://59.110.173.149:8000/users?roleType=4').then(res => {
                            console.log(res.data)
                            this.setState({
                                options: res.data
                            })
                            Axios.get('http://59.110.173.149:8000/users?roleType=5').then(res => {
                                const arr = []
                                this.state.options.map(item => {
                                    return arr.push(item)
                                })
                                res.data.map(item => {
                                    return arr.push(item)
                                })
                                this.setState({
                                    options: arr
                                })
                            })
                        })
                    })

                }
            })

        }


        if (roleType === 4) {
            Axios.get('http://59.110.173.149:8000/users?roleType=5').then(res => {
                console.log(res.data)
                this.setState({
                    options: res.data
                })
            })
        }
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
        const roleType = JSON.parse(sessionStorage.getItem('users')).roleType
        if (roleType === 5) {
            
            Axios.put(`http://59.110.173.149:8000/orders/${this.props.match.params.id}`, {
                ...this.state.orderInfo,
                orderDesignThree: this.state.value
            }).then(res => {
                console.log(res.data)
                message.success('提交完成，即将通知下一流程人员执行操作！')
                this.props.history.push('/')
            })
        }
        if (roleType === 4) {
            Axios.put(`http://59.110.173.149:8000/orders/${this.props.match.params.id}`, {
                ...this.state.orderInfo,
                orderDesignFour: this.state.value
            }).then(res => {
                console.log(res.data)
                message.success('提交完成，即将通知下一流程人员执行操作！')
                this.props.history.push('/')
            })
        }
    }


    build=() => {
        if(this.state.isBuild){
            Axios.put(`http://59.110.173.149:8000/orders/${this.props.match.params.id}`, {
              ...this.state.orderInfo,
              isFinished:true  
            }).then(res => {
                message.success('提交完成，即将投入生产')
                this.props.history.push('/')
            })
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.isBuild ?
                        <div>
                            <PageHeader
                                className="site-page-header"
                                onBack={() => this.props.history.goBack()}
                                title="订单详细信息"
                            />
                            <Button type="primary" onClick={this.build}>开始生产</Button>
                        </div> :
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
                                    {
                                        this.state.options ?
                                            <Select
                                                showSearch
                                                style={{ width: 200 }}
                                                placeholder="请选择下一流程人员"
                                                optionFilterProp="children"
                                                onChange={this.onChange}
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                {
                                                    this.state.options.map((item, i) => {
                                                        return <Option key={i} value={item.name}>{item.name}--{item.right}</Option>
                                                    })
                                                }

                                            </Select> :
                                            <Spin size="large" />
                                    }

                                </Descriptions.Item>

                            </Descriptions>
                            <Button type="primary" onClick={this.submit}>提交</Button>
                        </div>
                }

            </div>
        )
    }
}
