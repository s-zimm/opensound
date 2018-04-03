import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Nav from './components/Nav';
import RecordingControls from './components/RecordingControls';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: 1
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
            <Nav currentUser={this.state.currentUser} />
            <Route path="/sounds/:userId/new" component={RecordingControls}/>
        </div>
      </Router>
    );
  }
}

export default App;
