import React, { Component } from "react";
import {
  Link
} from 'react-router-dom'


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
      storyPerPager  : 15,
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
            storyMaxPage : Math.ceil(data.length / this.state.storyPerPager)
          }, resolve())
      })
    })
  }
  fetchSingleStory(id, index){
    let rank = index + 1;
    return new Promise(resolve => {
      fetch(API_SINGLE_STORY + id + DEFAULT_FORMAT)
        .then(response => response.json())
        .then(data => {
          let item  = data
          item.rank = rank
          resolve(item)
        })
    })
  }
  fetchStoryForView(){
    let storyStartPoint = this.state.storyPerPager * (this.state.storyPage - 1)
    let storyEndPoint   = this.state.storyPerPager * this.state.storyPage
    let storyForView    = this.state.storyList.slice(storyStartPoint,storyEndPoint)

    let actions = storyForView.map(this.fetchSingleStory)
    let result  = Promise.all(actions)
    result.then(data => {
      this.setState({
        storyForView: data,
        isLoading : false
      })
    })
  }
  componentDidMount(){
    const { page } = this.props.match.params
    if (page !== undefined){
    this.setState({
        storyPage : parseInt(page,10),
        isLoading : true
      }, () =>{
        this.fetchStoryList().then(() => this.fetchStoryForView())
      });
    }
    else{
      this.fetchStoryList().then(() => this.fetchStoryForView())
    }
  }
  componentWillReceiveProps(nextProps) {
    const { page } = nextProps.match.params
    if (page !== undefined){
    this.setState({
        storyPage : parseInt(page,10),
        isLoading : true
      }, () =>{
        this.fetchStoryForView()
        this.renderStoryList()
      });
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
    const currentPage = this.state.storyPage
    const maxPage     = this.state.storyMaxPage
    const nextPage    = this.state.storyPage + 1;
    const prevPage    = this.state.storyPage - 1;
    return (
        <div>
          { this.renderStoryList() }
          <div className="List-manager">
            <div className="Control">
              {currentPage !== 1 && <Link to={'/news/' + prevPage}>&lt; prev</Link> }
              <span>{currentPage} / {maxPage}</span>
              {currentPage !== maxPage && <Link to={'/news/' + nextPage}>next &gt;</Link> }
            </div>
          </div>
        </div>
      );
  }
}
export default StoryListPage;
