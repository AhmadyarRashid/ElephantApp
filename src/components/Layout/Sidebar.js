import { Layout, Menu, Icon } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Sidebar extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        style={{ background: "#00000" }}
      >
        <Menu theme="dark" mode="inline">

          <Menu.Item key="4">
            <Link to='/candidate'>
              <Icon type="user" />
              <span>Candidate</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Icon type="table" />
            <span>Tables</span>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to='/answer'>
              <Icon type="file" />
              <span>Answer</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link to="/questions">
              <Icon type="file" />
              <span>Questions</span>
            </Link>
          </Menu.Item>

        </Menu>
      </Sider>
    );
  }
}
export default Sidebar;
