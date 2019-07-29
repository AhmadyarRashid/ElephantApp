import React, { Component } from 'react';
import { Table } from "antd";
import axios from 'axios';
import CSVReader from 'react-csv-reader';
import Header from './Layout/Navbar';
import Sidebar from './Layout/Sidebar';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

class Candidate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campigns: [],
            candidateList: [],
            userId: 1,
            selectedCampaign: 1,
            column : [
                {
                    dataField: 'no',
                    text: 'No'
                }, {
                    dataField: 'name',
                    text: 'Name'
                },{
                    dataField: 'email',
                    text: 'Email'
                },{
                    dataField: 'number',
                    text: 'Number'
                },{
                    dataField: 'skill',
                    text: 'Skill'
                },{
                    dataField: 'location',
                    text: 'Location'
                } 
            ]
        }
    }


    componentDidMount() {
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


        axios.get('http://system.elepha.io/api/v1/campaigns')
            .then(res => {
                let res2 = res.data.filter(i => i.elephauser == this.state.userId);
                this.setState({
                    campigns: res2
                })
            }).catch(e => {
                // console.log(e);
            })


        axios
            .get('http://system.elepha.io/api/v1/candidate/')
            .then(res => {
                if (res) {
                    console.log(res.data);
                    this.setState({
                        candidateList: res.data
                    })
                }
            }).catch(e => {
                // console.log(e);
            });
    }

    refreshData(){
        console.log('Refresh Data Called');
        this.setState({
            candidateList : []
        })
        setTimeout(() => {
            axios
            .get('http://system.elepha.io/api/v1/candidate/')
            .then(res => {
                 if (res) {
                    console.log(res.data);
                    this.setState({
                        candidateList: res.data
                    })
                }
            }).catch(e => {
                // console.log(e);
            });
        } , 1000);
      
    }

    handlerDownload() {
        window.open('http://localhost:3000/sample.csv', '_self')
    }

    handleFiles = files => {
        // console.log(files.fileList)
    }

    handlerMenu = e => {
        this.setState({
            selectedCampaign: e.target.value
        })
    }

    handleForce = data => {
        console.log('upload file function');

        data.forEach((i, index) => {

            if (i[0] !== 'name') {
                if (i[0] !== "" && i[1] !== "" && i[2] !== "" && i[3] !== "" && i[4] !== "") {

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
                                    // console.log('insert sucessfully');
                                }
                            }).catch(e => {

                            });
                    }, 500);

                }

                if(data.length  == index +1){
                    this.refreshData();
                }
            }
        })

        
    }

    handleDarkSideForce = data => {
         console.log('Handle Dark Side Force' ,data);
    }


    render() {
        const menu1 = this.state.campigns.map(i => (
            <option key={i.pk} value={i.pk}>
                {i.name}
            </option>
        ));

        const data = this.state.candidateList.map((item, i) => (
            {
                no : i +1,
                name : item.name,
                email : item.email,
                number : item.number,
                skill : item.skill,
                location : item.location
            }
        ));

        return (
            <section>
                <Header />
                <Sidebar />
               

                <div className="main-content w-100">
                    <div className="page-header col-12" style={{ marginTop: -80 }}>
                        <h1>Candidates</h1>
                       
                        <div className="d-flex no-block flex-wrap align-items-start">
                            <div className="form-group col-4">
                                <div className="row">
                                    Campaign :
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
    
                        <BootstrapTable keyField='id' data={data} columns={this.state.column} pagination={paginationFactory()} />

                    </div>
                </div>
            </section>
        );
    }
}


export default Candidate;