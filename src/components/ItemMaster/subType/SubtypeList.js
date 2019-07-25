import React from "react";
import { Table, Divider } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class SubTypeList extends React.Component {
  state = {
    loading: false,
    sub_type_id: null,
    columns: [
      {
        title: "Number",
        dataIndex: "sub_type_number",
        key: "sub_type_number"
      },
      {
        title: "Name",
        dataIndex: "sub_type_name",
        key: "sub_type_name"
      }, {
        title: "Material Type",
        dataIndex: "material_type_name",
        key: "material_type_name"
      },
      {
        title: "Action",
        key: "action",
        dataIndex: "id",
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
    this.props.onEditClick(e.target.id)
  }

  render() {
    const { loading } = this.state;
    var rows = this.props.list.map((f) => {
      return (
        {
          key: f.sub_type_id,
          id: f.sub_type_id,
          sub_type_name: f.sub_type_name,
          sub_type_number: f.sub_type_number,
          material_type_name: f.material_type_name
        }
      )
    })
    return (
      <Table columns={this.state.columns} dataSource={rows} loading={loading} />
    );
  }
}

SubTypeList.propTypes = {
  errors: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps)(SubTypeList);
