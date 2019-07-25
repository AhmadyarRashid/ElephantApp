import React from "react";
import { Menu, Icon } from "antd";
import { withRouter } from 'react-router-dom';
const SubMenu = Menu.SubMenu;


class Navbar extends React.Component {

  onLogoutClick = (e) => {
    
    try{
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        this.props.history.push('/login');
    }catch(e){
      console.log(e);
    }
  };

  render() {
    return (
      <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px", float: "right" }}>
      
        <SubMenu
          key="sub4"
          title={
            <span>
              <Icon type="user" />
              <span>User</span>
            </span>
          }>
          <Menu.Item key="7" onClick={this.onLogoutClick}>Logout</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default withRouter(Navbar);
