import React from "react";
import { Link } from "react-router-dom";
import DefaultLayout from "./Layout/DefaultLayout";
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card, CardText,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle
} from 'reactstrap';
import axios from 'axios';
import { Menu, Dropdown, Icon, message } from 'antd';


class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      calls_made: 0,
      sms_sent: 0,
      emails_sent: 0,
      call_yes: 0,
      call_no: 0,
      call_unknown: 0,
      chat_started: 0,
      chat_done: 0,
      chat_unknown: 0,
      campigns: [],
      selectedUser: 'Select User'
    }
  }

  componentWillMount() {

    axios.get('http://system.elepha.io/api/v1/overview')
      .then(res => {
        console.log(res.data);
        let res2 = res.data[0];
        this.setState({
          calls_made: res2.calls_made,
          sms_sent: res2.sms_sent,
          emails_sent: res2.emails_sent,
          call_yes: res2.call_yes,
          call_no: res2.call_no,
          call_unknown: res2.call_unknown,
          chat_started: res2.chat_started,
          chat_done: res2.chat_done,
          chat_unknown: res2.chat_unknown
        })
      }).catch(e => {
        console.log(e);
      })

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
  }


  handleMenuClick(e) {
    this.state.campigns.forEach(i => {
      if(i.pk == e.key){
        this.setState({
          selectedUser: i.name + '   '
        })
      }
    })

    axios.get('http://system.elepha.io/api/v1/overview')
      .then(res => {
        let res2 = res.data;

        res2.forEach(i => {
          if(i.campaign == e.key){
            this.setState({
              calls_made: i.calls_made,
              sms_sent: i.sms_sent,
              emails_sent: i.emails_sent,
              call_yes: i.call_yes,
              call_no: i.call_no,
              call_unknown: i.call_unknown,
              chat_started: i.chat_started,
              chat_done: i.chat_done,
              chat_unknown: i.chat_unknown
            })
          }
        });
       
      }).catch(e => {
        console.log(e);
      })
  }


  render() {


    const menu1 = this.state.campigns.map(i => (
      <Menu.Item key={i.pk}>
        <Icon type="user" />
        {i.name}
      </Menu.Item>
    ));

    return (
      <DefaultLayout title="Home">
        <div className="row">
          <Dropdown overlay={<Menu onClick={e => this.handleMenuClick(e)}>{menu1}</Menu>}>
            <Button>
              {this.state.selectedUser}<Icon type="down" />
            </Button>
          </Dropdown>
        </div>
        <div className="row">
          <div className='col-md-3' style={{ margin: 2 }}>
            <Card className='text-white' style={{ backgroundColor: '#DC143C' }}>
              <CardBody>
                <CardTitle>Call Made</CardTitle>
                <CardText><h1>{this.state.calls_made}</h1></CardText>
              </CardBody>
            </Card>
          </div>
          <div className='col-md-3' style={{ margin: 2 }}>
            <Card className='text-white' style={{ backgroundColor: '#FFFF00' }}>
              <CardBody>
                <CardTitle>Smms Sent</CardTitle>
                <CardText><h1>{this.state.sms_sent}</h1></CardText>
              </CardBody>
            </Card>
          </div>
          <div className='col-md-3' style={{ margin: 2 }}>
            <Card className='text-white' style={{ backgroundColor: '#3CB371' }}>
              <CardBody>
                <CardTitle>Email Sent</CardTitle>
                <CardText><h1>{this.state.emails_sent}</h1></CardText>
              </CardBody>
            </Card>
          </div>

          <div className='col-md-3' style={{ margin: 2 }}>
            <Card className='text-white' style={{ backgroundColor: '#DC143C' }}>
              <CardBody>
                <CardTitle>Call Yes</CardTitle>
                <CardText><h1>{this.state.call_yes}</h1></CardText>
              </CardBody>
            </Card>
          </div>
          <div className='col-md-3' style={{ margin: 2 }}>
            <Card className='text-white' style={{ backgroundColor: '#FFFF00' }}>
              <CardBody>
                <CardTitle>Call No</CardTitle>
                <CardText><h1>{this.state.call_no}</h1></CardText>
              </CardBody>
            </Card>
          </div>
          <div className='col-md-3' style={{ margin: 2 }}>
            <Card className='text-white' style={{ backgroundColor: '#3CB371' }}>
              <CardBody>
                <CardTitle>Call Unknown</CardTitle>
                <CardText><h1>{this.state.call_unknown}</h1></CardText>
              </CardBody>
            </Card>
          </div>

          <div className='col-md-3' style={{ margin: 2 }}>
            <Card className='text-white' style={{ backgroundColor: '#DC143C' }}>
              <CardBody>
                <CardTitle>Chat Started</CardTitle>
                <CardText><h1>{this.state.chat_started}</h1></CardText>
              </CardBody>
            </Card>
          </div>
          <div className='col-md-3' style={{ margin: 2 }}>
            <Card className='text-white' style={{ backgroundColor: '#FFFF00' }}>
              <CardBody>
                <CardTitle>Chat Done</CardTitle>
                <CardText><h1>{this.state.chat_done}</h1></CardText>
              </CardBody>
            </Card>
          </div>
          <div className='col-md-3' style={{ margin: 2 }}>
            <Card className='text-white' style={{ backgroundColor: '#3CB371' }}>
              <CardBody>
                <CardTitle>Chat Unknown</CardTitle>
                <CardText><h1>{this.state.chat_unknown}</h1></CardText>
              </CardBody>
            </Card>
          </div>

        </div>

      </DefaultLayout>
    );
  }
}
export default Home;
