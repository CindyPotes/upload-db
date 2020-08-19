import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import List from '../pages/list/list';
import Upload from '../pages/upload/upload';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/list" component={List} />
          <Route exact path="/" component={Upload} />
        </div>
      </Router>
    );
  }
}

export default App;
