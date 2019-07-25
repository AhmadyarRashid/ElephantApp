import React from "react";
import { Table } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const { Column } = Table;

class ItemsList extends React.Component {
    state = {
        errors: ''
    };

    render() {
        const bomDetails = this.props.bomLine.map((b, index) => {
            return (
                {
                    key: b.bom_line_id,
                    s_no: index + 1,
                    item_number: b.item_number,
                    item_description: b.item_description,
                    item_unit: b.item_unit,                    
                }
            )
        })

        return (
            <Table dataSource={bomDetails} bordered>
                <Column
                    title="S No"
                    dataIndex="s_no"
                    key="s_no"
                />
                <Column
                    title="Item No"
                    dataIndex="item_number"
                    key="item_number"
                />
                <Column
                    title="Product Description"
                    dataIndex="item_description"
                    key="description"
                />
                <Column
                    title="Manufacturer"
                    dataIndex="item_description"
                    key="description"
                />
                <Column
                    title="Quantity"
                    dataIndex="quantity"
                    key="quantity"
                />
                <Column
                    title="UOM"
                    dataIndex="item_unit"
                    key="item_unit"
                />
                <Column
                    title="Required by Date"
                    dataIndex="rqd_by_date"
                    key="rqd_by_date"
                />
            </Table>
        );
    }
}

ItemsList.propTypes = {
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    errors: state.errors,
});

export default connect(mapStateToProps, {})(ItemsList);
