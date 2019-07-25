import React from "react";
import { Form, Input, InputNumber, Button, Row, Col, Alert, Select } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createUpdateForecast, searchFinishedProducts, getSalesForecastById } from "../../store/actions/itemsAction";

const Option = Select.Option;
class SalesForecastForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      errors: '',
      item: {},
      year: {},
      current_year: '',
      isFormValid: false
    };
    this.validateItemField = this.validateItemField.bind(this);
    this.handleItemSelect = this.handleItemSelect.bind(this);
    this.handleChangeYear = this.handleChangeYear.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        if (this.validateFormFields(values)) {
          values.business_type = this.props.type;
          this.props.createUpdateForecast(values);
        }
      }
    });
  };

  componentDidMount() {
    this.props.getSalesForecastById(this.props.forecast_id);
  }

  handleCancel = () => {
    this.props.form.resetFields();
    this.props.handleCancel();
    this.setState({
      errors: ''
    })
  };

  handleItemChange = value => {
    this.props.searchFinishedProducts(value);
  };

  componentWillReceiveProps(nextProps) {    
    if (nextProps.item.created !== this.props.item.created) {
      this.props.form.resetFields();
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
    var item = this.validateItemField(values['item_id']);
    var year = this.validateYearField(values['year']);

    if (item) {
      this.setState({
        item: {
          validateStatus: 'success',
          errorMsg: '',
        }
      })
    }
    else {
      this.setState({
        item: {
          validateStatus: 'error',
          errorMsg: 'Please select an item!',
        }
      })
    }

    if (year) {
      this.setState({
        year: {
          validateStatus: 'success',
          errorMsg: '',
        }
      })
    }
    else {
      this.setState({
        year: {
          validateStatus: 'error',
          errorMsg: 'Please select an item!',
        }
      })
    }
    if (!item || !year) {
      return false;
    }
    else {
      return true;
    }
  }

  handleItemSelect(value) {
    if (this.validateFormField(value)) {
      this.setState({
        item: {
          validateStatus: 'success',
          errorMsg: '',
        }
      })
    }
    else {
      this.setState({
        item: {
          validateStatus: 'error',
          errorMsg: 'Please input address!',
        }
      })
    }
  }

  handleChangeYear(value) {
    if (this.validateFormField(value)) {
      this.setState({
        year: {
          validateStatus: 'success',
          errorMsg: '',
        }
      })
    }
    else {
      this.setState({
        year: {
          validateStatus: 'error',
          errorMsg: 'Please input address!',
        }
      })
    }
  }

  validateItemField(value) {
    if (value === undefined || value === '' || value === null) {
      return false;
    }
    return true;
  }

  validateYearField(value) {
    if (value === undefined || value === '' || value === null) {
      return false;
    }
    return true;
  }

  validateFormField(value) {
    if (value === undefined || value === '' || value === null) {
      return false;
    }
    return true;
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    var errorAlert = this.state.errors.length > 0 ? <Alert message={this.state.errors} closable onClose={this.onAlertClose} type="error" showIcon /> : '';
    const ddlChildren = this.props.forecast_id ? <Option value={this.props.item.forecast.item_id} key={this.props.item.forecast.item_id}>{this.props.item.forecast.item_name}</Option> :
      this.props.item.searchResults.map(item => <Option value={item.item_id} key={item.item_id}>{item.item_name}</Option>);
      
    let defaultYear = this.props.item.forecast.year ? this.props.item.forecast.year : new Date().getFullYear();
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        {errorAlert}
        <Form.Item>
          {getFieldDecorator("forecast_id", { initialValue: this.props.forecast_id })(<Input hidden={true} />)}
        </Form.Item>
        <Row>
          <Col sm={14} xs={12}>
            <Form.Item label="Item"
              validateStatus={this.state.item.validateStatus}
              help={this.state.item.errorMsg}>
              {getFieldDecorator('item_id', { initialValue: this.props.item.forecast.item_id }, {
                rules: [{ required: true, message: 'Please select item!' }],
              })(
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select a item"
                  optionFilterProp="children"
                  onSearch={this.handleItemChange}
                  defaultActiveFirstOption
                  onSelect={this.handleItemSelect}
                >
                  {ddlChildren}
                </Select>
              )}
            </Form.Item>

          </Col>
          <Col className="gutter" sm={10} xs={24}>
            <Form.Item label="Year"
              validateStatus={this.state.year.validateStatus}
              help={this.state.year.errorMsg}
            >
              {getFieldDecorator("year", { initialValue: defaultYear }, {
                rules: [
                  {
                    required: true,
                    message: "Please input forecast year !"
                  }
                ]
              })(<InputNumber min={0} onChange={this.handleChangeYear} />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col className="gutter-row" sm={6} xs={12}>
            <Form.Item>
              {getFieldDecorator("jan", { initialValue: this.props.item.forecast.jan })(<InputNumber min={0} placeholder="January" />)}
            </Form.Item>
          </Col>
          <Col className="gutter-row" sm={6} xs={12}>
            <Form.Item>
              {getFieldDecorator("feb", { initialValue: this.props.item.forecast.feb })(<InputNumber min={0} placeholder="February" />)}
            </Form.Item>
          </Col>
          <Col className="gutter-row" sm={6} xs={12}>
            <Form.Item >
              {getFieldDecorator("mar", { initialValue: this.props.item.forecast.mar })(<InputNumber min={0} placeholder="March" />)}
            </Form.Item>
          </Col>
          <Col className="gutter-row" sm={6} xs={12}>
            <Form.Item >
              {getFieldDecorator("apr", { initialValue: this.props.item.forecast.apr })(<InputNumber min={0} placeholder="April" />)}
            </Form.Item>
          </Col>
          <Col className="gutter-row" sm={6} xs={12}>
            <Form.Item >
              {getFieldDecorator("may", { initialValue: this.props.item.forecast.may })(<InputNumber min={0} placeholder="May" />)}
            </Form.Item>
          </Col>
          <Col className="gutter-row" sm={6} xs={12}>
            <Form.Item >
              {getFieldDecorator("jun", { initialValue: this.props.item.forecast.jun })(<InputNumber min={0} placeholder="June" />)}
            </Form.Item>
          </Col>
          <Col className="gutter-row" sm={6} xs={12}>
            <Form.Item >
              {getFieldDecorator("jul", { initialValue: this.props.item.forecast.jul })(<InputNumber min={0} placeholder="July" />)}
            </Form.Item>
          </Col>
          <Col className="gutter-row" sm={6} xs={12}>
            <Form.Item >
              {getFieldDecorator("aug", { initialValue: this.props.item.forecast.aug })(<InputNumber min={0} placeholder="August" />)}
            </Form.Item>
          </Col>
          <Col className="gutter-row" sm={6} xs={12}>
            <Form.Item >
              {getFieldDecorator("sep", { initialValue: this.props.item.forecast.sep })(<InputNumber min={0} placeholder="September" />)}
            </Form.Item>
          </Col>
          <Col className="gutter-row" sm={6} xs={12}>
            <Form.Item >
              {getFieldDecorator("oct", { initialValue: this.props.item.forecast.oct })(<InputNumber min={0} placeholder="October" />)}
            </Form.Item>
          </Col>
          <Col className="gutter-row" sm={6} xs={12}>
            <Form.Item >
              {getFieldDecorator("nov", { initialValue: this.props.item.forecast.nov })(<InputNumber min={0} placeholder="November" />)}
            </Form.Item>
          </Col>
          <Col className="gutter-row" sm={6} xs={12}>
            <Form.Item >
              {getFieldDecorator("dec", { initialValue: this.props.item.forecast.dec })(<InputNumber min={0} placeholder="December" />)}
            </Form.Item>
          </Col>
        </Row>
        <Button key="back" htmlType="button" onClick={this.handleCancel}>
          Cancel
            </Button>
        <Button key="submit" htmlType="submit" type="primary">Submit</Button>
      </Form>
    );
  }
}


SalesForecastForm.propTypes = {
  createUpdateForecast: PropTypes.func.isRequired,
  getSalesForecastById: PropTypes.func.isRequired,
  searchFinishedProducts: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors,
  item: state.item
});

export default connect(mapStateToProps, { createUpdateForecast, searchFinishedProducts, getSalesForecastById })(Form.create({ name: "forecast" })(SalesForecastForm));
