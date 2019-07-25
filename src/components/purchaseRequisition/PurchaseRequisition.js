import React from "react";
import DefaultLayout from "../Layout/DefaultLayout";
import ItemsList from './ItemsList'
import { Form, Button, Select, Radio, Icon } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchFinishedProducts } from "../../store/actions/itemsAction";
import { getAllCategories } from "../../store/actions/categoryAction";
import { getItemBOM, getNonSpecificBOM, getBOMLineById } from "../../store/actions/bomAction";
import './style.css'

const Option = Select.Option;

class ViewBOM extends React.Component {
    state = {
        confirmDirty: false,
        errors: '',
        can_print: false
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                //console.log("Received values of form: ", values);
                this.props.getItemBOM(values['item_id']);
                this.setState({
                    can_print: true
                })
            }
        });
    };

    componentDidMount() {

    }

    handleItemSearch = value => {
        this.props.searchFinishedProducts(value);
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const ddlChildren = this.props.item.searchResults.map(item => <Option value={item.item_id} key={item.item_id}>{item.item_name}</Option>);

        return (
            <DefaultLayout title="Purchase Requisition">
                <div className="form-container">
                    <div className="inner">
                        <Form layout="inline" onSubmit={this.handleSubmit}>
                            <Form.Item label="Item">
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
                            </Form.Item>
                            <Button key="submit" htmlType="submit" type="primary">Search</Button>
                        </Form>
                    </div>
                </div>

                <div className="search-result-list">
                    <Button className="btnPrint" key="" htmlType="button" type="primary" onClick={this.openCreateForm} disabled={!this.state.can_print}
                    ><Icon theme={"filled"} type="printer" />Print</Button>

                    <ItemsList bomLine={this.props.bom.bomLine}></ItemsList>
                </div>
            </DefaultLayout>
        );
    }
}

ViewBOM.propTypes = {
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
    })(Form.create({ name: "bom" })(ViewBOM));
