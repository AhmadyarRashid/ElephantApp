import React, { Component } from 'react';
import DefaultLayout from "./Layout/DefaultLayout";
import { Table } from "antd";
import axios from 'axios';
import { Form, Icon, Input, Button, Menu, Dropdown, Modal } from 'antd';
import CSVReader from 'react-csv-reader';
import Header from './Layout/Navbar';
import Sidebar from './Layout/Sidebar';

const { Column, ColumnGroup } = Table;

class Candidate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campigns: [],
            candidateList: [],
            userId: 1,
            selectedCampaign: 1
        }
    }

    componentDidMount() {
        axios.get('http://system.elepha.io/api/v1/campaigns')
            .then(res => {
                console.log(res.data);
                let res2 = res.data;
                this.setState({
                    campigns: res2
                })
            }).catch(e => {
                console.log(e);
            })


        axios
            .get('http://system.elepha.io/api/v1/candidate/')
            .then(res => {
                if (res) {
                    this.setState({
                        candidateList: res.data
                    })
                }
            }).catch(e => {
                console.log(e);
            });

        try {
            let userId = localStorage.getItem('user_id');
            this.setState({
                userId
            })
        } catch (e) {
            this.setState({
                userId: 1
            })
        }
    }

    handlerDownload() {
        window.open('http://localhost:3000/sample.csv', '_self')
    }

    handleFiles = files => {
        console.log(files.fileList)
    }

    handlerMenu = e => {
        console.log(e.key);
        this.setState({
            selectedCampaign: e.key
        })
    }

    handleForce = data => {
        //console.log('data' ,data);
        data.forEach(i => {

            if (i[0] !== 'name') {
                if (i[0] !== "" && i[1] !== "" && i[2] !== "" && i[3] !== "" && i[4] !== "") {
                    console.log('=======', i)
                    setTimeout(() => {
                        axios
                            .post('http://system.elepha.io/api/v1/candidate/', {
                                "name": i[0],
                                "number": i[1],
                                "skill": i[2],
                                "location": i[3],
                                "email": i[4],
                                "elephauser": this.state.userId,
                                "campaign": this.state.selectedCampaign
                            })
                            .then(res => {
                                if (res) {
                                    console.log('insert sucessfully');
                                }
                            }).catch(e => {
                                console.log(e);
                            });
                    }, 500);

                }
            }
        })
    }

    handleDarkSideForce = data => {
        console.log(data);
    }


    render() {
        const menu1 = this.state.campigns.map(i => (
            <option key={i.pk} >
                {i.name}
            </option>
        ));

        const data = this.state.candidateList.map((item, i) => (
            <tr>
                <td>{i+1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.number}</td>
                <td>{item.skill}</td>
                <td>{item.location}</td>
            </tr>
        ));



        return (
                <section>
                    <Header />
                    <Sidebar />
                    <div className="main-content w-100">
                        <div className="page-header col-12" style={{ marginTop: -80 }}>
                            <h1>Candidates Page</h1>
                            <div className="d-flex no-block flex-wrap align-items-start">
                                <div className="form-group col-4">
                                    <div className="row">
                                        <select className="form-control" onClick={e => this.handlerMenu(e)}>
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
                                    <div className="d-flex flex-column border px-3">
                                        <CSVReader
                                            cssClass="csv-reader-input"
                                            label="Select CSV with secret Death Star statistics"
                                            onFileLoaded={this.handleForce}
                                            onError={this.handleDarkSideForce}
                                            inputId="ObiWan"
                                            inputStyle={{ color: 'red' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="table-bs">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Number</th>
                                        <th scope="col">Skill</th>
                                        <th scope="col">Location</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
        );
    }
}


export default Candidate;