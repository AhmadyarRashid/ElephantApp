import React from "react";
import DefaultLayout from "./Layout/DefaultLayout";
import BOMItemList from './BOMItemList'
import CreateUpdate from './CreateUpdate'
import { Form, Button, Select, Radio, Modal } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchFinishedProducts } from "../../store/actions/itemsAction";
import { getAllCategories } from "../../store/actions/categoryAction";
import { getItemBOM, getNonSpecificBOM, getBOMLineById } from "../../store/actions/bomAction";
import './style.css'

const Option = Select.Option;

class PurchaseRequisitionForm extends React.Component {
    state = {
        type: 1,
        confirmDirty: false,
        errors: '',
        visible: false,
        modal_title: 'Add New',
        selected_id: null,
        can_update_bom: false
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                //console.log("Received values of form: ", values);
                if (this.state.type === 1) {
                    this.props.getItemBOM(values['item_id']);
                    this.setState({
                        selected_id: values['item_id']
                    })
                }
                else {
                    this.props.getNonSpecificBOM(values['category_id']);
                    this.setState({
                        selected_id: values['category_id']
                    })
                }
                this.setState({
                    can_update_bom: true
                })
            }
        });
    };

    onCreateSuccess = (e) => {
        if (this.state.type === 1) {
            this.props.getItemBOM(this.state.selected_id);
        }
        else {
            this.props.getNonSpecificBOM(this.state.selected_id);
        }
    }

    componentDidMount() {
        this.props.getAllCategories();
    }

    handleItemSearch = value => {
        this.props.searchFinishedProducts(value);
    };

    onRadionChange = (e) => {
        this.setState({
            type: e.target.value,
            can_update_bom: false
        })
    }

    handleCancel = (e) => {
        this.setState({
            visible: false
        })
        this.props.getBOMLineById();
    }
    openCreateForm = (e) => {
        this.setState({
            visible: true
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const ddlChildren = this.props.item.searchResults.map(item => <Option value={item.item_id} key={item.item_id}>{item.item_name}</Option>);
        const categoryddl = this.props.category.categoryList.map(c => <Option value={c.category_id} key={c.category_id}>{c.category_name}</Option>);

        const form = this.state.type === 1 ? <Form.Item label="Item">
            {getFieldDecorator('item_id', { rules: [{ required: true, message: 'Please select an item!' }] })(
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a item"
                    optionFilterProp="children"
                    onSearch={this.handleItemSearch}
                    defaultActiveFirstOption
                >
                    {ddlChildren}
                </Select>
            )}
        </Form.Item> : <Form.Item label="Category">
                {getFieldDecorator('category_id', { rules: [{ required: true, message: 'Please select a category!' }] })(
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select a category"
                        optionFilterProp="children"
                        defaultActiveFirstOption
                    >
                        {categoryddl}
                    </Select>
                )}
            </Form.Item>
        return (
            <DefaultLayout title="View Bill of Material">
                <div className="form-container">
                    <div className="inner">
                        <Form layout="inline" onSubmit={this.handleSubmit}>
                            {form}
                            <Button key="submit" htmlType="submit" type="primary">Search</Button>
                        </Form>
                        <Form.Item className="radios">
                            {getFieldDecorator('radio-group', { initialValue: 1 })(
                                <Radio.Group onChange={this.onRadionChange}>
                                    <Radio value={1}>Specific</Radio>
                                    <Radio value={2}>Non Specific</Radio>
                                </Radio.Group>
                            )}
                        </Form.Item>
                    </div>
                </div>

                <div className="search-result-list">
                    <Button key="" htmlType="button" type="primary" onClick={this.openCreateForm} disabled={!this.state.can_update_bom}>Create New</Button>

                    <BOMItemList bomLine={this.props.bom.bomLine}></BOMItemList>
                </div>
                <Modal
                    visible={this.state.visible}
                    title={this.state.modal_title}
                    footer={null}
                    closable
                    onCancel={this.handleCancel}
                    destroyOnClose
                    width={800}
                >
                    <CreateUpdate
                        bom_type={this.state.type}
                        selected_id={this.state.selected_id}
                        bomLine={this.props.bom.bomLine}
                        onCreateSuccess={this.onCreateSuccess}
                        onCancel={this.handleCancel}
                    ></CreateUpdate>
                </Modal>
            </DefaultLayout>
        );
    }
}

PurchaseRequisitionForm.propTypes = {
    getItemBOM: PropTypes.func.isRequired,
    getNonSpecificBOM: PropTypes.func.isRequired,
    searchFinishedProducts: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    errors: state.errors,
    item: state.item,
    bom: state.bom,
    category: state.category
});

export default connect(mapStateToProps,
    {
        getItemBOM, searchFinishedProducts, getBOMLineById,
        getNonSpecificBOM, getAllCategories
    })(Form.create({ name: "purchase-requisition" })(PurchaseRequisitionForm));
