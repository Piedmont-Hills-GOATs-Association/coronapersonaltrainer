import React from 'react';
import { Redirect } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ClientNavbar from './ClientNavbar';
import 'video-react/dist/video-react.css';
import { Player } from 'video-react';
import firebase from './firebase';

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: (<div></div>),
      fbuser: {},
      mdbuser: {},
      vidFile: "",
      objectURL: "",
      formVideoName: "",
      formIntensity: "low",
      formInstructions: "",
      show: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setShow = this.setShow.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
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
    if (e.target.id === "formVideo") {
      this.setState({
        vidFile: e.target.files[0],
        objectURL: URL.createObjectURL(e.target.files[0])
      });
    } else {
      this.setState({
        [e.target.id]: e.target.value
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.checkValidity()) {
      const formData = new FormData();
      formData.append('video', this.state.vidFile);
      formData.append('intensity', this.state.formIntensity);
      formData.append('videoName', this.state.formVideoName);
      formData.append('instructions', this.state.formInstructions);
      firebase.auth().currentUser.getIdToken(true).then(idToken => {
        fetch('http://localhost:3030/upload', {
          method: 'POST',
          headers: {
            'Token': idToken
          },
          body: formData
        })
          .then(response => response.text())
          .then(
            (result) => {
              if (result) this.setShow();
            },
            (error) => {
              console.log(error);
            }
          );
      }).catch(error => {
        console.log(error);
      });
    }
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
        <Container>
          {this.state.alert}
          <Modal show={this.state.show} onHide={this.setShow}>
            <Modal.Header>
              <Modal.Title>Success!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Video Uploaded Successfully!</Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={this.handleRedirect}>
                Go to Dashboard
              </Button>
            </Modal.Footer>
          </Modal>
          <h2>Create Your Content</h2><br/>
          <p>Record yourself and upload a video and/or a description of your workout/routine.</p>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formVideo">
              <Form.Label>Upload video</Form.Label>
              <Form.File required onChange={this.handleChange} accept="video/*" />
            </Form.Group>
            <Player src={this.state.objectURL} playsInline />
            <Form.Group>
              <Form.Check required label="Is this the right video?" />
            </Form.Group>
            <Form.Group controlId="formVideoName">
              <Form.Label>Video Name</Form.Label>
              <Form.Control onChange={this.handleChange} required type="text" placeholder="Enter a name for the video" />
            </Form.Group>
            <Form.Group controlId="formIntensity">
              <Form.Label>Intensity</Form.Label>
              <Form.Control onChange={this.handleChange} as="select">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formInstructions">
              <Form.Label>Describe your workout/routine (optional)</Form.Label>
              <Form.Control placeholder="Enter the stages of your workout, the steps to your routine, or any other helpful description." onChange={this.handleChange} as="textarea" style={{ width: "100%", minHeight: "400px" }} />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Create;
