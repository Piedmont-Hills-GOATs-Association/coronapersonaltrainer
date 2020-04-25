import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import BrowseNavbar from './BrowseNavbar';
import firebase from './firebase';

class Downloads extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  render() {
    return (
      <div>
        <BrowseNavbar user={this.state.user}/>
        <Jumbotron>
          <h1>Downloads</h1>
          <p>
            <Button variant="success" href="#">Java Client</Button>{' '}
            <Button variant="warning" href="#">iOS App</Button>
          </p>
        </Jumbotron>
      </div>
    );
  }
}

export default Downloads;
