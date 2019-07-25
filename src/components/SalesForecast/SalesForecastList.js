import React from "react";
import { Table, Divider } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class SalesForecastList extends React.Component {
  state = {
    loading: false,
    visible: false,
    forecast_id: null,
    columns: [
      {
        title: "Name",
        dataIndex: "item_name",
        key: "item_name"
      }, {
        title: "Product code",
        dataIndex: "item_code",
        key: "item_code"
      }, {
        title: "Year",
        dataIndex: "year",
        key: "year"
      }, {
        title: "Jan",
        dataIndex: "jan",
        key: "jan"
      }, {
        title: "Feb",
        dataIndex: "feb",
        key: "feb"
      }, {
        title: "Mar",
        dataIndex: "mar",
        key: "mar"
      }, {
        title: "Apr",
        dataIndex: "apr",
        key: "apr"
      }, {
        title: "May",
        dataIndex: "may",
        key: "may"
      }, {
        title: "Jun",
        dataIndex: "jun",
        key: "jun"
      }, {
        title: "Jul",
        dataIndex: "jul",
        key: "jul"
      }, {
        title: "Aug",
        dataIndex: "aug",
        key: "aug"
      }, {
        title: "Sept",
        dataIndex: "sep",
        key: "sep"
      }, {
        title: "Oct",
        dataIndex: "oct",
        key: "oct"
      }, {
        title: "Nov",
        dataIndex: "nov",
        key: "nov"
      }, {
        title: "Dec",
        dataIndex: "dec",
        key: "dec"
      },
      {
        title: "Action",
        key: "action",
        dataIndex: "id",
        render: (text, record) => (
          <span>
            <a href="javascript:;" id={text} onClick={this.props.handleEditClick}>Edit</a>
            <Divider type="vertical" />
            <a href="javascript:;" id={text} onClick={this.props.handleDeleteClick}>Delete</a>
          </span>
        )
      }
    ]
  };

  render() {
    const { loading } = this.state;
    var rows = this.props.list.map((f) => {
      return (
        {
          key: f.forecast_id,
          id: f.forecast_id,
          item_name: f.item_name,
          item_code: f.item_code,
          year: f.year,
          jan: f.jan, feb: f.feb, mar: f.mar, apr: f.apr, may: f.may, jun: f.jun,
          jul: f.jul, aug: f.aug, sep: f.sep, oct: f.oct, nov: f.nov, dec: f.dec
        }

      )
    });

    return (
      <Table columns={this.state.columns} dataSource={rows} loading={loading} />
    );
  }
}

SalesForecastList.propTypes = {
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, {})(SalesForecastList);
