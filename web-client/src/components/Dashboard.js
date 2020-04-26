import React from 'react';
import { Redirect } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ClientNavbar from './ClientNavbar';
import firebase from './firebase';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: (<div></div>),
      fbuser: {},
      mdbuser: {
        videos: []
      }
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((fbuser) => {
      if (fbuser) {
        this.setState({ fbuser });
        firebase.auth().currentUser.getIdToken(true).then(idToken => {
          fetch('http://localhost:3030/user?action=data', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
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
          <h1>Dashboard</h1><br/>
          <Row className="justify-content-md-center">
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>Get Started</Card.Title>
                  <Card.Text>
                    Input some information about your physical well-being to help find a good exercise for you.
                  </Card.Text>
                  <Button variant="primary" href="/account">Access account info</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>Browse for Exercises</Card.Title>
                  <Card.Text>
                    Look at some exercises and videos uploaded by other people to get started right away.
                  </Card.Text>
                  <Button variant="primary">Find exercises</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>Add an Exercise</Card.Title>
                  <Card.Text>
                    Upload an exercise video to share with people your workout and routine.
                  </Card.Text>
                  <Button variant="primary" href="/create">Upload video</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br/>
          <h3>Your Videos</h3>
          <br/>
          <Row className="justify-content-md-center">
          {this.state.mdbuser.videos.map((video, i) => {
            return (
              <>
                <Col key={`${i}.1`}>
                  <Card key={`${i}.2`} style={{ width: '18rem' }}>
                    <Card.Body key={`${i}.4`}>
                      <Card.Title key={`${i}.5`}>{video.filename}</Card.Title>
                      <Card.Text key={`${i}.6`}>
                        {video.description}
                      </Card.Text>
                      <Button key={`${i}.7`} variant="primary" href={`/watch?v=${video.filename}`}>Watch</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </>
            )
          })}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
