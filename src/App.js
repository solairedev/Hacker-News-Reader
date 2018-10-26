import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/'
import StoryListPage from './components/StoryListPage/'
import UserPage from './components/UserPage/'
import StoryPage from './components/StoryPage/'

import {
  //BrowserRouter as Router,
  HashRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'

const TestPageSearch = () => {
  return (
      <div className="Box">
        <h1 className="Title">This will be search page</h1>
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
              <Route path="/" exact={true} render={() => (<Redirect to="/new/1" />)} />
              <Route path="/new/:page" render={(props) => <StoryListPage {...props} type='new' />} />
              <Route path="/top/:page" render={(props) => <StoryListPage {...props} type='top' />} />
              <Route path="/best/:page" render={(props) => <StoryListPage {...props} type='best' />} />
              <Route path="/user/:id" component={UserPage} />
              <Route path="/item/:id" component={StoryPage} />
              <Route path="/search" component={TestPageSearch} />
            </main>
          </div>
        </Router>
    );
  }
}

export default App;
