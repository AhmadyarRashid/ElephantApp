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
            type: 'Start',
            meta: '',
            formStatus: 'Save',
            editId: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    refreshDataQuestion() {

        axios
            .get('http://system.elepha.io/api/v1/question/')
            .then(res => {
                if (res) {
                    this.setState({
                        questions: res.data
                    })
                }
            })
            .catch(e => {

            });

       
    }

    componentDidMount() {
        this.props.form.validateFields();
        this.refreshDataQuestion();

        try {
            let userId = localStorage.getItem('user_id');
            this.setState({
                userId
            })
        } catch (e) {
            alert('Please Login again to work properly')
        }


        axios.get('http://system.elepha.io/api/v1/questionflow/')
        .then(res => {
            if (res) {
                this.setState({
                    flow: res.data,

                })
                if (res.data.length > 0) {
                    this.setState({
                        questionFlow: res.data[0].pk
                    })
                }

            }
        }).catch(e => {

        })

    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { Label, Type, Meta } = values;
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

                    });
            }
        });
    }

    handlerMenu(e) {
        this.setState({
            questionFlow: e.target.value
        })
        axios
            .get('http://system.elepha.io/api/v1/question/')
            .then(res => {
                if (res) {

                    const filterData = res.data.filter(i => i.questionflow == this.state.questionFlow);
                    this.setState({
                        questions: filterData
                    })
                }
            })
            .catch(e => {

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
                        alert('Some Network Error');
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
        if (this.state.formStatus == 'Save') {
        
                const { label, type, meta } = this.state;
               
                axios
                    .post('http://system.elepha.io/api/v1/question/', {
                        "label": label,
                        "type": type,
                        "meta": meta,
                        "questionflow": this.state.questionFlow,
                        "elephauser": this.state.userId
                    })
                    .then(res => {
                        this.setState({
                            label: '',
                            type: '',
                            meta: ''
                        })
                        alert('Add Sucessfully');
                        this.refreshDataQuestion();
                    })
                    .catch(e => {

                    });
        }

        if (this.state.formStatus == 'Update') {
            if (this.state.label == '' || this.state.meta == '') {
                alert('Some Field is Empty')
            } else {
                axios 
                    .patch(`http://system.elepha.io/api/v1/question/${this.state.editId}/`,{
                        label: this.state.label,
                        type: this.state.type,
                        meta: this.state.meta
                    }).then(res => {
                        alert('Update Sucessfully')
                        this.setState({
                            label :'',
                            type : '',
                            meta : '',
                            editId :'',
                            formStatus : 'Save'
                        })
                    }).catch(e => {
                        //console.log('=======' , e);
                        alert('Some Network Issue')
                    })
            }
        }



    }

    handlerDelete(id) {
        axios
            .delete('http://system.elepha.io/api/v1/question/' + id)
            .then(res => {
                alert('Delete Sucessfully');
                this.refreshDataQuestion();
            })
            .catch(e => {

            });
    }

    handlerEdit(id, label, type, meta) {
        this.setState({
            editId: id,
            label,
            type,
            meta,
            formStatus: 'Update'
        })


    }

    handlerMoveup(id) {

    }

    handlerMovedown(id) {

    }

    handlerReset(e){
        this.setState({
            label : '',
            meta : '',
            editId : '',
            type : 'Start',
            formStatus : 'Save'
        })
    }


    render() {

        const menu1 = this.state.flow.map(i => (
            <option key={i.pk} value={i.pk} >
                {i.name}
            </option>
        ));



        const { getFieldDecorator } = this.props.form;
        const question = this.state.questions.filter(i => i.questionflow == this.state.questionFlow)
        const data = question.map((item, i) => (
            <tr>
                <td>{i + 1}</td>
                <td>{item.label}</td>
                <td>{item.type}</td>
                <td>{item.meta}</td>
                <td><a href='#' onClick={() => this.handlerEdit(item.pk, item.label, item.type, item.meta)}>Edit</a></td>
                <td><a href='#' onClick={() => this.handlerDelete(item.pk)}>Delete</a></td>
                <td><a href='#' onClick={() => this.handlerMoveup(item.pk)}>Move up</a></td>
                <td><a href='#' onClick={() => this.handlerMovedown(item.pk)}>Move down</a></td>
            </tr>
        ));


        return (

            <section>
                <Header />
                <Sidebar />
                <div className="main-content w-100">
                    <div className="page-header col-12" style={{ marginTop: -80 }}>
                        <h1>Questions</h1>
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
                                                <button data-dismiss="modal" className="btn btn-secondary"
                                                    type="button" htmlType="submit" >
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

                                <select className="form-control" value={this.state.type} onChange={e => this.handlerType(e)}>
                                    <option key="Start" value="Start" >Start</option>
                                    <option key="Verify" value="Verify" >Verify</option>
                                    <option key="Resume" value="Resume" >Resume</option>
                                    <option key="Jobboard" value="Jobboard" >Jobboard</option>
                                    <option key="Linkedin" value="Linkedin" >Linkedin</option>
                                    <option key="Question" value="Question" >Question</option>
                                    <option key="Option" value="Option" >Option</option>
                                    <option key="End" value="End" >End</option>
                                </select>
                            </div>
                            <div className="col-6 col-xl-3 form-group">
                                <label>Meta</label>
                                <input className="form-control" value={this.state.meta} onChange={e => this.handlerMeta(e)} type="text" placeholder="meta" />
                            </div>
                            <div className="col-12">
                                <button className="btn btn-dark" type="submit">
                                    {this.state.formStatus}
                                </button>

                                <button className="btn btn-danger" onClick={e => this.handlerReset(e)}>
                                   Reset
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