import React from 'react';
import { Redirect } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import ClientNavbar from './ClientNavbar';
import firebase from './firebase';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: (<div></div>),
      redirect: (<div></div>),
      fbuser: {},
      mdbuser: {},
      formHeight: '',
      formWeight: '',
      show: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.setShow = this.setShow.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  setShow() {
    this.setState({
      show: !this.state.show
    });
  }

  handleRedirect() {
    this.setState({
      redirect: (<Redirect to="/dashboard" />)
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSave(e) {
    e.preventDefault();
    e.stopPropagation();
    firebase.auth().currentUser.getIdToken(true).then(idToken => {
      fetch('http://localhost:3030/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Token': idToken
        },
        body: JSON.stringify({
          height: this.state.formHeight,
          weight: this.state.formWeight
        })
      })
        .then(response => response.text())
        .then(
          (result) => {
            this.setShow();
          },
          (error) => {
            console.log(error);
            this.setState({
              alert: (<Alert variant="danger">Something went wrong. Please try again.</Alert>)
            });
          }
        );
    }).catch(error => {
      console.log(error)
      this.setState({
        alert: (<Alert variant="danger">Something went wrong. Please try again.</Alert>)
      });
    });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((fbuser) => {
      if (fbuser) {
        this.setState({ fbuser });
        firebase.auth().currentUser.getIdToken(true).then(idToken => {
          fetch('http://localhost:3030/user?action=data', {
            method: 'GET',
            headers: {
              'Token': idToken
            }
          })
            .then(response => response.json())
            .then(
              (result) => {
                this.setState({
                  mdbuser: result
                });
              },
              (error) => {
                console.log(error);
              }
            );
        }).catch(error => {
          console.log(error);
        });
      } else {
        this.setState({
          redirect: (<Redirect to="/" />)
        });
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.redirect}
        <ClientNavbar username={this.state.mdbuser.username} />
        <Modal show={this.state.show} onHide={this.setShow}>
          <Modal.Header closeButton>
            <Modal.Title>Success!</Modal.Title>
          </Modal.Header>
          <Modal.Body>You have successfully changed your account info. Would you like to go back to the dashboard or stay here?</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.setShow}>
              Close
            </Button>
            <Button variant="success" onClick={this.handleRedirect}>
              Go to Dashboard
            </Button>
          </Modal.Footer>
        </Modal>
        <Container fluid>
          {this.state.alert}
          <h4>My Account Info</h4>
          <Form onSubmit={this.handleSave}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control readOnly defaultValue={this.state.fbuser.email} />
            </Form.Group>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control readOnly defaultValue={this.state.mdbuser.username} />
            </Form.Group>
            <Form.Group controlId="formHeight">
              <Form.Label>Height (in inches)</Form.Label>
              <Form.Control onChange={this.handleChange} placeholder="Enter height in inches" defaultValue={this.state.mdbuser.height} />
            </Form.Group>
            <Form.Group controlId="formWeight">
              <Form.Label>Weight (in pounds)</Form.Label>
              <Form.Control onChange={this.handleChange} placeholder="Enter weight in pounds" defaultValue={this.state.mdbuser.weight} />
            </Form.Group>
            <Button variant="primary" type="submit">Save</Button>
          </Form>
          <br />
        </Container>
      </div>
    );
  }
}

export default Dashboard;
