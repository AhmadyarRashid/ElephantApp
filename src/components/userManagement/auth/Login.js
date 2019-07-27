import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import setAuthToken from '../../../utils/setAuthToken';


class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  handlerLogin(e) {
    e.preventDefault();

    Axios.post('http://system.elepha.io/login/', {
      "email": `${this.state.email}`,
      "password": `${this.state.password}`
    }).then(res => {

      Axios
        .get('http://system.elepha.io/api/v1/elephauser/')
        .then(res2 => {

          res2.data.forEach(user => {
            if (user.email == this.state.email) {
              console.log('token', res.data.token);
              console.log('id', user.pk)
              setAuthToken(res.data.token);
              localStorage.setItem('token', res.data.token);
              localStorage.setItem('user_id', user.pk);
              this.props.history.push('/');
            }
          })
        })
        .catch(e => {
          console.log(e);
        });
    }).catch(err => {
      alert('Email or Password are wrong');
      this.setState({
        email: '',
        password: ''
      })
    })
  }

  render() {
    return (
      <div>
        <div class="d-flex justify-content-center mt">
          <div class="box">
            <img src="./assets/images/logo1.png" style={{ width: "100%", marginBottom: "8%" }} />
            <div className="d-flex flex-wrap no-block col-10 ml-auto mr-auto justify-content-center align-items-center">
              <div className="login-desc">
                <h2> Login to our site </h2>
                <p> Enter Username and Password </p>
              </div>
              <div className="key-image">
                <img src="./assets/images/key.png" class="img" style={{ width: "15%" }} />
              </div>
            </div>
            <form class="frm" onSubmit={(e) => this.handlerLogin(e)}>
              <br />
              <div class="form-group">
                <input type="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} required class="form-control" ref="email" placeholder="Email" />
              </div>
              <div class="form-group">
                <input type="password"  value={this.state.password} onChange={e => this.setState({ password: e.target.value })} required  class="form-control" ref="password" placeholder="Password" />
              </div>
              <button type="submit" class="btn btn-primary btn-block pnk_bt">Sign in!</button>
              <br />
            </form>
            <p> .. Or Register </p>
            <Link to="/register"  className="btn btn-primary btn-block pnk_bt">
              Register
          </Link>
          </div>
        </div>
   </div>
    );
  }
}

export default withRouter(Login);
