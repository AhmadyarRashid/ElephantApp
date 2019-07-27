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
      <aside className="left-sidebar">
        <div className="scroll-sidebar">
          <nav className="sidebar-nav">
            <ul id="sidebarnav">
              <li>
                <div className="px-3">
                </div>
                <Link to="/home" >Dashboard</Link>
              </li>
              <li>
                <Link to="/questions" >Questions</Link>
              </li>
              <li>
                <Link to="/answer" >Answers</Link>
              </li>
              <li>
                <Link to="/candidate" >Candidates</Link>
              </li>
              <li>
                <a className="has-arrow waves-effect waves-dark">
                  <span class="hide-menu"> </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    );
  }
}
export default Sidebar;
