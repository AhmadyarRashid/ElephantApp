import React from "react";
import { Table } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const { Column, ColumnGroup } = Table;

class BOMItemList extends React.Component {
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
                    wastage_allowance: b.wastage_allowance,
                    qty_consumed: b.qty_consumed,
                    qty_to_be_issued: (b.qty_consumed + ((b.wastage_allowance / 100) * b.qty_consumed)).toFixed(2)
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
                    title="Material"
                    dataIndex="item_description"
                    key="description"
                />
                <Column
                    title="UOM"
                    dataIndex="item_unit"
                    key="item_unit"
                />
                <Column
                    title="Wastage Allowance %"
                    dataIndex="wastage_allowance"
                    key="wastage_allowance"
                />
                <ColumnGroup title="250 Dz">
                    <Column
                        title="Quantity to be Consumed"
                        dataIndex="qty_consumed"
                        key="qty_consumed"
                    />
                    <Column
                        title="Quantity to be Issued"
                        dataIndex="qty_to_be_issued"
                        key="qty_to_be_issued"
                    />
                </ColumnGroup>
            </Table>
        );
    }
}

BOMItemList.propTypes = {
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    errors: state.errors,
});

export default connect(mapStateToProps, {})(BOMItemList);
