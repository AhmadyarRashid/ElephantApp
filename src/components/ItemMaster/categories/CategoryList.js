import React from "react";
import DefaultLayout from "../../Layout/DefaultLayout";
// import SalesForecastForm from "./SalesForecastForm";
import { Table, Divider, Modal, Button } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const confirm = Modal.confirm;

class CategoryList extends React.Component {
  state = {
    loading: false,
    visible: false,
    forecast_id: null,
    columns: [
      {
        title: "ID",
        dataIndex: "category_id",
        key: "category_id"
      },
      {
        title: "Category Name",
        dataIndex: "category_name",
        key: "category_name"
      },
      {
        title: "Action",
        key: "action",
        dataIndex: "category_id",
        render: (text, record) => (
          <span>
            <a href="javascript:;" id={text} onClick={this.onEditClick}>Edit</a>
            <Divider type="vertical" />
            <a href="javascript:;" id={text} onClick={this.props.handleDelete}>Delete</a>
          </span>
        )
      }
    ]
  };

  componentDidMount() {

  }

  onEditClick = (e) => {
    this.props.onEditClick(e.target.id);
  }

  render() {
    const { loading } = this.state;
    var rows = this.props.list.map((f) => {
      return (
        {
          key: f.category_id,
          category_id: f.category_id,
          category_name: f.category_name
        }

      )
    })
    return (
      <Table columns={this.state.columns} dataSource={rows} loading={loading} />
    );
  }
}

CategoryList.propTypes = {
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, {})(CategoryList);
