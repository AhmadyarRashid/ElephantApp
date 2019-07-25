import React , {Component} from 'react';
import DefaultLayout from "./Layout/DefaultLayout";
import { Table } from "antd";

const { Column, ColumnGroup } = Table;

class Answer extends Component {
    constructor(props){
        super(props);
    }


    render(){
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


        return(
            <DefaultLayout title="Answers">
                <Table dataSource={bomDetails} bordered>
                    <Column
                        title="S No"
                        dataIndex="s_no"
                        key="s_no"
                    />
                    <Column
                        title="Item No"
                        dataIndex="item_number"
                        key="item_number"
                    />
                    <Column
                        title="Material"
                        dataIndex="item_description"
                        key="description"
                    />
                   
                </Table>
            </DefaultLayout>
        )
    }
}

export default Answer;