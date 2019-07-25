import { Layout, PageHeader } from "antd";
import React from "react";
import { Link } from "react-router-dom";

import "../../layout.css";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const { Header, Content, Footer } = Layout;

class DefaultLayout extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    return (
      <Layout>
        <Header className="header">
          <Link to="/home">
            <div className="logo">
              <img src={require("../../images/logo.png")} alt="logo" />
            </div>
          </Link>

          <Navbar />
        </Header>
        <Layout style={{ minHeight: "90vh" }}>
          <Sidebar />
          <Layout>
            {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
            <Content style={{ margin: "0 16px" }}>
              <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
                <PageHeader title={this.props.title} />
                {this.props.children}
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>Copyrights ©2018 Meo</Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
export default DefaultLayout;
