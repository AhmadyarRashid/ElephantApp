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
      retype_password: ''
    }
  }

  handlerForm(e) {
    e.preventDefault();
    if (this.state.password !== this.state.retype_password) {
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
        console.log(res);
      }).catch(e => {
         alert('this email, url or phone is already exist');
      })
    }
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={(e) => this.handlerForm(e)}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <Input type="text" required value={this.state.name} onChange={e => this.setState({ name: e.target.value })} placeholder="Username" autoComplete="username" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Input type="email" required value={this.state.email} onChange={e => this.setState({ email: e.target.value })} placeholder="Email" autoComplete="email" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Input type="tel" pattern="[0-9]{6,}" title="Enter number no Without white-space" required value={this.state.phone} onChange={e => this.setState({ phone: e.target.value })} placeholder="Phone No" autoComplete="phone" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Input type="text" required value={this.state.company} onChange={e => this.setState({ company: e.target.value })} placeholder="Company" autoComplete="Company" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Input type="text" required value={this.state.bot_display} onChange={e => this.setState({ bot_display: e.target.value })} placeholder="Bot Display" autoComplete="Bot display" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Input type="text" required value={this.state.bot_name} onChange={e => this.setState({ bot_name: e.target.value })} placeholder="Bot Name" autoComplete="Bot Name" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Input type="url" required value={this.state.url} onChange={e => this.setState({ url: e.target.value })} placeholder="Url" autoComplete="url" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Input type="password" required pattern=".{6,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} placeholder="Password" autoComplete="new-password" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <Input type="password" required value={this.state.retype_password} pattern=".{6,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" onChange={e => this.setState({ retype_password: e.target.value })} placeholder="Repeat password" autoComplete="new-password" />
                    </InputGroup>
                    <Button color="success" type="submit" block>Create Account</Button>
                  </Form>
                </CardBody>

              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(Register);
