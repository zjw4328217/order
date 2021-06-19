import React, { Component } from 'react'
import Axios from 'axios'
import {
    Button,
    Table
  } from 'antd';
  import {
    PlayCircleFilled,
    CheckCircleTwoTone,
    CloseSquareTwoTone
  } from '@ant-design/icons'
export default class OrderState extends Component {
    state={
        dataList:[]
    }

    componentDidMount() {
        Axios.get('http://59.110.173.149:8000/orders').then(res => {
            console.log(res.data)
            this.setState({
                dataList:res.data
            })
        })
    }

    goPreview=(id) =>{
        console.log(id)
        this.props.history.push(`/orderpreview/${id}`)
        
    }

    render() {
        const columnsAready = [
            {
              title: '订单是否生产',
              dataIndex: 'isBuilded',
              key: 'isBuilded',
              render:(item) => item?<CheckCircleTwoTone />:<CloseSquareTwoTone />
              
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
                  onClick={()=>this.goPreview(item.id)}
                  icon={<PlayCircleFilled  />} />
              </div>
            },
          ]


        return (
            <div>
                <Table columns={columnsAready} dataSource={this.state.dataList}
                    rowKey={item => item.id}
                />
            </div>
        )
    }
}
