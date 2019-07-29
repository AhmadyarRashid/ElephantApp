import React, { Component } from 'react';
import axios from 'axios';
import Header from './Layout/Navbar';
import Sidebar from './Layout/Sidebar';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

class Answer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            answers: [],
            resource: [],
            resume: [],
            resumedata: [],
            campigns: [],
            user_id: 1,
            mergeDataList: [],
            columns: [
                {
                    dataField: 'name',
                    text: 'Full Name'
                }, {
                    dataField: 'phone_one',
                    text: 'Phone one'
                }, {
                    dataField: 'phone_two',
                    text: 'Phone two'
                },
                {
                    dataField: 'email_one',
                    text: 'Email One'
                }, {
                    dataField: 'email_two',
                    text: 'Email Two'
                }, {
                    dataField: 'city',
                    text: 'City'
                },
                {
                    dataField: 'country',
                    text: 'Country'
                }, {
                    dataField: 'education',
                    text: 'Education'
                }, {
                    dataField: 'work',
                    text: 'Work'
                },
                {
                    dataField: 'title',
                    text: 'Title'
                }, {
                    dataField: 'resume',
                    text: 'Resume'
                }, {
                    dataField: 'resume_type',
                    text: 'Resume Type'
                },
                {
                    dataField: 'answer_one',
                    text: 'Answer One'
                }, {
                    dataField: 'answer_two',
                    text: 'Answer Two'
                }, {
                    dataField: 'answer_three',
                    text: 'Answer Three'
                },
                {
                    dataField: 'answer_four',
                    text: 'Answer Four'
                }, {
                    dataField: 'answer_five',
                    text: 'Answer Five'
                }, {
                    dataField: 'answer_six',
                    text: 'Answer Six'
                },
                {
                    dataField: 'answer_seven',
                    text: 'Answer Seven'
                }, {
                    dataField: 'answer_eight',
                    text: 'Answer Eight'
                }, {
                    dataField: 'answer_nine',
                    text: 'Answer Nine'
                }
            ]
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


        // after getting data from api then merge and set into mergeDataList[]

        let data = [
            {
                name: 'meo',
                phone_one: '123',
                phone_two: '123',
                email_one: 'abc',
                email_two: 'abc2',
                city: 'dehli',
                country: 'india',
                education: 'bachelor',
                work: 'asd',
                title: 'asd',
                resume: 'qwe',
                resume_type: 'asd',
                answer_one: 'asd',
                answer_two: 'asd',
                answer_three: 'asd',
                answer_four: 'asd',
                answer_five: 'asd',
                answer_six: 'asd',
                answer_seven: 'asd',
                answer_eight: 'asd',
                answer_nine: 'asd'
            },
            {
                name: 'meo',
                phone_one: '123',
                phone_two: '123',
                email_one: 'abc',
                email_two: 'abc2',
                city: 'delhi',
                country: 'india',
                education: 'bachelor',
                work: 'asd',
                title: 'asd',
                resume: 'qwe',
                resume_type: 'asd',
                answer_one: 'asd',
                answer_two: 'asd',
                answer_three: 'asd',
                answer_four: 'asd',
                answer_five: 'asd',
                answer_six: 'asd',
                answer_seven: 'asd',
                answer_eight: 'asd',
                answer_nine: 'asd'
            }
        ];

        this.setState({
            mergeDataList: data
        })
    }


    handlerDownload() {
        // window.open('http://localhost:3000/sample.csv', '_self')
    }

    handlerMenu(e) {
        //  console.log(e.target.value);
    }


    render() {

        const menu1 = this.state.campigns.map(i => (
            <option key={i.pk} value={i.pk}>
                {i.name}
            </option>
        ));

        const data = this.state.mergeDataList.map(i => (
            {
                name: i.name,
                phone_one: i.phone_one,
                phone_two: i.phone_two,
                email_one: i.email_one,
                email_two: i.email_two,
                city: i.city,
                country: i.country,
                education: i.education,
                work: i.work,
                title: i.title,
                resume: i.resume,
                resume_type: i.resume_type,
                answer_one: i.answer_one,
                answer_two: i.answer_two,
                answer_three: i.answer_three,
                answer_four: i.answer_four,
                answer_five: i.answer_five,
                answer_six: i.answer_six,
                answer_seven: i.answer_seven,
                answer_eight: i.answer_eight,
                answer_nine: i.answer_nine
            }
        ));



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
                    <div className="table-bs" style={{ overflow: 'scroll'}}>
                        <BootstrapTable  keyField='id' data={data} columns={this.state.columns} pagination={paginationFactory()} />

                    </div>

                </div>
            </section>
        )
    }
}

export default Answer;