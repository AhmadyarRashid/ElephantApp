import React from "react";
import DefaultLayout from "../Layout/DefaultLayout";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Table, Divider, Modal, Button } from "antd";
import VendorForm from "./VendorForm";
import { createUpdateVendor, getAllVendors, deleteVendor } from "../../store/actions/vendorsAction";
const confirm = Modal.confirm;
class VendersList extends React.Component {
  state = {
    loading: false,
    visible: false,
    modal_title: '',
    formErrors: '',
    vendor_id: '',
    columns: [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address"
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone"
      },
      {
        title: "Status",
        dataIndex: "active",
        key: "active"
      },
      {
        title: "Action",
        key: "action",
        dataIndex: "id",
        render: (text, record) => (
          <span>
            <a href="javascript:;" id={text} onClick={this.onEditClick}>Edit</a>
            <Divider type="vertical" />
            <a href="javascript:;" id={text} onClick={this.deleteConfirm}>Delete</a>
          </span>
        )
      }
    ]
  };

  deleteConfirm = (e) => {
    var deleteId = e.target.id;
    var prop = this.props;
    confirm({
      title: 'Delete Vendor',
      content: 'Do you want to delete this vendor ?',
      onOk() {
        prop.deleteVendor(deleteId);
      },
      onCancel() { },
    });
  }

  componentDidMount = () => {
    this.props.getAllVendors();
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  onAddNewClick = () => {
    this.setState({
      modal_title: "Add New Vendor"
    });
    this.showModal();
  }

  onEditClick = (e) => {
    this.setState({
      modal_title: "Edit Vendor"
    });
    this.showModal();
    this.setState({ vendor_id: e.target.id })
  }

  handleSuccess = () => {
    this.closeModal();
    this.props.getAllVendors();
  };

  closeModal = () => {
    this.setState({ loading: false, visible: false, vendor_id: null });
  };

  render() {
    const { visible, loading } = this.state;
    var data = this.props.vendors.map((v) => {
      return (
        {
          key: v.vendor_id,
          name: v.vendor_name,
          phone: v.vendor_phone,
          address: v.vendor_address,
          active: v.active,
          id: v.vendor_id
        }
      )
    })
    return (
      <DefaultLayout title="Vendors">
        <Button type="primary" onClick={this.onAddNewClick}>
          Add New
        </Button>
        <Modal
          visible={visible}
          title={this.state.modal_title}
          footer={null}
          destroyOnClose
          onCancel={this.closeModal}
        >
          <VendorForm handleSuccess={this.handleSuccess} handleCancel={this.closeModal} vendor_id={this.state.vendor_id} />
        </Modal>
        <Table columns={this.state.columns} dataSource={data} />
      </DefaultLayout>
    );
  }
}

VendersList.propTypes = {
  createUpdateVendor: PropTypes.func.isRequired,
  deleteVendor: PropTypes.func.isRequired,
  getAllVendors: PropTypes.func.isRequired,
  vendors: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  vendors: state.vendor.vendors,
  errors: state.errors
});
export default connect(mapStateToProps, { createUpdateVendor, getAllVendors, deleteVendor })(VendersList);