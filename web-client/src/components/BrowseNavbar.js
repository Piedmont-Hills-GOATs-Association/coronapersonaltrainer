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
          <Navbar.Brand href="/">Corona Personal Trainer</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/downloads">Downloads</Nav.Link>
            </Nav>
            {
              this.props.user ? (
                <div>
                  <NavDropdown title={this.props.user.email} id="basic-nav-dropdown">
                    <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={this.logoff}>Log Off</NavDropdown.Item>
                  </NavDropdown>
                </div>
              ) : <Button variant="primary" href="/login">Login</Button>
            }
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}


export default BrowseNavbar;
