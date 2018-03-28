import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import RecordingControls from './components/RecordingControls';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RecordingControls />
      </div>
    );
  }
}

export default App;
