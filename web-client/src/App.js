import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ErrorPage from './components/Error';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/about" component={About} exact/>
            <Route path="/dashboard" component={Dashboard} exact />
            <Route path="/login" component={Login} exact/>
            <Route path="/register" component={Register} exact/>
            <Route component={ErrorPage}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
