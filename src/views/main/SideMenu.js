import React, { Component } from 'react'
import { Menu } from 'antd';
import { withRouter } from 'react-router-dom'
import menu from '../../router/menu'
const { SubMenu } = Menu;
class SideMenu extends Component {
  state = {
    mode: 'inline',
    theme: 'light',
  }

  handleClick = e => {
    this.props.history.push(e.key)
  }

  componentDidMount() {
    this.renderSideMenu(menu)
  }

  renderSideMenu = (menu) => {
    const roleType = JSON.parse(sessionStorage.getItem('users')).roleType
    return menu.map(item => {
      if (item.children) {
        if (roleType < item.permission) {
          return null
        }
          return (<SubMenu
            key={item.path}
            title={
              <span>
                <item.icon />
                <span>{item.title}</span>
              </span>
            }
          >
          {
            this.renderSideMenu(item.children)
          }
          </SubMenu>
          )
        
      } else {
        if (roleType < item.permission) {
          return null
        } else {
          return <Menu.Item
            key={item.path}>
              <item.icon />
            <span>{item.title}</span>
          </Menu.Item>
        }

      }
    })
  }


  render() {
    var selectedKeys = this.props.location.pathname
    var openKey = '/' + this.props.location.pathname.split('/')[1]
    return (
      <div style={{ height: '100%' }}>

        <Menu
          onClick={this.handleClick}
          style={{ height: '100%' }}
          selectedKeys={[selectedKeys]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme='dark'
        >
         {
           this.renderSideMenu(menu)
         }
        </Menu>
      </div>
    )
  }


}




export default withRouter(SideMenu)