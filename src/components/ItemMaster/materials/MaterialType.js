import React from "react";
import DefaultLayout from "../../Layout/DefaultLayout";
import MaterialTypeForm from "./MaterialTypeForm";
import MaterialTypeList from "./MaterialTypeList";
import { Modal, Button } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllMaterialTypes, getMaterialTypeById, deleteMaterialType } from "../../../store/actions/materialTypeAction";

const confirm = Modal.confirm;

class MaterialType extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      material_type_id: null,
      modal_title: ''
    };
    this.deleteConfirm = this.deleteConfirm.bind(this);
  }
  componentDidMount() {
    this.props.getAllMaterialTypes();
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleSuccess = () => {
    this.closeModal();
    this.props.getAllMaterialTypes();
  };
  onAddNewClick = (id) => {
    this.setState({
      modal_title: "Add New Material"
    });
    this.showModal();
  }

  onEditClick = (id) => {
    this.setState({
      modal_title: "Edit Material"
    });
    this.props.getMaterialTypeById(id);
    this.showModal();
  }

  closeModal = () => {
    this.setState({ loading: false, visible: false, material_type_id: null });
  };

  deleteConfirm = (e) => {
    var deleteId = e.target.id;
    var prop = this.props;
    confirm({
      title: 'Delete Material Type',
      content: 'Do you want to delete this material ?',
      onOk() {
        prop.deleteMaterialType(deleteId);
      },
      onCancel() { },
    });
  }

  render() {
    return (
      <DefaultLayout title="Materials">
        <Button type="primary" onClick={this.onAddNewClick}>
          Add New
        </Button>
        <MaterialTypeForm
          visible={this.state.visible}
          handleCancel={this.closeModal}
          handleSuccess={this.handleSuccess}
          material={this.props.materialType.material}
          modal_title={this.state.modal_title}
        ></MaterialTypeForm>
        <MaterialTypeList list={this.props.materialType.materialsList} onEditClick={this.onEditClick} handleDelete={this.deleteConfirm}></MaterialTypeList>
      </DefaultLayout>
    );
  }
}

MaterialType.propTypes = {
  getAllMaterialTypes: PropTypes.func.isRequired,
  deleteMaterialType: PropTypes.func.isRequired,
  getMaterialTypeById: PropTypes.func.isRequired,
  materialType: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors,
  materialType: state.materialType
});

export default connect(mapStateToProps, { getAllMaterialTypes, getMaterialTypeById, deleteMaterialType })(MaterialType);
