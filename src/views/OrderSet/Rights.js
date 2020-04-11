import React, { Component } from 'react'
import Axios from 'axios'
import { Spin,Table ,Tag} from 'antd';
export default class Rights extends Component {
    state={
        dataList:[]
    }


    componentDidMount() {
        Axios.get('http://59.110.173.149:8000/rights').then(res => {
            console.log(res.data)
            this.setState({
                dataList:res.data
            })
        })
    }
    
    render() {
        const columns = [
            {
                title: '#',
                dataIndex: 'id',
                key: 'id',
              },
            {
              title: '权限名',
              dataIndex: 'rightName',
              key: 'rightName',
            },
            {
              title: '已有权限',
              dataIndex: 'rights',
              key: 'rights',
              render:(data,item) =>{
                  const arr=['lime','gold','orange','volcano','red']
                  return <div>
                     {data.map(dataOne =>{
                         return <Tag key={dataOne} color={arr[item.roleType-1]}>{dataOne}</Tag>

                     })
                    }
                  </div>
              }
            },
            
            
          
          ]


        return (
            <div>
                {
                    this.state.dataList.length>0?
                    <Table columns={columns} dataSource={this.state.dataList}
                    rowKey={item => item.id}
                  />:
                    <Spin size="large" />
                }
            </div>
        )
    }
}
