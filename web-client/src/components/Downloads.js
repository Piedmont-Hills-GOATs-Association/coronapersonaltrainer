import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import BrowseNavbar from './BrowseNavbar';
import firebase from './firebase';

class Downloads extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fbuser: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((fbuser) => {
      if (fbuser) {
        this.setState({ fbuser });
      }
    });
  }

  render() {
    return (
      <div>
        <BrowseNavbar fbuser={this.state.fbuser}/>
        <Jumbotron>
          <h1>Downloads</h1>
          <p>Download the java client, where you can login and find out your BMI and change your account settings.</p>
          <p>
            <Button variant="success" href="#">Java Client</Button>
          </p>
        </Jumbotron>
      </div>
    );
  }
}

export default Downloads;
