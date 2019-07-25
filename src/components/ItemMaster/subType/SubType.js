import React from "react";
import DefaultLayout from "../../Layout/DefaultLayout";
import SubTypeForm from "./SubTypeForm";
import SubTypeList from "./SubtypeList";
import { Modal, Button } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllSubTypes, getSubtypeById, deleteSubType } from "../../../store/actions/subTypesAction";

const confirm = Modal.confirm;

class SubType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      modal_title: ''
    };
  }
  componentDidMount() {
    this.props.getAllSubTypes();
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleSuccess = () => {
    this.closeModal();
    this.props.getAllSubTypes();
  };

  onAddNewClick = (id) => {
    this.setState({
      modal_title: "Add New Category"
    });
    this.showModal();
  }

  onEditClick = (id) => {
    this.setState({
      modal_title: "Edit Category"
    });
    this.props.getSubtypeById(id);
    this.showModal();
  }

  closeModal = () => {
    this.setState({ loading: false, visible: false });
  };

  deleteConfirm = (e) => {
    var deleteId = e.target.id;
    var prop = this.props;
    confirm({
      title: 'Delete SubType',
      content: 'Do you want to delete this subtype ?',
      onOk() {
        prop.deleteSubType(deleteId);
      },
      onCancel() { },
    });
  }

  render() {
    return (
      <DefaultLayout title="Sub Types">
        <Button type="primary" onClick={this.onAddNewClick}>
          Add New
        </Button>
        <SubTypeForm
          visible={this.state.visible}
          handleCancel={this.closeModal}
          handleSuccess={this.handleSuccess}
          subtype={this.props.subtype.subtype}
          modal_title={this.state.modal_title}
        ></SubTypeForm>
        <SubTypeList list={this.props.subtype.subtypeList} onEditClick={this.onEditClick} handleDelete={this.deleteConfirm}></SubTypeList>
      </DefaultLayout>
    );
  }
}

SubType.propTypes = {
  getAllSubTypes: PropTypes.func.isRequired,
  deleteSubType: PropTypes.func.isRequired,
  getSubtypeById: PropTypes.func.isRequired,
  subtype: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors,
  subtype: state.subtype
});

export default connect(mapStateToProps, { getAllSubTypes, getSubtypeById, deleteSubType })(SubType);
