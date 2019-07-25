import React from "react";
import { Form, Input, Button, Alert, Modal } from 'antd';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createUpdateCategory } from "../../../store/actions/categoryAction";

class CategoryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {},
            errors: ''
        };
        this.validateFormFields = this.validateFormFields.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                //console.log('Received values of form: ', values);
                if (this.validateFormFields(values)) {
                    this.props.createUpdateCategory(values);
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.category.created) {
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
        var name = this.validateTextField(values['category_name']);

        if (name) {
            this.setState({
                name: {
                    validateStatus: 'success',
                    errorMsg: '',
                }
            });
            return true;
        }
        else {
            this.setState({
                name: {
                    validateStatus: 'error',
                    errorMsg: 'Please input name!',
                }
            })
            return false;
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
                        {getFieldDecorator("category_id", { initialValue: this.props.categoryObject.category_id })(<Input hidden={true} />)}
                    </Form.Item>
                    <Form.Item label="Name"
                        validateStatus={this.state.name.validateStatus}
                        help={this.state.name.errorMsg}>

                        {getFieldDecorator('category_name', { initialValue: this.props.categoryObject.category_name }, {
                            rules: [{ required: true, message: 'Please input name!' }],
                        })(
                            <Input onChange={this.handleNameChange} />
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

CategoryForm.propTypes = {
    createUpdateCategory: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    errors: state.errors,
    category: state.category
});
export default connect(mapStateToProps, { createUpdateCategory })(Form.create({ name: 'SubTypeForm' })(CategoryForm));