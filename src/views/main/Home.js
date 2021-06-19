import React, { Component } from 'react'
import {
  notification,
  Button,
  Table,
  Spin
} from 'antd';
import {
  SmileOutlined,
  EditOutlined,
  CheckCircleTwoTone,
  CloseSquareTwoTone
} from '@ant-design/icons'
import Axios from 'axios';
import { connect } from 'react-redux';
class Home extends Component {
  state = {
    dataList: null,
    dataListed: null,
    dataAready: null,
    roleType: 0,
    orderBuild: null
  }
  openNotification = () => {
    notification.open({
      message: '你有任务需要完成',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  }


  
  componentDidMount() {
    
    var user = JSON.parse(sessionStorage.getItem('users'))
    this.setState({
      roleType: user.roleType
    })
    if (user.roleType === 3) {
      // Axios.get(`http://59.110.173.149:8000/orders?orderDesign=${user.name}&isChangeDesign=false`).then(res => {
      //   if (res.data.length > 0) this.openNotification()
      //   console.log('666666')
      //   this.setState({
      //     dataList: res.data,
      //     roleType: user.roleType
      //   })

      // })
      this.props.getOneDataList(user.name)

      Axios.get(`http://59.110.173.149:8000/orders?right=${user.right}&orderDesignT=${user.name}&isChangeCreator=false&isChangeDesign=true`).then(res => {
        this.setState({
          dataListed: res.data
        })
      })
    }
    if (user.roleType <= 2) {
      this.props.getOneDataList(user.name)
      Axios.get(`http://59.110.173.149:8000/orders?right=${user.right}&isChangeDesign=true&isChangeCreator=true`).then(res => {
        this.setState({
          dataAready: res.data
        })
      })

      Axios.get(`http://59.110.173.149:8000/orders?orderDesign=${user.name}&isChangeDesign=false`).then(res => {
        if (res.data.length > 0) this.openNotification()
        console.log('666666')
        this.setState({
          dataList: res.data,
        })

      })

      Axios.get(`http://59.110.173.149:8000/orders?right=${user.right}&orderDesignT=${user.name}&isChangeCreator=false&isChangeDesign=true`).then(res => {
        if (res.data.length > 0) this.openNotification()
        this.setState({
          dataListed: res.data
        })
      })

    }

    Axios.get(`http://59.110.173.149:8000/orders?right=${user.right}&isChangeDesign=true&isChangeCreator=true`).then(res => {
      this.setState({
        dataAready: res.data
      })
    })


    if (user.roleType === 4) {
      Axios.get(`http://59.110.173.149:8000/orders?isBuilded=true`).then(res => {
        // res.data.filter(item =>!item.orderDesignThree)
        const orderBuild = res.data.filter(item => item.orderDesignThree === user.name && !item.orderDesignFour)
        if (orderBuild.length > 0) this.openNotification()
        this.setState({
          orderBuild
        })
      })
    }
    if (user.roleType === 5) {
      Axios.get(`http://59.110.173.149:8000/orders?isBuilded=true`).then(res => {
        console.log(res.data)
        const orderBuild = res.data.filter(item => item.orderDesignFour)
        console.log(orderBuild)
        if (orderBuild.length > 0) {
          this.openNotification()
          this.setState({
            orderBuild,

          })
        } else {
          const orderBuilds = res.data.filter(item => !item.orderDesignThree)
          this.setState({
            orderBuild: orderBuilds
          })
        }
      })
    }
  }


  goOrder = (id) => {
    this.props.history.push(`/orderdetail/${id}`)
  }

  goOrderTwo = (id) => {
    this.props.history.push(`/orderdetailtwo/${id}`)
  }

  goOrderThree = (id) => {
    this.props.history.push(`/orderdetailthree/${id}`)
  }

  render() {
    const columns = [
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
            onClick={() => this.goOrder(item.id)}
            icon={<EditOutlined />} />
        </div>
      },
    ]

    const columnsTwo = [
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
            onClick={() => this.goOrderTwo(item.id)}
            icon={<EditOutlined />} />
        </div>
      },
    ]

    const columnsAready = [
      {
        title: '是否生产',
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
            disabled
            icon={<EditOutlined />} />
        </div>
      },
    ]

    const columnsBuild = [
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
            onClick={() => this.goOrderThree(item.id)}
            icon={<EditOutlined />} />
        </div>
      },
    ]

    return (
      <div>
        {

          this.state.roleType <= 3 ?
            <div>
              {/* 店员 店长 设计师的任务列表 */}
              {
                this.props.oneDataList ?
                  <div>
                    <h2>一阶段任务</h2>
                    <Table columns={columns} dataSource={this.props.oneDataList}
                      rowKey={item => item.id}
                    />
                    <br />
                  </div> :
                  <Spin size="large" />
              }
              {
                this.state.dataListed ?
                  <div>
                    <h2>二阶段任务</h2>
                    <Table columns={columnsTwo} dataSource={this.state.dataListed}
                      rowKey={item => item.id}
                    />
                    <br />
                  </div> :
                  <Spin size="large" />
              }
            </div> :
            <div>
              {/* 厂长 拆单的任务列表 */}
              <h2>指派的任务</h2>
              <Table columns={columnsBuild} dataSource={this.state.orderBuild}
                rowKey={item => item.id}
              />
              <br />
            </div>
        }
        {
          this.state.dataAready ?
            <div>
              <h2>已经完成的任务</h2>
              <Table columns={columnsAready} dataSource={this.state.dataAready}
                rowKey={item => item.id}
              />
              <br />
            </div> :
            <Spin size="large" />
        }

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    oneDataList: state.oneDataList,
  }
}


const mapDispatchToProps = {
  getOneDataList: (name) => {
    return Axios.get(`http://59.110.173.149:8000/orders?orderDesign=${name}&isChangeDesign=false`).then(res => {
      console.log(res.data)
      if (res.data.length > 0) this.openNotification()
      var temparr=null
      if(res.data.length===0){
        temparr=[]
      }else{
         temparr= res.data
      }
      return {
        type: 'MOneDataList',
        payload:temparr
      }

    })
  },
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)