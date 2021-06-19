import React, { Component } from 'react'
import { Table, Button,  Switch, message } from 'antd';
import {
    FormOutlined,
} from '@ant-design/icons';
import axios from 'axios';
export default class UserList extends Component {
    state={
        userList:[]
    }

    componentDidMount() {

        axios.post('/api/getusers',{}).then(res => {
            this.setState({
                userList:res.data
            })
            console.log(res.data)
        })
    }
    
    onSwitchChange =(checked,data) => {
        console.log(checked,data)
        axios.post('/api/changeuser',{
            tel:data.tel,
            roleState:checked
        }).then(res => {
            console.log(res.data)
        })
    }

    changeOne =(tel) => {
        console.log(tel)
        // Axios.post('/api/changeinfo',{
        //     userid:id,

        // })
        this.props.history.push(`/orderset/identifi/${tel}`)
    } 


    render() {
        const columns = [
            {
                title: '手机号',
                dataIndex: 'tel',
                key: 'tel',
            },
            {
                title: '是否认证',
                dataIndex: 'identification',
                key: 'identification',
                render:(data) =>{
                    return data ? '认证通过':'未认证'
                }
            },
            {
                title: '是否可用',
                dataIndex: 'roleState',
                key: 'roleState',
                render: (data, item) => {
                    return <div>
                        <Switch  defaultChecked={data} onChange={(checked) => {
                            this.onSwitchChange(checked, item)
                               
                        }} />
                    </div>
                }
            },
            {
                title: '管理',
                dataIndex: '',
                key: 'x',
                render: (item) => <div>

                    <Button type="primary" shape="circle"
                        onClick={() => this.changeOne(item.tel)}
                        disabled={item.default}
                        icon={<FormOutlined />} />
                </div>
            }
        ]

       


        return (
            <div>
                 <Table dataSource={this.state.userList} columns={columns}
                    rowKey={item => item._id}
                />
            </div>
        )
    }
}
