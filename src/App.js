import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

const TestPageComments = () => {
  return (
        <h1>Comments Page</h1>
      );
}

const Home = () => {
  return (
        <h1>Home Page</h1>
      );
}

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Navbar />
            <main>
              <Route path="/" exact={true} component={Home} />
              <Route path="/comments" component={TestPageComments} />
            </main>
          </div>
        </Router>
    );
  }
}

export default App;
