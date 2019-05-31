import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Routes from './routes';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Router>
          {Routes}
        </Router>
      </div>
    );
  }
}

export default App;
