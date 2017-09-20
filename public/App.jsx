import React from 'react';
import Home from './Home.jsx';
import Login from './Login.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
  HashRouter,
  Redirect
} from 'react-router-dom';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true
    }
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Route path="/home" component={Home} />
          <Route exact path="/" component={Login} />
        </div>
      </HashRouter>
    )
  }
}