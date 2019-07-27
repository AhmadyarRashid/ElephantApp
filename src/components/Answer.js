import React, { Component } from 'react';
import DefaultLayout from "./Layout/DefaultLayout";
import axios from 'axios';
import { Form, Icon, Input, Button, Menu, Dropdown, Modal, Table } from 'antd';
import Header from './Layout/Navbar';
import Sidebar from './Layout/Sidebar';

const { Column, ColumnGroup } = Table;

class Answer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            answers: [],
            resource: [],
            resume: [],
            resumedata: [],
            campigns: [],
            user_id: 1
        };
    }

    componentDidMount() {


        try {
            let user_id = localStorage.getItem('user_id');
            this.setState({
                user_id
            })
        } catch (e) {
            alert('Please Login Again');
        }

        axios.get('http://system.elepha.io/api/v1/campaigns')
            .then(res => {
                let res2 = res.data.filter(i => i.elephauser == this.state.user_id);
                this.setState({
                    campigns: res2
                })
            }).catch(e => {
              //  console.log(e);
            })

        axios
            .get('http://system.elepha.io/api/v1/answer/')
            .then(res => {
                if (res) {
                    this.setState({
                        answers: res
                    })
                }
            })
            .catch(e => {
              //  console.log(e)
            });

        axios.get('http://system.elepha.io/api/v1/resumesource/')
            .then(res => {
                if (res) {
                    this.setState({
                        resource: res
                    })
                }
            }).catch(e => {
              //  console.log(e)
            })

        axios.get('http://system.elepha.io/api/v1/resume/')
            .then(res => {
                if (res) {
                    this.setState({
                        resume: res
                    })
                }

            }).catch(e => {
             //   console.log(e)
            })

        axios.get('http://system.elepha.io/api/v1/resumedata/')
            .then(res => {
                if (res) {
                    this.setState({
                        resumedata: res
                    })
                }

            }).catch(e => {
               // console.log(e)
            })
    }


    handlerDownload() {
        window.open('http://localhost:3000/sample.csv', '_self')
    }


    render() {

        const menu1 = this.state.campigns.map(i => (
            <option key={i.pk}>
                {i.name}
            </option>
        ));


        const bomDetails = [{
            key: 1,
            s_no: 2,
            item_number: 3,
        },
        {
            key: 1,
            s_no: 2,
            item_number: 3,
        },
        {
            key: 1,
            s_no: 2,
            item_number: 3,
        }
        ]


        return (
            <section>
                <Header />
                <Sidebar />
                <div className="main-content w-100">
                    <div className="page-header col-12" style={{ marginTop: -80 }}>
                        <h1>Answers</h1>
                        <div className="d-flex no-block flex-wrap align-items-start">
                            <div className="form-group col-4">
                                <div className="row">
                                Campaign :
                                    <select className="form-control" onChange={e => this.handlerMenu(e)}>
                                        {menu1}
                                    </select>
                                </div>
                            </div>

                            <div className="d-flex flex-wrap col-12">
                                <div className="col-12 px-0 mb-5">
                                    <button
                                        className="btn btn-dark mr-3"
                                        onClick={() => this.handlerDownload()}
                                    >
                                        Download Sample
                                     </button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="table-bs">
                        <table class="table" bordered className="table-responsive">
                            <thead>
                                <tr>
                                    <th scope="col">Full Name</th>
                                    <th scope="col">Phone 1</th>
                                    <th scope="col">Phone 2</th>
                                    <th scope="col">Email 1</th>
                                    <th scope="col">Email 2</th>
                                    <th scope="col">City</th>
                                    <th scope="col">Country</th>
                                    <th scope="col">Education</th>
                                    <th scope="col">Work</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Resume</th>
                                    <th scope="col">Resume Type</th>
                                    <th scope="col">Answer 1</th>
                                    <th scope="col">Answer 2</th>
                                    <th scope="col">Answer 3</th>
                                    <th scope="col">Answer 4</th>
                                    <th scope="col">Answer 5</th>
                                    <th scope="col">Answer 6</th>
                                    <th scope="col">Answer 7</th>
                                    <th scope="col">Answer 8</th>
                                    <th scope="col">Answer 9</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                    <td>@fat</td>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                    <td>@fat</td>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                    <td>@fat</td>
                                    <td>@fat</td>
                                    <td>@fat</td>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>

                </div>
            </section>
        )
    }
}

export default Answer;