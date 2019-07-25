import React from "react";
import DefaultLayout from "../../Layout/DefaultLayout";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";
import { Modal, Button } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllCategories, getCategoryById, deleteCategory, createUpdateCategory } from "../../../store/actions/categoryAction";

const confirm = Modal.confirm;

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      modal_title: ''
    };
  }
  componentDidMount() {
    this.props.getAllCategories();
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleSuccess = () => {
    this.closeModal();
    this.props.getAllCategories();
  };
  onAddNewClick = () => {
    this.setState({
      modal_title: "Add New Category"
    });
    this.showModal();
  }

  onEditClick = (id) => {
    this.setState({
      modal_title: "Edit Category"
    });
    this.props.getCategoryById(id);
    this.showModal();
  }

  closeModal = () => {
    this.setState({ loading: false, visible: false });
  };

  deleteConfirm = (e) => {
    var deleteId = e.target.id;
    var prop = this.props;
    confirm({
      title: 'Delete Category',
      content: 'Do you want to delete this category ?',
      onOk() {
        prop.deleteCategory(deleteId);
      },
      onCancel() { },
    });
  }

  render() {
    return (
      <DefaultLayout title="Categories">
        <Button type="primary" onClick={this.onAddNewClick}>
          Add New
        </Button>
        <CategoryForm
          visible={this.state.visible}
          handleCancel={this.closeModal}
          handleSuccess={this.handleSuccess}
          categoryObject={this.props.category.category}
          modal_title={this.state.modal_title}
        ></CategoryForm>
        <CategoryList list={this.props.category.categoryList} onEditClick={this.onEditClick} handleDelete={this.deleteConfirm}></CategoryList>
      </DefaultLayout>
    );
  }
}

Category.propTypes = {
  getAllCategories: PropTypes.func.isRequired,
  getCategoryById: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors,
  category: state.category
});

export default connect(mapStateToProps, { getAllCategories, getCategoryById, deleteCategory })(Category);
