import React, { Component } from 'react'
import Axios from 'axios'
import { Descriptions, Form, Input, Button, message, PageHeader, Select } from 'antd';
const { Option } = Select;
export default class OrderDetail extends Component {
    state = {
        orderInfo: {},
        options:[]
    }

    componentDidMount() {
        Axios.get(`http://59.110.173.149:8000/orders/${this.props.match.params.id}`).then(res => {
            this.setState({
                orderInfo: res.data
            })
        })
        Axios.get(`http://59.110.173.149:8000/users?roleType=1`).then(res => {
            this.setState({
                options:res.data
            })    

           
        })
        Axios.get(`http://59.110.173.149:8000/users?roleType=2`).then(res => {
            var newList=this.state.options
            res.data.map(item => {
                return newList.push(item)
            })
            var user=JSON.parse(sessionStorage.getItem('users'))
            newList.push(user)
            this.setState({
                options:newList
            })    
        })
    }

    submit = () => {
        this.refs.designForm.validateFields().then(values => {
            console.log(this.state.orderInfo,values)
            Axios.put(`http://59.110.173.149:8000/orders/${this.state.orderInfo.id}`, {
                ...this.state.orderInfo,
                ...values,
                isChangeDesign: true
            }).then(res => {
                message.success('订单已经修改成功!')
                this.props.history.push('/')
            })
        })
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
                    <Descriptions.Item span={3} label="订单描述">{this.state.orderInfo.orderDescribe}</Descriptions.Item>
                    <Descriptions.Item span={3} label="订单所需材料">{this.state.orderInfo.orderInfo}</Descriptions.Item>
                </Descriptions>
                <hr />
                {/* 一阶段修改表单 */}
                <Form
                    ref='designForm'
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 21 }}
                    layout='vertical'
                    style={{ paddingTop: 20 }}
                >
                    <Form.Item label="订单所需金额" required name='orderprice'
                        rules={[{ required: true, message: '请输入订单所需金额!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="订单金额详情" name='orderpricesubtotal'
                        rules={[{ required: true, message: '请输入订单所需金额金额详情!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="订单介绍" name='orderDescribeTwo'>
                        <Input />
                    </Form.Item>
                    <Form.Item 
                     name='orderDesignT'
                    rules={[{ required: true, message: '请选择下一项执行人!' }]}>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="请选择下一项执行人!"
                            optionFilterProp="children"
                            onChange={this.onChange}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {
                                this.state.options.map(item => {
                                    return <Option key={item.id} value={item.name}>{item.name}--{item.right}</Option>
                                })
                            }

                        </Select>
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" onClick={this.submit} className="login-form-button">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
