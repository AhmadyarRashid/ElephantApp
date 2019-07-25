import React from "react";
import { Form, Input, Button, Alert } from 'antd';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { createUpdateVendor, getAllVendors, getVendorById } from "../../store/actions/vendorsAction";
class VendorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            phone: {},
            address: {},
            name: {},
            errors: ''
        };
        this.validateFormFields = this.validateFormFields.bind(this);
        this.validateTextField = this.validateTextField.bind(this);        
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                //console.log('Received values of form: ', values);
                if (this.validateFormFields(values)) {
                    this.props.createUpdateVendor(values);
                }
            }
            else {
                this.setState({
                    errors: err
                })
                // console.log(err)
            }
        });
    }

    onAlertClose = () => {
        this.setState({
            errors: ''
        });
    }

    componentDidMount() {
        this.props.getVendorById(this.props.vendor_id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.vendor.created !== this.props.vendor.created) {
            this.props.form.resetFields();
            this.props.handleSuccess();
        }
        if (nextProps.errors.message) {
            if (!nextProps.errors.isSuccess) {
                this.setState({
                    errors: nextProps.errors.message
                });
            }
            else {
                this.setState({
                    errors: ''
                });
            }
        }
    }

    validateFormFields(values) {
        var name = this.validateTextField(values['name']);
        var address = this.validateTextField(values['address']);
        var phone = this.validateTextField(values['phone']);

        if (name) {
            this.setState({
                name: {
                    validateStatus: 'success',
                    errorMsg: '',
                }
            })
        }
        else {
            this.setState({
                name: {
                    validateStatus: 'error',
                    errorMsg: 'Please input name!',
                }
            })
        }

        if (address) {
            this.setState({
                address: {
                    validateStatus: 'success',
                    errorMsg: '',
                }
            })
        }
        else {
            this.setState({
                address: {
                    validateStatus: 'error',
                    errorMsg: 'Please input address!',
                }
            })
        }
        if (phone) {
            this.setState({
                phone: {
                    validateStatus: 'success',
                    errorMsg: '',
                }
            })
        }
        else {
            this.setState({
                phone: {
                    validateStatus: 'error',
                    errorMsg: 'Please input phone!',
                }
            })
        }
        if (!address || !name || !phone) {
            return false;
        }
        else {
            return true;
        }
    }

    validateTextField(value) {
        if (value === undefined || value === '' || value === null) {
            return false;
        }
        return true;
    }

    handleNameChange(value) {
        if (this.validateTextField(value)) {
            this.setState({
                name: {
                    validateStatus: 'success',
                    errorMsg: '',
                }
            })
        }
        else {
            this.setState({
                name: {
                    validateStatus: 'error',
                    errorMsg: 'Please input name!',
                }
            })
        }
    }

    handleAddressChange(value) {
        if (this.validateTextField(value)) {
            this.setState({
                address: {
                    validateStatus: 'success',
                    errorMsg: '',
                }
            })
        }
        else {
            this.setState({
                address: {
                    validateStatus: 'error',
                    errorMsg: 'Please input address!',
                }
            })
        }
    }
    
    handlePhoneChange(value) {
        if (this.validateTextField(value)) {
            this.setState({
                phone: {
                    validateStatus: 'success',
                    errorMsg: '',
                }
            })
        }
        else {
            this.setState({
                phone: {
                    validateStatus: 'error',
                    errorMsg: 'Please input phone!',
                }
            })
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 }
            }
        };
        var errorAlert = this.state.errors.length > 0 ? <Alert message={this.state.errors} closable onClose={this.onAlertClose} type="error" showIcon /> : '';
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                {errorAlert}
                <Form.Item>
                    {getFieldDecorator("vendor_id", { initialValue: this.props.vendor.vendor.vendor_id })(<Input hidden={true} />)}
                </Form.Item>
                <Form.Item label="Name"
                    validateStatus={this.state.name.validateStatus}
                    help={this.state.name.errorMsg}>

                    {getFieldDecorator('name', { initialValue: this.props.vendor.vendor.vendor_name }, {
                        rules: [{ required: true, message: 'Please input vendor name!' }],
                    })(
                        <Input onChange={this.handleNameChange} />
                    )}
                </Form.Item>

                <Form.Item label="Address"
                    validateStatus={this.state.address.validateStatus}
                    help={this.state.address.errorMsg}>

                    {getFieldDecorator('address', { initialValue: this.props.vendor.vendor.vendor_address }, {
                        rules: [{ required: true, message: 'Please input address!' }],
                    })(
                        <Input onChange={this.handleAddressChange} />
                    )}
                </Form.Item>
                <Form.Item label="Phone#"
                    validateStatus={this.state.phone.validateStatus}
                    help={this.state.phone.errorMsg}>

                    {getFieldDecorator('phone', { initialValue: this.props.vendor.vendor.vendor_phone }, {
                        rules: [{ required: true, message: 'Please input phone!' }],
                    })(
                        <Input onChange={this.handlePhoneChange} />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button style={{ float: 'right', marginLeft: 5 }} type="primary" htmlType="submit">Save</Button>
                    <Button style={{ float: 'right' }} type="danger" htmlType="button" onClick={this.props.handleCancel}>Cancel</Button>
                </Form.Item>
            </Form>
        );
    }
}

VendorForm.propTypes = {
    createUpdateVendor: PropTypes.func.isRequired,
    getVendorById: PropTypes.func.isRequired,
    getAllVendors: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    errors: state.errors,
    vendor: state.vendor
});
export default connect(mapStateToProps, { createUpdateVendor, getAllVendors, getVendorById })(Form.create({ name: 'vendor-form' })(VendorForm));
