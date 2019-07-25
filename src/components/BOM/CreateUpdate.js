import React from "react";
// import DefaultLayout from "../Layout/DefaultLayout";
import { Form, Select, Input, Button, InputNumber, Table, Divider, Alert, Modal } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchFinishedProducts } from "../../store/actions/itemsAction";
import { createUpdateBOM, getBOMLineById } from "../../store/actions/bomAction";
const Option = Select.Option;
const confirm = Modal.confirm;

class CreateUpdateBOM extends React.Component {
    state = {
        errors: '',
        name: {},
        is_editing: false,
        columns: [{
            title: 'Item Number',
            dataIndex: 'item_number'
        }, {
            title: 'Material',
            className: 'item_description',
            dataIndex: 'item_description',
        }, {
            title: 'Wastage Allowance',
            dataIndex: 'wastage_allowance',
        }, {
            title: 'Qty to be Consumed',
            dataIndex: 'qty_consumed',
        },
        {
            title: "Action",
            key: "action",
            dataIndex: "bom_line_id",
            render: (text, record) => (
                <span>
                    <a href="javascript:;" id={text} onClick={this.onEditClick}>Edit</a>
                    <Divider type="vertical" />
                    <a href="javascript:;" id={text} onClick={this.deleteConfirm}>Delete</a>
                </span>
            )
        }]
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                if (this.props.bom_type === 1) {
                    values.bom_item_id = this.props.selected_id
                }
                else {
                    values.bom_category_id = this.props.selected_id
                }
                this.props.createUpdateBOM(values)
            }
        });
    };

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.bom.created !== this.props.bom.created) {
            this.props.onCreateSuccess();
            this.props.form.resetFields();
            this.setState({
                is_editing: false
            })
            this.props.getBOMLineById();
        }
    }

    onEditClick = (e) => {
        this.setState({
            is_editing: true
        })
        this.props.getBOMLineById(e.target.id);
    }

    // onDeleteClick = (e) => {
    //     this.props.handleDelete(e.target.id);
    // }

    deleteConfirm = (e) => {
        var deleteId = e.target.id;
        var prop = this.props;
        confirm({
            title: 'Delete Item',
            content: 'Do you want to delete this item ?',
            onOk() {
                prop.handleDelete(deleteId);
            },
            onCancel() { },
        });
    }

    handleCancel = (e) => {
        this.props.getBOMLineById();
    }

    handleItemChange = value => {
        this.props.searchFinishedProducts(value);
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        var errorAlert = this.state.errors.length > 0 ? <Alert message={this.state.errors} closable onClose={this.onAlertClose} type="error" showIcon /> : '';

        const bomDetails = this.props.bomLine.map((b, index) => {
            return (
                {
                    key: b.bom_line_id,
                    bom_line_id: b.bom_line_id,
                    item_number: b.item_number,
                    item_description: b.item_description,
                    wastage_allowance: b.wastage_allowance,
                    qty_consumed: b.qty_consumed,
                }
            )
        })
        const itemSelectChildren = this.state.is_editing ? <Option value={this.props.bom.bomLineById.item_id} key={this.props.bom.bomLineById.item_id}>{this.props.bom.bomLineById.item_name}</Option> :
            this.props.item.searchResults.map(item => <Option value={item.item_id} key={item.item_id}>{item.item_name}</Option>);

        return (
            <div>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    {errorAlert}
                    <Form.Item>
                        {getFieldDecorator("bom_line_id", { initialValue: this.props.bom.bomLineById.bom_line_id })(<Input hidden={true} />)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('item_id', { initialValue: this.props.bom.bomLineById.item_id })(
                            <Select
                                showSearch
                                style={{ width: 180 }}
                                placeholder="Select an item"
                                optionFilterProp="children"
                                onSearch={this.handleItemChange}
                                defaultActiveFirstOption
                            >
                                {itemSelectChildren}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item
                        validateStatus={this.state.name.validateStatus}
                        help={this.state.name.errorMsg}>

                        {getFieldDecorator('wastage_allowance', { initialValue: this.props.bom.bomLineById.wastage_allowance }, {
                            rules: [{ required: true, message: 'Please input wastage allowance!' }],
                        })(
                            <InputNumber style={{ width: 160 }} onChange={this.handleNameChange} placeholder="Wastage Allowance" />
                        )}
                    </Form.Item>
                    <Form.Item
                        validateStatus={this.state.name.validateStatus}
                        help={this.state.name.errorMsg}>

                        {getFieldDecorator('qty_consumed', { initialValue: this.props.bom.bomLineById.qty_consumed }, {
                            rules: [{ required: true, message: 'Please input qty!' }],
                        })(
                            <InputNumber style={{ width: 180 }} onChange={this.handleNameChange} placeholder="Quatity to be consumed" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button style={{ float: 'right', marginLeft: 5 }} type="primary" htmlType="submit">Save</Button>
                        <Button style={{ float: 'right' }} type="danger" htmlType="button" onClick={this.handleCancel}>Cancel</Button>
                    </Form.Item>
                </Form>

                <Table
                    columns={this.state.columns}
                    dataSource={bomDetails}
                    bordered
                />
            </div>
        );
    }
}

CreateUpdateBOM.propTypes = {
    createUpdateBOM: PropTypes.func.isRequired,
    searchFinishedProducts: PropTypes.func.isRequired,
    bom: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    errors: state.errors,
    item: state.item,
    bom: state.bom
});

export default connect(mapStateToProps, { createUpdateBOM, getBOMLineById, searchFinishedProducts })(Form.create({ name: "forecast" })(CreateUpdateBOM));
