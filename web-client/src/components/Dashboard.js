import React from 'react';
import { Redirect } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ClientNavbar from './ClientNavbar';
import holder from "../holder_card.svg";
import firebase from './firebase';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: (<div></div>),
      user: {}
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
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
        <ClientNavbar />
        <Container>
          <Row className="justify-content-md-center">
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={holder} />
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
                <Card.Img variant="top" src={holder} />
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
                <Card.Img variant="top" src={holder} />
                <Card.Body>
                  <Card.Title>Add an Exercise</Card.Title>
                  <Card.Text>
                    Upload an exercise video to share with people your workout and routine.
                  </Card.Text>
                  <Button variant="primary">Upload video</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
