import React, { Component } from 'react';
import axios from 'axios';
import Header from './Layout/Navbar';
import Sidebar from './Layout/Sidebar';

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
            mergeDataList: []
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
            mergeDataList : data
        })
    }


    handlerDownload() {
        // window.open('http://localhost:3000/sample.csv', '_self')
    }

    handlerMenu(e){
      //  console.log(e.target.value);
    }


    render() {

        const menu1 = this.state.campigns.map(i => (
            <option key={i.pk} value={i.pk}>
                {i.name}
            </option>
        ));

        const tableBody = this.state.mergeDataList.map(i => (
            <tr>
                <td scope="col">{i.name}</td>
                <td scope="col">{i.phone_one}</td>
                <td scope="col">{i.phone_two}</td>
                <td scope="col">{i.email_one}</td>
                <td scope="col">{i.email_two}</td>
                <td scope="col">{i.city}</td>
                <td scope="col">{i.country}</td>
                <td scope="col">{i.education}</td>
                <td scope="col">{i.work}</td>
                <td scope="col">{i.title}</td>
                <td scope="col">{i.resume}</td>
                <td scope="col">{i.resume_type}</td>
                <td scope="col">{i.answer_one}</td>
                <td scope="col">{i.answer_two}</td>
                <td scope="col">{i.answer_three}</td>
                <td scope="col">{i.answer_four}</td>
                <td scope="col">{i.answer_five}</td>
                <td scope="col">{i.answer_six}</td>
                <td scope="col">{i.answer_seven}</td>
                <td scope="col">{i.answer_eight}</td>
                <td scope="col">{i.answer_nine}</td>
            </tr>
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
                    <div className="table-bs">
                        <table bordered className="table table-responsive ">
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
                                {tableBody}

                            </tbody>
                        </table>
                    </div>

                </div>
            </section>
        )
    }
}

export default Answer;