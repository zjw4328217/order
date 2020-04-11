import React, { Component } from 'react'
import moment from 'moment'
import {
    Steps, Button, message, Select, Form,
    Input,
    Checkbox,
    Row,
    Col,
    Descriptions
} from 'antd';
import Axios from 'axios';
const { Step } = Steps;
const { Option } = Select;
export default class CreateOrder extends Component {
    state = {
        options: [],
        current: 0,
        orderList: {},
        chooseOption: ''
    }

    componentDidMount() {
        console.log(moment().format('YYYYMMDDHHmmss'))
        Axios.get('http://59.110.173.149:8000/users?right=设计师').then(res => {
            this.setState({
                options: res.data
            })
        })
    }


    onInfoChange = (values) => {
        console.log('checked = ', values);
    }




    next() {
        const roleType = JSON.parse(sessionStorage.getItem('users')).roleType
        console.log(roleType, this.state.current)
        if (this.state.current === 0) {
            if (roleType > 2) {
                message.error('只有店员或者店长才能创建订单');
                return null;
            } else {
                console.log("zzz")
                this.refs.orderCreator.validateFields().then(values => {
                    console.log('666')
                    this.setState({
                        orderList: values,
                        current: this.state.current + 1
                    })
                })
            }

        } else if (this.state.current === 1) {
            if (!this.state.chooseOption) {
                message.error('请选择设计师！');
                return null
            }
            this.setState({
                current: this.state.current + 1
            });
        }

       
    }

   
    
    



    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }


    onChange = (value) => {
        this.setState({
            chooseOption: value
        })
    }
    filter(inputValue, path) {
        return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
    }

    finished = () => {
        let name = JSON.parse(sessionStorage.getItem('users')).name
        console.log('dasdsa')
        Axios.post('http://59.110.173.149:8000/orders', {
            ...this.state.orderList,
            orderDesign: this.state.chooseOption,
            date: moment().format('YYYY-MM-DD HH:mm:ss'),
            orderCreate: name,
            isChangeCreator: false,
            isChangeDesign:false,
            orderID: moment().format('YYYYMMDDHHmmss') + 1,
            orderDescribeTwo:'',
            orderprice:'',
            orderpricesubtotal:'',
            orderDesignT:'',
            isBuilded:'',
            orderDesignThree:'',
            orderDesignFour:'',
        }).then(res => {
            console.log(res.data)
            message.success('订单已经创建成功!')
            this.props.history.push('/')
        })
    }

    render() {
        const steps = [
            {
                title: '订单详细信息',
            },
            {
                title: '选择设计师',
            },
            {
                title: '确认订单信息',
            },
        ]

        return (
            <div>
                <Steps current={this.state.current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="steps-content">
                    {/* 第一步 订单详情 */}
                    <div style={{ display: this.state.current === 0 ? 'block' : 'none' }}>
                        <Form
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 14 }}
                            layout="horizontal"
                            ref='orderCreator'
                            style={{ paddingTop: 20 }}
                        >
                            <Form.Item label="订单名称" required name='ordername'
                                rules={[{ required: true, message: '请输入订单名称!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label="订单介绍" name='orderDescribe'>
                                <Input />
                            </Form.Item>
                            <Form.Item label="订单所需材料清单" required name='orderInfo'
                                rules={[{ required: true, message: '请输入订单所需材料!' }]}
                            >
                                <Checkbox.Group style={{ width: '100%' }} onChange={this.onInfoChange}>
                                    <Row>
                                        <Col span={8}>
                                            <Checkbox value="A">A</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="B">B</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="C">C</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="D">D</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="E">E</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="F">F</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="G">G</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="H">H</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="DJ">DJ</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="J">Ed</Checkbox>
                                        </Col>
                                    </Row>
                                </Checkbox.Group>
                            </Form.Item>
                        </Form>
                    </div>
                    {/* 第二部 选择设计师 */}
                    <div style={{ paddingTop: 20, display: this.state.current === 1 ? 'block' : 'none' }}>
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
                                this.state.options.map(item => {
                                    return <Option key={item.id} value={item.name}>{item.name}</Option>
                                })
                            }

                        </Select>
                    </div>
                    {/* 确认填写的信息 */}
                    <Descriptions title="确认订单信息"
                        style={{ display: this.state.current === 2 ? 'block' : 'none' }}
                        layout="vertical" bordered
                    >
                        <Descriptions.Item span={3} label="订单名称">{this.state.orderList.ordername}</Descriptions.Item>
                        <Descriptions.Item span={3} label="订单描述">{this.state.orderList.orderDescribe}</Descriptions.Item>
                        <Descriptions.Item span={3} label="订单所需材料">{this.state.orderList.orderInfo}</Descriptions.Item>
                        <Descriptions.Item span={3} label="订单设计师">{this.state.chooseOption}</Descriptions.Item>

                    </Descriptions>
                </div>
                <div className="steps-action">
                    {this.state.current < steps.length - 1 && (
                        <Button type="primary" onClick={() => this.next()}>
                            下一步
                        </Button>
                    )}
                    {this.state.current === steps.length - 1 && (
                        <Button type="primary" onClick={()=>this.finished()}>
                            确认无误
                        </Button>
                    )}
                    {this.state.current > 0 && (
                        <Button style={{ margin: 8 }} onClick={() => this.prev()}>
                            上一步
                        </Button>
                    )}
                </div>


            </div>
        )
    }
}
