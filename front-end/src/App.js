import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Nav from './components/Nav';
import RecordingPage from './components/RecordingView/RecordingPage';
import AllSoundsPage from './components/AllSoundsView/AllSoundsPage';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: 3
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
            <Nav currentUser={this.state.currentUser} />
            <Route exact path="/sounds/:userId" component={AllSoundsPage}/>
            <Route path="/sounds/:userId/new" component={RecordingPage}/>
        </div>
      </Router>
    );
  }
}

export default App;
