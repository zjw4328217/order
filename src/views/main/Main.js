import React, { Component } from 'react'
import SideMenu from './SideMenu'
import TopHeader from './TopHeader';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
import { Layout } from 'antd';

import CreateOrder from '../createOrder/CreateOrder';
import OrderSearch from '../OrderSearch/OrderSearch';
import OrderState from '../OrderSearch/OrderState';
import {connect } from 'react-redux'
import Add from '../OrderSet/Add';
import Rights from '../OrderSet/Rights';
import Home from './Home';
import NotFound from './NotFound';
import OrderDetail from '../OrderSearch/OrderDetail';
import OrderDetailTwo from '../OrderSearch/OrderDetailTwo';
import OrderDetailThree from '../OrderSearch/OrderDetailThree';
import OrderPreview from '../OrderSearch/OrderPreview';
import UserList from '../OrderSet/UserList';
import Identifi from '../OrderSet/Identifi';
const { Header, Sider, Content } = Layout;
 class Main extends Component {
    state = {
        collapsed: false,
    }


    handleClick = e => {
        console.log('click ', e);
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (

            < Layout style={{ height: '100%' }}>
                <Sider trigger={null} collapsible collapsed={this.props.collapsed} >
                    <SideMenu style={{ width: '240px' }} />
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        <TopHeader />
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{ padding: 20 }}
                    >
                            <Switch>

                                {/* 首页 */}

                                <Route path='/home' component={Home} />
                                {/* 订单创建 */}
                                <Route path='/ordercreate/create' component={CreateOrder} />
                                {/* 订单查询 */}
                                <Route path='/ordersearch' component={OrderSearch} />
                                {/* <Route path='/ordersearch/state' component={OrderState} /> */}
                                {/* 预览单独订单状态 */}
                                <Route path='/orderpreview/:id' component={OrderPreview} />
                                {/* 设计师详情修改页面 */}
                                <Route path='/orderdetail/:id' component={OrderDetail} />
                                <Route path='/orderdetailtwo/:id' component={OrderDetailTwo} />
                                <Route path='/orderdetailthree/:id' component={OrderDetailThree} />
                                {/* 设置 */}
                                <Route path='/orderset/add' component={Add} />
                                <Route path='/orderset/rights' component={Rights} />
                                <Route path='/orderset/userlist' component={UserList} />
                                <Route path='/orderset/identifi/:tel' component={Identifi} />
                                {/* 重定向 */}
                                <Redirect from="/" to="/home" exact />
                                <Route path="*" component={NotFound} />
                            </Switch>
                    </Content>
                </Layout>
            </Layout >
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        collapsed:state.isCollapsed
    }
}

export default connect(mapStateToProps)(Main)