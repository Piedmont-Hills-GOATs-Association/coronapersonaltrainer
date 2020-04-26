import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import firebase from './firebase';

class BrowseNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: (<div></div>)
    }
    this.logoff = this.logoff.bind(this);
  }

  logoff() {
    firebase.auth().signOut().then(() => {
      window.location.reload(false);
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="/">CPT Web Client</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/#">Browse</Nav.Link>
              <Nav.Link href="/create">Create</Nav.Link>
              <Nav.Link href="/account">Account</Nav.Link>
            </Nav>
            <Navbar.Brand disabled>
              Welcome, {this.props.username}!
            </Navbar.Brand>
            <Button variant="danger" onClick={this.logoff}>Log Off</Button>
          </Navbar.Collapse>
        </Navbar>
        <br />
      </div>
    )
  }
}


export default BrowseNavbar;
