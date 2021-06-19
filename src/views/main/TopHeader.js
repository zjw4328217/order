import React, { Component } from 'react'
import { Avatar, Badge, Menu,Dropdown} from 'antd';
import {
    RightSquareOutlined,
    LeftSquareOutlined,
} from '@ant-design/icons';
import {connect} from 'react-redux'
import './TopHeader.css'
import {withRouter} from 'react-router'
import Axios from 'axios';
 class TopHeader extends Component {
    state = {
        collapsed: false,
        count: 0,
        users:{},
        firstLetter:''
    }

    componentDidMount() {
        let users = JSON.parse(sessionStorage.getItem('users'))
        
        Axios.get(`http://59.110.173.149:8000/orders?orderDesign=${users.username}`).then(res => {
            this.setState({
                count: res.data.length,
                users,
                firstLetter:users.username.substr(0,1)
            })
        })
    }

    logout=() => {
        sessionStorage.setItem('users','')
        sessionStorage.setItem('isLogin',false)
        
        this.props.history.push('/login')
    }

    toggle=(collapsed) => {
        this.props.setCollapsed(collapsed)
        console.log(collapsed)
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {

        const menu = (
            <Menu>
                <Menu.Item>
                   {this.state.users.username}
                </Menu.Item>
                <Menu.Item>
                   {this.state.users.right}
                </Menu.Item>
                <Menu.Item onClick={this.logout}>
                    退出账号
                </Menu.Item>
            </Menu>
        )
        return (
            <div>
                {
                    this.state.collapsed ?
                        <RightSquareOutlined  onClick={() => this.toggle(false)} style={{ color: '#fff' }} /> :
                        <LeftSquareOutlined  onClick={() => this.toggle(true)} style={{ color: '#fff' }} />
                }
                <div className="right" style={{color:'white'}}>
                    欢迎{this.state.users.username}回来
                    <Dropdown overlay={menu} placement="bottomLeft" style={{marginLeft:10}}>
                        <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf', marginRight: 8 }}>{this.state.firstLetter}</Avatar>
                    </Dropdown>
                    <Badge count={this.state.count} />
                </div>

            </div>
        )
    }
}
const mapStateToProps= ()=>{
    return {

    }
}

const mapDispatchToprops={
    setCollapsed:(collapsed) => {
        return {
            type:'MySideMenu',
            payload:collapsed
        }
    }
}


export default withRouter(connect(mapStateToProps,mapDispatchToprops)(TopHeader))