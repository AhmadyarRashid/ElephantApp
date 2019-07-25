import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import {setAuthToken} from '../../../utils/setAuthToken';


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
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={(e) => this.handlerLogin(e)}>
                      <h1>Login</h1>

                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <Input type="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} required placeholder="Email" autoComplete="email" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <Input type="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} required placeholder="Password" autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" type="submit" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>

                      <Row>
                        <Col xs="12" className="text-center">
                          <Link color="link" to="/register" className="px-0">Create new account?</Link>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>

              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(Login);
