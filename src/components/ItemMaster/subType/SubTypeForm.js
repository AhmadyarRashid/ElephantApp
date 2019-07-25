import React from "react";
import { Form, Input, Button, Alert, Select, Modal } from 'antd';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createUpdateSubtype } from "../../../store/actions/subTypesAction";
import { getAllMaterialTypes } from "../../../store/actions/materialTypeAction";

const Option = Select.Option;

class SubTypeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            materialType: {},
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
                    this.props.createUpdateSubtype(values);
                }
            }
            else {
                this.setState({
                    errors: err
                })
            }
        });
    }

    onAlertClose = () => {
        this.setState({
            errors: ''
        });
    }

    componentDidMount() {
        this.props.getAllMaterialTypes();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.subtype.created !== this.props.subtype.created) {
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
        var name = this.validateTextField(values['sub_type_name']);
        var materialType = this.validateTextField(values['material_type_id']);

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

        if (materialType) {
            this.setState({
                materialType: {
                    validateStatus: 'success',
                    errorMsg: '',
                }
            })
        }
        else {
            this.setState({
                materialType: {
                    validateStatus: 'error',
                    errorMsg: 'Please input address!',
                }
            })
        }

        if (!materialType || !name) {
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
        var materialsddl = this.props.materialType.materialsList.map((mt) =>
            <Option value={mt.material_type_id} key={mt.material_type_id}>{mt.material_type_name}</Option>
        )
        return (
            <Modal
                visible={this.props.visible}
                title={this.props.modal_title}
                footer={null}
                closable
                onCancel={this.props.handleCancel}
                destroyOnClose
            >
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    {errorAlert}
                    <Form.Item>
                        {getFieldDecorator("sub_type_id", { initialValue: this.props.subtype.sub_type_id })(<Input hidden={true} />)}
                    </Form.Item>
                    <Form.Item label="Name"
                        validateStatus={this.state.name.validateStatus}
                        help={this.state.name.errorMsg}>

                        {getFieldDecorator('sub_type_name', { initialValue: this.props.subtype.sub_type_name }, {
                            rules: [{ required: true, message: 'Please input name!' }],
                        })(
                            <Input onChange={this.handleNameChange} />
                        )}
                    </Form.Item>
                    <Form.Item label="Material Type"
                        validateStatus={this.state.materialType.validateStatus}
                        help={this.state.materialType.errorMsg}>
                        {getFieldDecorator('material_type_id', { initialValue: this.props.subtype.material_type_id }, {
                            rules: [{ required: true, message: 'Please select material type!' }],
                        })(
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select a material type"
                                optionFilterProp="children"
                                onSelect={this.handleItemSelect}
                            >
                                {materialsddl}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button style={{ float: 'right', marginLeft: 5 }} type="primary" htmlType="submit">Save</Button>
                        <Button style={{ float: 'right' }} type="danger" htmlType="button" onClick={this.props.handleCancel}>Cancel</Button>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

SubTypeForm.propTypes = {
    createUpdateSubtype: PropTypes.func.isRequired,
    getAllMaterialTypes: PropTypes.func.isRequired,
    materialType: PropTypes.object.isRequired,
    subtype: PropTypes.object,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    errors: state.errors,
    materialType: state.materialType
});
export default connect(mapStateToProps, { createUpdateSubtype, getAllMaterialTypes })(Form.create({ name: 'SubTypeForm' })(SubTypeForm));