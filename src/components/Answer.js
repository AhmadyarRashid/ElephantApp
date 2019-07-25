import React, { Component } from 'react';
import DefaultLayout from "./Layout/DefaultLayout";
import { Table } from "antd";
import axios from 'axios';

const { Column, ColumnGroup } = Table;

class Answer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            answers: [],
            resource: [],
            resume: [],
            resumedata: []
        };
    }

    componentDidMount() {
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
                console.log(e)
            });

        axios.get('http://system.elepha.io/api/v1/resumesource/')
            .then(res => {
                if (res) {
                    this.setState({
                        resource: res
                    })
                }
            }).catch(e => {
                console.log(e)
            })

        axios.get('http://system.elepha.io/api/v1/resume/')
            .then(res => {
                if (res) {
                    this.setState({
                        resume: res
                    })
                }

            }).catch(e => {
                console.log(e)
            })

        axios.get('http://system.elepha.io/api/v1/resumedata/')
            .then(res => {
                if (res) {
                    this.setState({
                        resumedata: res
                    })
                }

            }).catch(e => {
                console.log(e)
            })
    }


    render() {

        // let arr3 = [];

        // this.state.answers.forEach((itm, i) => {
        //     arr3.push(Object.assign({}, itm, this.state.resource[i]));
        // });

        // arr3.forEach((itm, i) => {
        //     arr3.push(Object.assign({}, itm, this.state.resume[i]));
        // });

        // arr3.forEach((itm, i) => {
        //     arr3.push(Object.assign({}, itm, this.state.resumedata[i]));
        // });

        // console.log('Joins' , arr3)

        




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
            <DefaultLayout title="Answers">
                <Table dataSource={bomDetails} bordered className="table-responsive table-responsive-md">
                    <Column
                        title="Full Name"
                        dataIndex="full_name"
                        key="full_name"
                    />
                    <Column
                        title="Phone 1"
                        dataIndex="phoneone"
                        key="phoneone"
                    />
                    <Column
                        title="Phone 2"
                        dataIndex="phonetwo"
                        key="phonetwo"
                    />
                    <Column
                        title="Email 1"
                        dataIndex="emailone"
                        key="emailone"
                    />
                    <Column
                        title="Email 2"
                        dataIndex="emailtwo"
                        key="emailtwo"
                    />
                    <Column
                        title="City"
                        dataIndex="city"
                        key="city"
                    />
                    <Column
                        title="Country"
                        dataIndex="country"
                        key="country"
                    />
                    <Column
                        title="Education"
                        dataIndex="education"
                        key="education"
                    />
                    <Column
                        title="Work"
                        dataIndex="work"
                        key="work"
                    />
                    <Column
                        title="Title"
                        dataIndex="title"
                        key="title"
                    />

                    <Column
                        title="Resume"
                        dataIndex="resume"
                        key="resume"
                    />
                    <Column
                        title="Resume Type"
                        dataIndex="resume_type"
                        key="resume_type"
                    />

                    <Column
                        title="Answer 1"
                        dataIndex="answer_one"
                        key="answer_one"
                    />
                    <Column
                        title="Answer 2"
                        dataIndex="answer_two"
                        key="answer_two"
                    />
                    <Column
                        title="Answer 3"
                        dataIndex="answer_three"
                        key="answer_three"
                    />
                    <Column
                        title="Answer 4"
                        dataIndex="answer_four"
                        key="answer_four"
                    />
                    <Column
                        title="Answer 5"
                        dataIndex="answer_five"
                        key="answer_five"
                    />
                    <Column
                        title="Answer 6"
                        dataIndex="answer_six"
                        key="answer_six"
                    />
                    <Column
                        title="Answer 7"
                        dataIndex="answer_seven"
                        key="answer_seven"
                    />
                    <Column
                        title="Answer 8"
                        dataIndex="answer_eight"
                        key="answer_eight"
                    />
                    <Column
                        title="Answer 9"
                        dataIndex="answer_nine"
                        key="answer_nine"
                    />
                    <Column
                        title="Answer 10"
                        dataIndex="answer_ten"
                        key="answer_ten"
                    />



                </Table>
            </DefaultLayout>
        )
    }
}

export default Answer;