import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
      <div className="App">
        <RecordingControls 
          currentUser={this.state.currentUser}
        />
      </div>
    );
  }
}

export default App;
