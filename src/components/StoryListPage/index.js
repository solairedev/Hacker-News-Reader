import React, { Component } from "react";

import StoryList from '../StoryList'

const API_TOP_STORY_LIST   = 'https://hacker-news.firebaseio.com/v0/topstories.json';
const API_NEW_STORY_LIST   = 'https://hacker-news.firebaseio.com/v0/newstories.json';
const API_SINGLE_STORY     = 'https://hacker-news.firebaseio.com/v0/item/'
const DEFAULT_FORMAT       = '.json';

class StoryListPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      storyList      : [], // Just ID list
      storyForView   : [], // Real content filter by current page
      storyPerPager  : 10,
      storyPage      : 1,
      storyMaxPage   : null,
      isLoading      : true
    };
  }
  fetchStoryList(){
    return new Promise(resolve => {
      fetch(API_TOP_STORY_LIST)
      .then(response => response.json())
      .then(data => {
          this.setState({
            storyList    : data,
            storyMaxPage : data.length / this.state.storyPerPager
          }, resolve())
      })
    })
  }
  fetchSingleStory( ID_Story ){
    return new Promise(resolve => {
      fetch(API_SINGLE_STORY + ID_Story + DEFAULT_FORMAT)
        .then(response => response.json())
        .then(data => {
          let item = data
          resolve(item)
        })
    })
  }
  fetchStoryForView(){
    let storyStartPoint = this.state.storyPerPager * (this.state.storyPage - 1)
    let storyEndPoint   = this.state.storyPerPager * this.state.storyPage
    let storyForView    = this.state.storyList.slice(storyStartPoint,storyEndPoint)
    //console.log(storyStartPoint, " ", storyEndPoint)
    let actions = storyForView.map(this.fetchSingleStory)
    let result  = Promise.all(actions)
    result.then(data => {
      this.setState({
        storyForView: data,
        isLoading : false
      })
    })
  }
  nextPage(e){
    if (this.state.storyPage < this.state.storyMaxPage){
      this.setState({
          storyPage : this.state.storyPage + 1,
          isLoading : true
        }, () =>{
          this.fetchStoryForView()
          this.renderStoryList()
      })
    }
  }
  prevPage(e){
    if (this.state.storyPage > 1){
      this.setState({
          storyPage : this.state.storyPage - 1,
          isLoading : true
        }, () =>{
          this.fetchStoryForView()
          this.renderStoryList()
      })
    }
  }
  componentDidMount(){
    if (this.state.storyForView.length === 0){
      this.fetchStoryList().then(() => this.fetchStoryForView())
    }
  }
  renderStoryList(){
    if (this.state.isLoading) {
      return (
          <div className="Loading-caption">
            <span>
              Loading...
            </span>
          </div>
          );
    } else {
      return <StoryList stories={this.state.storyForView} />
    }
  }
  render() {
    return (
        <div>
          { this.renderStoryList() }
          <div className="List-manager">
            <div className="Control">
              <button onClick={e => this.prevPage(e)}>&lt; prev</button>
                <span>{this.state.storyPage}</span>
              <button onClick={e => this.nextPage(e)}>next &gt; </button>
            </div>
          </div>
        </div>
      );
  }
}
export default StoryListPage;
