import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import firebase from './firebase';
//import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: (<div></div>),
      redirect: (<div></div>),
      formEmail: "",
      formPassword: ""
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
    firebase.auth().signInWithEmailAndPassword(this.state.formEmail, this.state.formPassword).catch(error => {
      console.log(error.code);
      this.setState({
        alert: (<Alert variant="danger">{error.message}</Alert>)
      });
    });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((fbuser) => {
      if (fbuser) {
        this.setState({
          redirect: (<Redirect to="/dashboard" />)
        });
      }
    });
  }

  render() {
    return (
      <div className="container">
        {this.state.redirect}
        <Container>
          {this.state.alert}
          <h4>Login to your CPT Account</h4>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control onChange={this.handleChange} type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={this.handleChange} type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
          <br />
          <p>Don't have an account? <Link to="/register">Register.</Link></p>
        </Container>
      </div>
    );
  }
}

export default Login;
