import React, { Component } from 'react';
import { Table } from "antd";
import axios from 'axios';
import { Form, Icon, Input, Button, Menu, Dropdown, Modal } from 'antd';
import Header from './Layout/Navbar';
import Sidebar from './Layout/Sidebar';
import { Link } from "react-router-dom";

const { Column, ColumnGroup } = Table;

class Questions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: [],
            flow: [],
            questionFlow: 1,
            visible: false,
            userId: 1,
            label: '',
            type: '',
            meta: ''
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
                    console.log('FLOW', res.data);
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
                        "name": values['Name'],
                        "description": values['Description'],
                        "elephauser": this.state.userId
                    })
                    .then(res => {
                        if (res) {
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

    handlerLabel(e) {
        this.setState({
            label: e.target.value
        })
    }

    handlerType(e) {
        this.setState({
            type: e.target.value
        })
    }

    handlerMeta(e) {
        this.setState({
            meta: e.target.value
        })
    }

    handlerForm(e) {
        e.preventDefault();
        if (this.state.label == '' || this.state.type == '' || this.state.meta == '') {
            alert('Some Field are empty');
        } else {
            let userId;
            const { label, type, meta } = this.state;
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
                    "label": label,
                    "type": type,
                    "meta": meta,
                    "questionflow": this.state.questionFlow,
                    "elephauser": userId
                })
                .then(res => {
                    this.setState({
                        label: '',
                        type: '',
                        meta: ''
                    })
                    alert('Add Sucessfully');
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }


    render() {

        const menu1 = this.state.flow.map(i => (
            <option key={i.pk} >
                {i.name}
            </option>
        ));

        const { getFieldDecorator } = this.props.form;
        const data = this.state.questions.map((item, i) => (
            <tr>
                <td>{i + 1}</td>
                <td>{item.label}</td>
                <td>{item.type}</td>
                <td>{item.meta}</td>
            </tr>

        ));


        return (
    
                <section>
                    <Header />
                    <Sidebar />
                    <div className="main-content w-100">
                        <div className="page-header col-12" style={{ marginTop: -80 }}>
                            <h1>Campaign</h1>
                            <div className="d-flex no-block flex-wrap align-items-start">
                                <div className="form-group col-10">
                                    <div className="row">
                                        <select className="form-control" onChange={(e) => this.handlerMenu(e)}>
                                            {menu1}
                                        </select>
                                    </div>
                                </div>
                                <button
                                    className="btn btn-primary"
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                >
                                    +
                                 </button>
                            </div>
                            <div
                                class="modal fade"
                                id="exampleModal"
                                tabindex="-1"
                                role="dialog"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                            >
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <Form layout="inline" onSubmit={(e) => this.handleModal(e)}>
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">
                                                    Add Campigns
                                  </h5>
                                                <button
                                                    type="button"
                                                    class="close"
                                                    data-dismiss="modal"
                                                    aria-label="Close"
                                                >
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>

                                            <div class="modal-body">

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
                        


                                            </div>
                                            <div class="modal-footer">
                                                <button
                                                    type="button"
                                                    class="btn btn-secondary"
                                                    data-dismiss="modal"
                                                >
                                                    Close
                                                 </button>
                                                <Form.Item>
                                                    <button data-dismiss="modal"
                                                        type="primary" htmlType="submit" >
                                                        Add
                                                     </button>
                                                </Form.Item>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="table-bs">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Label</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Meta</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {data}
                                </tbody>
                            </table>
                        </div>
                        <form onSubmit={e => this.handlerForm(e)}>
                            <div className="d-flex no-block flex-wrap mt-5 border-top pt-5">

                                <div className="col-6 col-xl-3 form-group">
                                    <label>Label</label>
                                    <input className="form-control" value={this.state.label} onChange={e => this.handlerLabel(e)} on type="text" placeholder="label" />
                                </div>
                                <div className="col-6 col-xl-3 form-group">
                                    <label>Type</label>
                                    <input className="form-control" value={this.state.type} onChange={e => this.handlerType(e)} type="text" placeholder="type" />
                                </div>
                                <div className="col-6 col-xl-3 form-group">
                                    <label>Meta</label>
                                    <input className="form-control" value={this.state.meta} onChange={e => this.handlerMeta(e)} type="text" placeholder="meta" />
                                </div>
                                <div className="col-12">
                                    <button className="btn btn-dark" type="submit">
                                        Submit{" "}
                                    </button>
                                </div>

                            </div>
                        </form>
                    </div>
                </section>
        )
    }
}

export default Form.create({ name: 'horizontal_login' })(Questions);