import React from "react";

import {
    Form, Input, Select, Button, AutoComplete, InputNumber, DatePicker, Row, Col,
} from 'antd';
import DefaultLayout from "./Layout/DefaultLayout";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class MaterialEntry extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (!err) {
                const values = {
                    ...fieldsValue,
                    'required_by_date': fieldsValue['required_by_date'].format('DD-MM-YYYY'),
                    'mfg_date': fieldsValue['mfg_date'].format('MMM-YY'),
                    'exp_data': fieldsValue['exp_date'].format('MMM-YY'),
                };

                console.log('Received values of form: ', values);
            }
        });
    }

    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['Raw Casing', 'Raw Ribbons', 'Needles', 'Silk Reels'].filter(domain => {
                return domain.toLowerCase().includes(value.toLowerCase())
            });
        }
        this.setState({ autoCompleteResult });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 15 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 4,
                },
            },
        };

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select date!' }],
        };
        return (
            <DefaultLayout title="Material Entry">
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Row>
                        <Col className="gutter-row" sm={12} xs={24}>
                            <Form.Item label="Invoice No">
                                {getFieldDecorator("invoiceNo", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please input Invoice No!"
                                        }
                                    ]
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" sm={12} xs={24}>
                            <Form.Item label="Delivery Challan No">
                                {getFieldDecorator("deliveryChallanNo", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please input Delivery Challan No!"
                                        }
                                    ]
                                })(<Input />)}
                            </Form.Item>
                        </Col>

                        <Col className="gutter-row" sm={12} xs={24}>
                            <Form.Item label="Purchase Order No">
                                {getFieldDecorator("purchaseOrderNo", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please input Purchase Order No!"
                                        }
                                    ]
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" sm={12} xs={24}>
                            <Form.Item label="Receiving Date">
                                {getFieldDecorator('receiving_date', config)(
                                    <DatePicker format="DD-MM-YYYY" />
                                )}
                            </Form.Item>
                        </Col>

                        <Col className="gutter-row" sm={12} xs={24}>
                            <Form.Item label="Supplier" hasFeedback>
                                <Select placeholder="Please select a supplier">
                                    <Option value="DPT-000001">Production Basic</Option>
                                    <Option value="DPT-000002">Production Assembling</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" sm={12} xs={24}>
                            <Form.Item label="Item">
                                {getFieldDecorator('item', {
                                    rules: [{ required: true, message: 'Please select item!' }],
                                })(
                                    <AutoComplete
                                        dataSource={websiteOptions}
                                        onChange={this.handleWebsiteChange}
                                        placeholder="item"
                                    >
                                        <Input />
                                    </AutoComplete>
                                )}
                            </Form.Item>
                        </Col>

                        <Col className="gutter-row" sm={12} xs={24}>
                            <Form.Item label="Manufacturer" hasFeedback>
                                <Select placeholder="Please select a manufacturer">
                                    <Option value="china">China</Option>
                                    <Option value="usa">USA</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col className="gutter-row" sm={12} xs={24}>
                            <Form.Item label="Description">
                                {getFieldDecorator("description", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please input Description!"
                                        }
                                    ]
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" sm={12} xs={24}>
                            <Form.Item label="Lot No/ Batch No">
                                {getFieldDecorator("batchNo", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please input Batch No!"
                                        }
                                    ]
                                })(<Input />)}
                            </Form.Item>
                        </Col>

                        <Col className="gutter-row" sm={12} xs={24}>
                            <Form.Item label="Mode of packing">
                                {getFieldDecorator("mode_of_packing", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please input Mode of packing!"
                                        }
                                    ]
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" sm={12} xs={24}>
                            <Form.Item label="Order Quantity">
                                {getFieldDecorator("order_quantity", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please input Order Quantity!"
                                        }
                                    ]
                                })(<InputNumber />)}
                            </Form.Item>
                        </Col>

                        <Col className="gutter-row" sm={12} xs={24}>
                            <Form.Item label="Recived Quantity">
                                {getFieldDecorator("recived_quantity", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please input Recived Quantity!"
                                        }
                                    ]
                                })(<InputNumber />)}
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" sm={12} xs={24}>
                            <Form.Item label="No of Rolls / Bags">
                                {getFieldDecorator("no_of_bags", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please input No of Rolls!"
                                        }
                                    ]
                                })(<InputNumber />)}
                            </Form.Item>
                        </Col>

                        <Col className="gutter-row" sm={12} xs={24}>
                            <Form.Item label="MFG Date">
                                {getFieldDecorator('mfg_date', config)(
                                    <DatePicker format="DD-MM-YYYY" />
                                )}
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" sm={12} xs={24}>
                            <Form.Item label="Exp Date">
                                {getFieldDecorator('exp_date', config)(
                                    <DatePicker format="DD-MM-YYYY" />
                                )}
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" sm={12} xs={24}>
                            <Form.Item label="Remarks">
                                {getFieldDecorator("remarks", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please input remarks!"
                                        }
                                    ]
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">Save</Button>
                    </Form.Item>
                </Form>
            </DefaultLayout>
        );
    }
}

export default Form.create({ name: 'material-entry' })(MaterialEntry);