import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

class Error extends React.Component {
  render() {
    return (
      <div>
      <Jumbotron>
        <h1>Well this is embarrassing!</h1>
        <p>You've navigated to an area that you just can't go to right now. It's okay, you can go back to our home page.</p>
        <p>
          <Button variant="primary" href="/">Go back home</Button>
        </p>
      </Jumbotron>
      </div>
    );
  }
}

export default Error;
