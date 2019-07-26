import React, { Component } from 'react';
import DefaultLayout from "./Layout/DefaultLayout";
import { Table } from "antd";
import axios from 'axios';
import { Form, Icon, Input, Button, Menu, Dropdown, Modal } from 'antd';
import CSVReader from 'react-csv-reader';

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
            <Menu.Item key={i.pk} onClick={e => this.handlerMenu(e)}>
                {i.name}
            </Menu.Item>
        ));

        const data = this.state.candidateList.map((item, i) => ({
            id: i + 1,
            name: item.name,
            email: item.email,
            number: item.number,
            skill: item.skill,
            location: item.location
        }));



        return (
            <DefaultLayout title="Candidate">
                <Dropdown overlay={<Menu>{menu1}</Menu>} >
                    <a className="ant-dropdown-link" href="#">
                        Select Campigns <Icon type="down" />
                    </a>
                </Dropdown>


                <Button className="btn btn-success"  onClick={() => this.handlerDownload()}>Download CSV</Button>

                <CSVReader
                    cssClass="csv-reader-input"
                    label="Select CSV with secret Death Star statistics"
                    onFileLoaded={this.handleForce}
                    onError={this.handleDarkSideForce}
                    inputId="ObiWan"
                    inputStyle={{ color: 'red' }}
                />

                <Table dataSource={data} bordered className="table-responsive table-responsive-md">
                    <Column
                        title="key"
                        dataIndex="id"
                        key="id"
                    />
                    <Column
                        title="Name"
                        dataIndex="name"
                        key="name"
                    />
                    <Column
                        title="Email"
                        dataIndex="email"
                        key="email"
                    />
                    <Column
                        title="Number"
                        dataIndex="number"
                        key="number"
                    />
                    <Column
                        title="Skill"
                        dataIndex="skill"
                        key="skill"
                    />
                    <Column
                        title="Location"
                        dataIndex="location"
                        key="location"
                    />

                </Table>

            </DefaultLayout>
        );
    }
}


export default Candidate;