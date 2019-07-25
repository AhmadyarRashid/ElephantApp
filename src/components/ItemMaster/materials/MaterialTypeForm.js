import React from "react";
import { Form, Input, Button, Alert, Select, Modal } from 'antd';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createUpdateMaterialType } from "../../../store/actions/materialTypeAction";
import { getAllCategories } from "../../../store/actions/categoryAction";

const Option = Select.Option;

class MaterialTypeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: {},
            name: {},
            errors: ''
        };
        this.validateFormFields = this.validateFormFields.bind(this);
        this.validateTextField = this.validateTextField.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                //console.log('Received values of form: ', values);
                if (this.validateFormFields(values)) {
                    this.props.createUpdateMaterialType(values);
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
        this.props.getAllCategories();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.materialType.created !== this.props.materialType.created) {
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
        var name = this.validateTextField(values['material_type_name']);
        var category = this.validateTextField(values['category_id']);

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

        if (category) {
            this.setState({
                category: {
                    validateStatus: 'success',
                    errorMsg: '',
                }
            })
        }
        else {
            this.setState({
                category: {
                    validateStatus: 'error',
                    errorMsg: 'Please select category!',
                }
            })
        }

        if (!category || !name) {
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

    handleCategoryChange(value) {
        if (this.validateTextField(value)) {
            this.setState({
                category: {
                    validateStatus: 'success',
                    errorMsg: '',
                }
            })
        }
        else {
            this.setState({
                category: {
                    validateStatus: 'error',
                    errorMsg: 'Please select category!',
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
        var categoriesddl = this.props.category.categoryList.map((mt) =>
            <Option value={mt.category_id} key={mt.category_id}>{mt.category_name}</Option>
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
                        {getFieldDecorator("material_type_id", { initialValue: this.props.material.material_type_id })(<Input hidden={true} />)}
                    </Form.Item>
                    <Form.Item label="Name"
                        validateStatus={this.state.name.validateStatus}
                        help={this.state.name.errorMsg}>

                        {getFieldDecorator('material_type_name', { initialValue: this.props.material.material_type_name }, {
                            rules: [{ required: true, message: 'Please input name!' }],
                        })(
                            <Input onChange={this.handleNameChange} />
                        )}
                    </Form.Item>
                    <Form.Item label="Category"
                        validateStatus={this.state.category.validateStatus}
                        help={this.state.category.errorMsg}>
                        {getFieldDecorator('category_id', { initialValue: this.props.material.category_id }, {
                            rules: [{ required: true, message: 'Please select category!' }],
                        })(
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select a category"
                                optionFilterProp="children"
                                onSelect={this.handleCategoryChange}
                            >
                                {categoriesddl}
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

MaterialTypeForm.propTypes = {
    createUpdateMaterialType: PropTypes.func.isRequired,
    getAllCategories: PropTypes.func.isRequired,
    materialType: PropTypes.object.isRequired,
    materialsList: PropTypes.array,
    material: PropTypes.object,
    category: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    errors: state.errors,
    category: state.category,
    materialType: state.materialType
});
export default connect(mapStateToProps,
    { createUpdateMaterialType, getAllCategories })(Form.create({ name: 'SubTypeForm' })(MaterialTypeForm));