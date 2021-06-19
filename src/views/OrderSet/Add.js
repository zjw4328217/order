import React, { Component } from 'react'
import { Table, Tag, Button, Modal, Form, Input, Select, Switch, message } from 'antd';
import {
    FormOutlined,
} from '@ant-design/icons';
import axios from 'axios';
const { Option } = Select;
export default class Add extends Component {
    state = {
        visible: false,
        changevisible: false,
        roleType: 1,
        userList: [],
        formdata: [],
    }
    changeOne = (id) => {
        axios.get(`http://localhost:8000/users/${id}`).then(res => {
            console.log(res.data)
            this.setState({
                changevisible: true,
                formdata: res.data
            })
        })

    }

    onChangeOk = () => {
        this.refs.changeGroup.validateFields().then(values => {
            axios.put(`http://localhost:8000/users/${this.state.formdata.id}`, {
                ...this.state.formdata,
                ...values,
                // roleState: this.state.roleStae,
                roleType: this.state.roleType
            }).then(res => {
                console.log(res.data)
                var newList=this.state.userList.map(item => {
                    if(item.id===this.state.formdata.id){
                        return res.data
                    }else{
                        return item
                    }
                })
                this.setState({
                    userList: newList,
                    changevisible: false,
                    formdata:res.data
                })
                this.refs.changeGroup.resetFields()
            })

        })
    }


    onChangeCancel = () => {
        this.setState({
            changevisible: false
        })
        this.refs.changeGroup.resetFields()
    }

    addOne = () => {
        this.setState({
            visible: true
        })
    }

    onCancel = () => {
        this.setState({
            visible: false
        })
        this.refs.addGroup.resetFields()
    }

    onOk = () => {
        this.refs.addGroup.validateFields().then(values => {
            axios.post('http://localhost:8000/users', {
                ...values,
                roleState: false,
                roleType: this.state.roleType
            }).then(res => {
                message.success('您已成功添加！')
                this.setState({
                    userList: [...this.state.userList, res.data],
                    visible: false
                })
                this.refs.addGroup.resetFields()
            })

        })

    }

    onChange = (value) => {
        var arr = ['店员', '店长','设计师', '拆单', '厂长']
        this.setState({
            roleType: arr.indexOf(value) + 1
        })
    }

    onSwitchChange = (checked, item) => {
        axios.put(`http://localhost:8000/users/${item.id}`, {
            ...item,
            roleState: checked
        }).then(res => {
            this.setState({
                roleState: checked
            })
        })
    }



    componentDidMount() {
        axios.get('http://localhost:8000/users').then(res => {
            this.setState({
                userList: res.data
            })
        })
    }



    render() {

        const columns = [
            {
                title: '权限',
                dataIndex: 'right',
                key: 'right',
            },
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '是否可用',
                dataIndex: 'roleState',
                key: 'roleState',
                render: (data, item) => {
                    return <div>
                        <Switch disabled={item.default} defaultChecked={data} onChange={(checked) => this.onSwitchChange(checked, item)} />
                    </div>
                }
            },
            {
                title: '管理',
                dataIndex: '',
                key: 'x',
                render: (item) => <div>

                    <Button type="primary" shape="circle"
                        onClick={() => this.changeOne(item.id)}
                        disabled={item.default}
                        icon={<FormOutlined />} />
                </div>
            }
        ]
        const layout =
        {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        }


        return (
            <div>
                <Button type="primary" onClick={this.addOne}>添加成员</Button>
                {/* 添加成员 */}
                <Modal
                    visible={this.state.visible}
                    title="添加成员"
                    okText="确认"
                    cancelText="取消"
                    onCancel={this.onCancel}
                    onOk={this.onOk}
                >
                    <Form
                        layout="vertical"
                        name="form_in_modal"
                        ref='addGroup'
                        layout={layout}
                    >
                        <Form.Item
                            name="name"
                            label="姓名"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户姓名!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="username"
                            label="用户名"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="密码"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name='right'
                            label='权限'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入权限!',
                                },
                            ]}
                        >
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="选择该人物的权限"
                                optionFilterProp="children"
                                onChange={this.onChange}
                            >
                                <Option value="店员">店员</Option>
                                <Option value="店长">店长</Option>
                                <Option value="设计师">设计师</Option>
                                <Option value="拆单">拆单</Option>
                                <Option value="厂长">厂长</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="description" label="Description">
                            <Input type="textarea" />
                        </Form.Item>
                    </Form>
                </Modal>

                {/* 修改成员 */}
                <Modal
                    visible={this.state.changevisible}
                    title="更新成员信息"
                    okText="确认"
                    cancelText="取消"
                    onCancel={this.onChangeCancel}
                    onOk={this.onChangeOk}
                >
                    <Form
                        layout="vertical"
                        name="form_in_modal"
                        ref='changeGroup'
                        initialValues={this.state.formdata}
                        layout={layout}
                    >
                        <Form.Item
                            name="name"
                            label="姓名"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户姓名!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="username"
                            label="用户名"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="密码"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name='right'
                            label='权限'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入权限!',
                                },
                            ]}
                        >
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="选择该人物的权限"
                                optionFilterProp="children"
                                onChange={this.onChange}
                            >
                                <Option value="店员">店员</Option>
                                <Option value="店长">店长</Option>
                                <Option value="设计师">设计师</Option>
                                <Option value="拆单">拆单</Option>
                                <Option value="厂长">厂长</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="description" label="Description">
                            <Input type="textarea" />
                        </Form.Item>
                    </Form>
                </Modal>
                <Table dataSource={this.state.userList} columns={columns}
                    rowKey={item => item.id}
                />
            </div>
        )
    }
}
