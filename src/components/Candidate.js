import React, { Component } from 'react';
import DefaultLayout from "./Layout/DefaultLayout";
import { Table } from "antd";
import axios from 'axios';
import { Form, Icon, Input, Button, Menu, Dropdown, Modal } from 'antd';

const { Column, ColumnGroup } = Table;

class Candidate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: [],
            flow: [],
            questionFlow: 1,
            visible: false,
            userId :1
        };

       
    }

    render(){
        return(
            <DefaultLayout title="Candidate">
            </DefaultLayout>
        );
    }
}

  
export default Candidate;