import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import BrowseNavbar from './BrowseNavbar';
import firebase from './firebase';
import holder from "../holder_profile.svg";
import './About.css';

class About extends React.Component {
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
        <BrowseNavbar user={this.state.fbuser}/>
        <div className="container">
          <h1>Meet the people behind the program:</h1>
          <Row>
            <Col xs={6} md={3}>
              <Image src={holder} roundedCircle />
            </Col>
            <Col xs={6} md={3}>
              <Image src={holder} roundedCircle />
            </Col>
            <Col xs={6} md={3}>
              <Image src={holder} roundedCircle />
            </Col>
            <Col xs={6} md={3}>
              <Image src={holder} roundedCircle />
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={3}>
              <h3>Brian Vo</h3>
            </Col>
            <Col xs={6} md={3}>
              <h3>Manav Dixit</h3>
            </Col>
            <Col xs={6} md={3}>
              <h3>Tony Hong</h3>
            </Col>
            <Col xs={6} md={3}>
              <h3>Jerry Xu</h3>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default About;
