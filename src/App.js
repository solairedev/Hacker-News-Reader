import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/'
import StoryListPage from './components/StoryListPage/'

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

const TestPageComments = () => {
  return (
      <div>
        <h1>Comments</h1>
      </div>
      );
}
class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Navbar />
            <main>
              <Route path="/" exact component={StoryListPage} />
              <Route path="/comments" component={TestPageComments} />
            </main>
          </div>
        </Router>
    );
  }
}

export default App;
