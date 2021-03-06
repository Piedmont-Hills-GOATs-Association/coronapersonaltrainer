import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import BrowseNavbar from './BrowseNavbar';
import firebase from './firebase';

class Home extends React.Component {
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
          <h1>Welcome!</h1>
          <p>Welcome to the Corona Personal Trainer, a program that can help keep you fit while you stay indoors during the COVID-19 shelter-in-place orders.</p>
          <p>
            <Button variant="primary" href="about">Learn more</Button>
          </p>
        </Jumbotron>
      </div>
    );
  }
}

export default Home;
