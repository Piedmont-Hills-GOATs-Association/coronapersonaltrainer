import React from 'react';
import { Link, Redirect } from "react-router-dom";
import ClientNavbar from './ClientNavbar';
import firebase from './firebase';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: (<div></div>),
      user: {}
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
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
        <ClientNavbar />
      </div>
    );
  }
}

export default Dashboard;
