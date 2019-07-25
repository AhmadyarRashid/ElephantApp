import React, { Component } from 'react';
import DefaultLayout from "./Layout/DefaultLayout";
import { Table } from "antd";
import axios from 'axios';
import { Form, Icon, Input, Button, Menu, Dropdown, Modal } from 'antd';

const { Column, ColumnGroup } = Table;

class Questions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: [],
            flow: [],
            questionFlow: 1,
            visible: false,
            userId :1
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.form.validateFields();
        axios
            .get('http://system.elepha.io/api/v1/question/')
            .then(res => {
                if (res) {
                    // console.log(res);
                    this.setState({
                        questions: res.data
                    })
                }
            })
            .catch(e => {
                console.log(e)
            });

        axios.get('http://system.elepha.io/api/v1/questionflow/')
            .then(res => {
                if (res) {
                    console.log(res);
                    this.setState({
                        flow: res.data
                    })
                }
            }).catch(e => {
                console.log(e)
            })

    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { Label, Type, Meta } = values;
                console.log('Received values of form: ', values);
                let userId;
                try {
                    userId = localStorage.getItem('user_id');
                    this.setState({
                        userId 
                    })
                } catch (e) {
                    userId = 1
                }
                axios
                    .post('http://system.elepha.io/api/v1/question/', {
                        "label": Label,
                        "type": Type,
                        "meta": Meta,
                        "questionflow": this.state.questionFlow,
                        "elephauser": userId
                    })
                    .then(res => {
                        alert('Add Sucessfully');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        });
    }

    handlerMenu(e) {
        console.log(e.key);
        this.setState({
            questionFlow: e.key
        })
        axios
            .get('http://system.elepha.io/api/v1/question/')
            .then(res => {
                if (res) {
                    // console.log(res);
                    const filterData = res.data.filter(i => i.questionflow == e.key);
                    this.setState({
                        questions: filterData
                    })
                }
            })
            .catch(e => {
                console.log(e)
            });
    }

    handleModal(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios
                .post('http://system.elepha.io/api/v1/questionflow/', {
                    "name" : values['Name'],
                    "description" : values['Description'],
                    "elephauser" : this.state.userId
                })
                .then(res => {
                    if(res){
                        alert('Add Sucessfully');
                        this.handleOk();
                    }
                })
                .catch(e => {
                    console.log(e);
                })
            }
        })
    }


    render() {

        const menu1 = this.state.flow.map(i => (
            <Menu.Item key={i.pk} onClick={(e) => this.handlerMenu(e)}>
                <p>{i.name}</p>
            </Menu.Item>
        ));

        const { getFieldDecorator } = this.props.form;
        const data = this.state.questions.map((item, i) => ({
            id: i + 1,
            label: item.label,
            type: item.type,
            tag: item.tag,
            meta: item.meta
        }));


        return (
            <DefaultLayout title="Flow">
                <Dropdown overlay={<Menu>{menu1}</Menu>} >
                    <a className="ant-dropdown-link" href="#">
                        Select Campigns <Icon type="down" />
                    </a>
                </Dropdown>
                <Button type="primary" onClick={() => this.showModal()}>
                    +
                </Button>

                <Table dataSource={data} bordered className="table-responsive table-responsive-md">
                    <Column
                        title="key"
                        dataIndex="id"
                        key="id"
                    />
                    <Column
                        title="Label"
                        dataIndex="label"
                        key="label"
                    />
                    <Column
                        title="Type"
                        dataIndex="type"
                        key="type"
                    />
                    <Column
                        title="Meta"
                        dataIndex="meta"
                        key="meta"
                    />

                </Table>

                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('Label', { initialValue: '' }, {
                            rules: [{ required: true, message: 'Please input Label!' }],
                        })(
                            <Input
                                placeholder="Label"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('Type', { initialValue: '' }, {
                            rules: [{ required: true, message: 'Please input Tag!' }],
                        })(
                            <Input
                                placeholder="Type"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('Meta', { initialValue: '' }, {
                            rules: [{ required: true, message: 'Please input Meta!' }],
                        })(
                            <Input
                                placeholder="Tag"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" >
                            Add
                        </Button>
                    </Form.Item>
                </Form>

                <Modal
                    title="Add Question Flow"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                >
                    <Form layout="inline" onSubmit={(e) => this.handleModal(e)}>
                        <Form.Item>
                            {getFieldDecorator('Name', { initialValue: '' }, {
                                rules: [{ required: true, message: 'Please input name!' }],
                            })(
                                <Input
                                    placeholder="name"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('Description', { initialValue: '' }, {
                                rules: [{ required: true, message: 'Please input Description!' }],
                            })(
                                <Input
                                    placeholder="Description"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" >
                                Add
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </DefaultLayout>
        )
    }
}

export default Form.create({ name: 'horizontal_login' })(Questions);