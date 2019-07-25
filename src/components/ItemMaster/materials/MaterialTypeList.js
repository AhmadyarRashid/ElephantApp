import React from "react";
import { Table, Divider } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class MaterialsList extends React.Component {
  state = {
    loading: false,
    hash: "#",
    material_type_id: null,
    columns: [
      {
        title: "Number",
        dataIndex: "material_type_number",
        key: "material_type_number"
      },
      {
        title: "Material Name",
        dataIndex: "material_type_name",
        key: "material_type_name"
      }, {
        title: "Category",
        dataIndex: "category_name",
        key: "category_name"
      },
      {
        title: "Action",
        key: "action",
        dataIndex: "id",
        render: (text, record) => (
          <span>
            <a href={this.state.hash} id={text} onClick={this.onEditClick}>Edit</a>
            <Divider type="vertical" />
            <a href={this.state.hash} id={text} onClick={this.props.handleDelete}>Delete</a>
          </span>
        )
      }
    ]
  };

  componentDidMount() {

  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  onEditClick = (e) => {
    this.props.onEditClick(e.target.id);
  }

  closeModal = () => {
    this.setState({ loading: false, visible: false, forecast_id: null });
  };

  render() {
    const { loading } = this.state;
    var rows = this.props.list.map((f) => {
      return (
        {
          key: f.material_type_id,
          id: f.material_type_id,
          material_type_name: f.material_type_name,
          material_type_number: f.material_type_number,
          category_name: f.category_name
        }

      )
    })
    return (
      <Table columns={this.state.columns} dataSource={rows} loading={loading} />
    );
  }
}

MaterialsList.propTypes = {
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors,
  materialType: state.materialType
});

export default connect(mapStateToProps, {})(MaterialsList);
