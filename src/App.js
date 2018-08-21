import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/'
import Story  from './components/Story/'

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'


const StoriesList = [
  {
  title : 'Docker cannot be downloaded without logging into Docker Store ',
  url : 'https://google.com',
  source : 'https://github.com',
  rating : 293,
  author : 'dhuramas',
  dataTime : '4 hours ago',
  commentsCount : 1265
  }
  ,
  {
   title : 'Memristor – The fictional circuit element',
   url : 'https://google.com',
   source : 'http://Memristor.com',
   rating : 22,
   author : 'godelmachine',
   dataTime : '5 hours ago',
   commentsCount : 4
  }
  ,
  {
  title : 'Docker cannot be downloaded without logging into Docker Store ',
  url : 'https://google.com',
  source : 'https://github.com',
  rating : 293,
  author : 'dhuramas',
  dataTime : '4 hours ago',
  commentsCount : 1265
  }
  ,
  {
   title : 'Memristor – The fictional circuit element',
   url : 'https://google.com',
   source : 'http://Memristor.com',
   rating : 22,
   author : 'godelmachine',
   dataTime : '5 hours ago',
   commentsCount : 4
  }
  ,
  {
  title : 'Docker cannot be downloaded without logging into Docker Store ',
  url : 'https://google.com',
  source : 'https://github.com',
  rating : 293,
  author : 'dhuramas',
  dataTime : '4 hours ago',
  commentsCount : 1265
  }
  ,
  {
   title : 'Memristor – The fictional circuit element',
   url : 'https://google.com',
   source : 'http://Memristor.com',
   rating : 22,
   author : 'godelmachine',
   dataTime : '5 hours ago',
   commentsCount : 4
  }
]

const TestPageComments = () => {
  return (
        <h1>Comments Page</h1>
      );
}

const Home = () => {
  return (
      <div>
        <h1 className="Page-Title">News</h1>
        {StoriesList.map((story, index) => <Story index={index} title={story.title} url={story.url} source={story.source} rating={story.rating} author={story.author} dataTime={story.dataTime} commentCount={story.commentsCount} />)}
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
              <Route path="/" exact component={Home} />
              <Route path="/comments" component={TestPageComments} />
            </main>
          </div>
        </Router>
    );
  }
}

export default App;
