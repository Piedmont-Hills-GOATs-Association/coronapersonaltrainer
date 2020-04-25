import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import firebase from './firebase';
import './Register.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
      formFirstName: '',
      formLastName: '',
      formUsername: '',
      formEmail: '',
      formPassword: '',
      alert: (<div></div>),
      redirect: (<div></div>)
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const changeAlert = message => {
      this.setState({
        alert: (<Alert variant="danger">{message}</Alert>)
      });
    };
    if (e.currentTarget.checkValidity()) {
      firebase.auth().createUserWithEmailAndPassword(this.state.formEmail, this.state.formPassword).catch(function (error) {
        console.log(error.code);
        changeAlert(error.message);
      });
    }
    this.setState({
      validated: true
    });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          redirect: (<Redirect to="/" />)
        });
      }
    });
  }

  render() {
    return (
      <div className="container">
        {this.state.redirect}
        {this.state.alert}
        <h1>Create a new CPT Account</h1>
        <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control onChange={this.handleChange} required type="firstName" placeholder="Enter first name" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control onChange={this.handleChange} required type="lastName" placeholder="Enter last name" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control onChange={this.handleChange} required type="username" placeholder="Enter username" />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={this.handleChange} required type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={this.handleChange} required type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group>
            <Form.Check required label="Agree to terms and conditions" feedback="You must agree before submitting." />
          </Form.Group>
          <Button variant="primary" type="submit">Submit</Button>
        </Form>
        <br />
        <p>Already have an account? <Link to="/login">Login.</Link></p>
      </div>
    );
  }
}

export default Register;
