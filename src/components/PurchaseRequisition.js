import React from "react";

import {
    Form, Input, Select, Button, AutoComplete, InputNumber, DatePicker,
} from 'antd';
import DefaultLayout from "./Layout/DefaultLayout";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class PurchaseRequisition extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
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
            console.log(autoCompleteResult)
        }
        this.setState({ autoCompleteResult });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
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
            <DefaultLayout title="Purchase Requisition">
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
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

                    <Form.Item label="Department" hasFeedback>
                        <Select placeholder="Please select a department">
                            <Option value="DPT-000001">Production Basic</Option>
                            <Option value="DPT-000002">Production Assembling</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Manufacturer">
                        <Select placeholder="Please select a manufacturer">
                            <Option value="china">China</Option>
                            <Option value="usa">U.S.A</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Quantity">
                        {getFieldDecorator('input-number', { initialValue: 1 })(
                            <InputNumber min={1} />
                        )}
                    </Form.Item>
                    <Form.Item label="Required By Date">
                        {getFieldDecorator('date-picker', config)(
                            <DatePicker />
                        )}
                    </Form.Item>
                    <Form.Item label="UOM">
                        <Input placeholder="UOM" disabled />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">Save</Button>
                    </Form.Item>
                </Form>
            </DefaultLayout>
        );
    }
}

export default Form.create({ name: 'purchase-requisition' })(PurchaseRequisition);