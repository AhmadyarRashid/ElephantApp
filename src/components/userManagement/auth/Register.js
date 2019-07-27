import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      phone: '',
      company: '',
      bot_display: '',
      bot_name: '',
      url: '',
      password: '',
      retype_password: '',
      error :''
    }
  }

  handlerForm(e) {
    e.preventDefault();
    if (this.state.password !== this.state.retype_password) {
      this.setState({
        error : 'Both Password Fields are mismatch'
      })
      alert('Both Password Field are not match');
    } else {
      Axios.post('http://system.elepha.io/api/v1/elephauser/', {
        "name": `${this.state.name}`,
        "email": `${this.state.email}`,
        "phone": `${this.state.phone}`,
        "company": `${this.state.company}`,
        "bot_display": `${this.state.bot_display}`,
        "bot_name": `${this.state.bot_name}`,
        "is_superuser": false,
        "is_active": true,
        "url": `${this.state.url}`,
        "password": `${this.state.password}`
      }).then(res => {
        alert('Registration Complete Sucessfully');
        this.props.history.push('/');
      
      }).catch(e => {
        this.setState({
          error : 'Subdomain, already exists. Please select another'
        })
       // alert('this email, url or phone is already exist');
      })
    }
  }

  render() {
    return (
      <div>
        <div class="d-flex justify-content-center mt">

          <div class="box">
            <img src="./assets/images/logo1.png" style={{ width: "100%", marginBottom: "8%" }} />
            <div className="d-flex flex-wrap no-block col-10 ml-auto mr-auto justify-content-center align-items-center">
              <div className="login-desc">
                <h2> Register to our site </h2>
                <p> Enter Username and Password </p>
              </div>
              <div className="key-image">
                <img src="./assets/images/pencil.png" class="img" style={{ width: "15%" }} />
              </div>
            </div>
            <form class="frm" onSubmit={(e) => this.handlerForm(e)}>
              <br />

              {this.state.error == '' ? '' : <div class="alert alert-danger" role="alert"> {this.state.error} </div>}


              <div class="form-group">
                <input type="text" required value={this.state.name} onChange={e => this.setState({ name: e.target.value })} class="form-control" ref="name" placeholder="Full Name" />
              </div>
              <div class="form-group">
                <input type="email" required value={this.state.email} onChange={e => this.setState({ email: e.target.value })} class="form-control" ref="email" placeholder="Email" />
              </div>
              <div class="form-group">
                <input type="tel"  pattern="[0-9]{6,}" title="Enter number no Without white-space" required value={this.state.phone} onChange={e => this.setState({ phone: e.target.value })} class="form-control" ref="phone" placeholder="Phone Number" />
              </div>
              <div class="form-group">
                <input type="text" required value={this.state.company} onChange={e => this.setState({ company: e.target.value })} class="form-control" ref="company" placeholder="Company" />
              </div>
              <div class="form-group">
                <input type="text" required value={this.state.bot_name} onChange={e => this.setState({ bot_name: e.target.value })} class="form-control" ref="bot_name" placeholder="Bot Name" />
              </div>
              <div class="form-group">
                <input type="text" required value={this.state.url} onChange={e => this.setState({ url: e.target.value })} class="form-control" ref="sub_domian" placeholder="Your Subdomain" />
              </div>
              <div class="form-group">
                <input type="password" required pattern=".{6,}" title="At least 8 or more characters" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} class="form-control" ref="password" placeholder="Password" />
              </div>
              <div class="form-group">
                <input type="password" required value={this.state.retype_password} pattern=".{6,}" title="At least 8 or more characters" onChange={e => this.setState({ retype_password: e.target.value })} class="form-control" placeholder="Confirm Password" />
              </div>
              <div class="form-group">
                <input type="text" required value={this.state.bot_display} onChange={e => this.setState({ bot_display: e.target.value })} class="form-control" ref="bot_display" placeholder="Bot Description" />
              </div>
              <button type="submit" class="btn btn-primary btn-block pnk_bt">Sign in!</button>
              <br />
            </form>
          </div>
        </div>

    </div>
    );
  }
}

export default withRouter(Register);
