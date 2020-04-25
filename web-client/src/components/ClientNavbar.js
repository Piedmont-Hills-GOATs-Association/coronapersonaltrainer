import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import firebase from './firebase';

class ClientNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: (<div></div>)
    }
    this.logoff = this.logoff.bind(this);
  }

  logoff() {
    const redirect = () => {
      window.location.reload(false);
    };
    firebase.auth().signOut().then(function() {
      redirect();
    }).catch(function(error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Corona PT Web Client</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
            {
              this.props.user ? (
                <div>
                  <p>{this.props.user.email} <Button variant="primary" onClick={this.logoff}>Log Off</Button></p>
                </div>
              ) : <Button variant="primary" href="/login">Login</Button>
            }
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}


export default ClientNavbar;
