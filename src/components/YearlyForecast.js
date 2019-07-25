import React from "react";
import DefaultLayout from "./Layout/DefaultLayout";
import AddEdit from "./YealyForecast/AddEdit";

// import { Table, Divider, Tag } from 'antd';
import { Table, Divider, Modal, Button } from "antd";

class Home extends React.Component {
  state = {
    loading: false,
    visible: false,
    columns: [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: "Item No.",
        dataIndex: "itemNo",
        key: "itemNo"
      },
      {
        title: "Year",
        dataIndex: "year",
        key: "year"
      },
      //{
      //     title: 'Tags',
      //     key: 'tags',
      //     dataIndex: 'tags',
      //     render: tags => (
      //         <span>
      //             {tags.map(tag => {
      //                 let color = tag.length > 5 ? 'geekblue' : 'green';
      //                 if (tag === 'loser') {
      //                     color = 'volcano';
      //                 }
      //                 return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
      //             })}
      //         </span>
      //     ),
      // },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            <a href="javascript:;">Edit</a>
            <Divider type="vertical" />
            <a href="javascript:;">Delete</a>
          </span>
        )
      }
    ],
    data: [
      {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park" //,
        //tags: ['nice', 'developer'],
      },
      {
        key: "2",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park" //,
        //tags: ['loser'],
      },
      {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park" //,
        //tags: ['cool', 'teacher'],
      }
    ]
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, loading } = this.state;
    return (
      <DefaultLayout title="Yearly Forecast">
        <Button type="primary" onClick={this.showModal}>
          Add
        </Button>
        <Modal
          visible={visible}
          title="Add Forecast"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Submit
            </Button>
          ]}>
          <AddEdit />
        </Modal>
        <Table columns={this.state.columns} dataSource={this.state.data} />
      </DefaultLayout>
    );
  }
}
export default Home;
