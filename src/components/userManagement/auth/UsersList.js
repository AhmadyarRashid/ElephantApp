import React from "react";
import DefaultLayout from "../../Layout/DefaultLayout";
// import SalesForecastForm from "./SalesForecastForm";
import { Table, Divider, Modal, Button } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllUsers } from "../../../store/actions/authAction";

const confirm = Modal.confirm;

class UsersList extends React.Component {
  state = {
    loading: false,
    visible: false,
    forecast_id: null,
    columns: [
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Username",
        dataIndex: "username",
        key: "username"
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone"
      },
      {
        title: "Department",
        dataIndex: "department",
        key: "department"
      },
      {
        title: "IP Address",
        dataIndex: "ip_address",
        key: "ip_address"
      },
      {
        title: "Action",
        key: "action",
        dataIndex: "user_id",
        render: (text, record) => (
          <span>
            <a href="javascript:;" id={text}>Edit</a>
            <Divider type="vertical" />
            {/* <a href="javascript:;" id={text}>Delete</a> */}
          </span>
        )
      }
    ]
  };

  componentDidMount() {
    this.props.getAllUsers();
  }

  onEditClick = (e) => {
    this.props.onEditClick(e.target.id);
  }

  render() {
    const { loading } = this.state;
    var rows = this.props.auth.usersList.map((u) => {
      return (
        {
          key: u.user_id,
          user_id: u.user_id,
          department_id: u.department_id,
          department: u.department_name,
          name: u.first_name + ' ' + u.last_name,
          username: u.username,
          phone: u.phone,
          ip_address: u.ip_address
        }

      )
    })
    return (
      <DefaultLayout title={"Users"}>
        <Table columns={this.state.columns} dataSource={rows} loading={loading} />
      </DefaultLayout>
    );
  }
}

UsersList.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps, { getAllUsers })(UsersList);
