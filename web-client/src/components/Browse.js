import React from 'react';
import { Redirect } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ClientNavbar from './ClientNavbar';
import firebase from './firebase';

class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: (<div></div>),
      fbuser: {},
      mdbuser: {},
      vidList: []
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
          fetch(`http://localhost:3030/upload?action=list`, {
            method: 'GET',
            headers: {
              'Token': idToken
            }
          })
            .then(response => response.json())
            .then(
              (result) => {
                this.setState({
                  vidList: result
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
          <Row className="justify-content-md-center">
            {this.state.vidList.map((video, i) => {
              const vQuery = video;
              const vidName = video.split('(')[0];
              const username = video.split('(')[1].split(')')[0];
              return (
                <>
                  <Col key={`${i}.1`}>
                    <Card key={`${i}.2`} style={{ width: '18rem' }}>
                      <Card.Body key={`${i}.4`}>
                        <Card.Title key={`${i}.5`}>{vidName}</Card.Title>
                        <Card.Text key={`${i}.6`}>
                          by {username}
                        </Card.Text>
                        <Button key={`${i}.7`} variant="primary" href={`/watch?v=${vQuery}`}>Watch</Button>
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

export default Browse;
