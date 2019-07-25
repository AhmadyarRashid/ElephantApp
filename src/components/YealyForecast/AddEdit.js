import React from "react";
import { Form, Input, AutoComplete } from "antd";

const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = [".com", ".org", ".net"].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    const websiteOptions = autoCompleteResult.map(website => <AutoCompleteOption key={website}>{website}</AutoCompleteOption>);

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Name">
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "Please input your name"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Item No">
          {getFieldDecorator("itemNo", {
            rules: [
              {
                required: true,
                message: "Please input Item No!"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Website">
          {getFieldDecorator("website", {
            rules: [{ required: true, message: "Please input website!" }]
          })(
            <AutoComplete dataSource={websiteOptions} onChange={this.handleWebsiteChange} placeholder="website">
              <Input />
            </AutoComplete>
          )}
        </Form.Item>
      </Form>
    );
  }
}

const AddEdit = Form.create({ name: "register" })(RegistrationForm);

export default AddEdit;
