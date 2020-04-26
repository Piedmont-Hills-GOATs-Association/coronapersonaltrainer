import React from 'react';
import { Redirect } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import ClientNavbar from './ClientNavbar';
import queryString from 'query-string';
import timestampToDate from 'timestamp-to-date';
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
      objectURL: "",
      query: queryString.parse(props.location.search),
      meta: {}
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
            fetch(`http://localhost:3030/upload?action=video&v=${this.state.query.v}`, {
              method: 'GET',
              headers: {
                'Token': idToken
              }
            })
              .then(response => response.blob())
              .then(
                (result) => {
                  this.setState({
                    objectURL: URL.createObjectURL(result)
                  });
                },
                (error) => {
                  console.log(error);
                }
              );
            fetch(`http://localhost:3030/upload?action=meta&v=${this.state.query.v}`, {
              method: 'GET',
              headers: {
                'Token': idToken
              }
            })
              .then(response => response.json())
              .then(
                (result) => {
                  this.setState({
                    meta: result
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
          <h2>{this.state.meta.filename}</h2><br/>
          <p><strong>Date Published:</strong> {timestampToDate(this.state.meta.timestamp, 'MM/dd/yyyy')}</p>
          <p><strong>BMI During Video:</strong> {this.state.meta.bmi}</p>
          <p><strong>Intensity:</strong> {this.state.meta.intensity}</p>
          <Player src={this.state.objectURL} playsInline /><br/>
          <p><strong>Description:</strong></p>
          <p>{this.state.meta.description}</p>
        </Container>
      </div>
    );
  }
}

export default Create;
