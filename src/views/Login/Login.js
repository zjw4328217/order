import React, { Component } from 'react'
import { Form, Input, Button ,message} from 'antd';
import Particles from 'react-particles-js';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css'
import axios from 'axios'
export default class Login extends Component {


  componentDidMount() {
    
    axios.get('/bai?wd=jqery').then(res => {
      console.log(res.data)
    })
  }
  
    render() {
        return (
            <div style={{background: 'rgb(35, 39, 65)',height:"100%"}}>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button style={{width:'240px'}} size='large' type="primary" htmlType="submit" className="login-form-button">
                            登陆
                        </Button>
                    </Form.Item>
                </Form>
                <Particles height={window.innerHeight-5+"px"}
                params={{
                    "interactivity": {
                        "detect_on": "canvas",
                        "events": {
                          "onhover": {
                            "enable": false,
                            "mode": "repulse"
                          },
                          "onclick": {
                            "enable": true,
                            "mode": "push"
                          },
                          "resize": true
                        },
                        "modes": {
                          "grab": {
                            "distance": 800,
                            "line_linked": {
                              "opacity": 1
                            }
                          },
                          "bubble": {
                            "distance": 800,
                            "size": 80,
                            "duration": 2,
                            "opacity": 0.8,
                            "speed": 3
                          },
                          "repulse": {
                            "distance": 400,
                            "duration": 0.4
                          },
                          "push": {
                            "particles_nb": 4
                          },
                          "remove": {
                            "particles_nb": 2
                          }
                        }
                      }
                }}/>
            </div>
        )
    }

    onFinish=values => {
        
        axios.get(`http://localhost:8000/users?username=${values.username}&password=${values.password}&roleState=true`).then(res => {
          if(res.data.length>0){
            this.props.history.push('/')
            sessionStorage.setItem('isLogin',true)
            sessionStorage.setItem('users',JSON.stringify(res.data[0]))
          }else{
            message.warning('用户名或者密码错误，请重新输入！')
          }
        })
    }
}
