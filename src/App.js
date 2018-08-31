import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/'
import StoryListPage from './components/StoryListPage/'
import UserPage from './components/UserPage/'

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

const TestPageComments = () => {
  return (
      <div className="Box">
        <h1 className="Title">Comments</h1>
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
              <Route path="/" exact={true} component={StoryListPage} />
              <Route path="/news/:page" component={StoryListPage} />
              <Route path="/user/:id" component={UserPage} />
              <Route path="/comments" component={TestPageComments} />
            </main>
          </div>
        </Router>
    );
  }
}

export default App;
