import React from "react";
import DefaultLayout from "../Layout/DefaultLayout";
import SalesForecastForm from "./SalesForecastForm";
import SalesForecastList from './SalesForecastList'
import { Modal, Button } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { capitalizeFirstLetter } from '../../utils/utils'
import { getAllSalesForecasts, deleteSalesForecast, getForecastItemSummary } from "../../store/actions/itemsAction";
const confirm = Modal.confirm;
class SalesForecast extends React.Component {
  state = {
    loading: false,
    visible: false,
    forecast_id: null,
    type: ''
  };

  componentDidMount() {
    // this.setState({
    //   type: this.props.match.params.type
    // });
    // this.props.getAllSalesForecasts(this.props.match.params.type);
    // this.props.getForecastItemSummary(this.props.match.params.type);
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleSuccess = () => {
    this.closeModal();
    this.props.getAllSalesForecasts(this.props.match.params.type);
    this.props.getForecastItemSummary(this.props.match.params.type);
  };

  onEditClick = (e) => {
    this.showModal();
    this.setState({ forecast_id: e.target.id })
  }

  deleteConfirm = (e) => {
    var deleteId = e.target.id;
    var prop = this.props;
    confirm({
      title: 'Delete Forecast',
      content: 'Do you want to delete this forecast ?',
      onOk() {
        prop.deleteSalesForecast(deleteId);
      },
      onCancel() { },
    });
  }

  closeModal = () => {
    this.setState({ loading: false, visible: false, forecast_id: null });
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.type !== nextProps.match.params.type) {
      this.setState({
        type: this.props.match.params.type
      });
    }
  }

  render() {
    const { visible, loading } = this.state;
    if (this.state.type !== this.props.match.params.type) {      
      this.props.getAllSalesForecasts(this.props.match.params.type);
      this.props.getForecastItemSummary(this.props.match.params.type);
    }
    return (
      <DefaultLayout title={capitalizeFirstLetter(this.props.match.params.type) + " Forecast"}>
        <Button type="primary" onClick={this.showModal}>
          Add
        </Button>
        <div style={{ float: "right" }}>
          {/* Total Items : {this.props.forecast_summary.total_items} -  */}
          Forecast left: {this.props.forecast_summary.total_items - this.props.forecast_summary.total_forecasts}
        </div>
        <Modal
          visible={visible}
          title="Add Forecast"
          footer={null}
          closable
          onCancel={this.closeModal}
          destroyOnClose
        >
          <SalesForecastForm
            handleSuccess={this.handleSuccess}
            handleCancel={this.closeModal}
            visible={this.state.visible}
            forecast_id={this.state.forecast_id}
            type={this.props.match.params.type}
          />
        </Modal>
        <SalesForecastList list={this.props.forecasts} handleEditClick={this.onEditClick}
          handleDeleteClick={this.deleteConfirm}
        ></SalesForecastList>
      </DefaultLayout>
    );
  }
}

SalesForecast.propTypes = {
  getAllSalesForecasts: PropTypes.func.isRequired,
  deleteSalesForecast: PropTypes.func.isRequired,
  forecasts: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors,
  forecasts: state.item.forecasts,
  forecast_summary: state.item.forecast_summary
});

export default connect(mapStateToProps, { getAllSalesForecasts, deleteSalesForecast, getForecastItemSummary })(SalesForecast);
