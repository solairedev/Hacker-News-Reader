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
      storyList           : [], // Full ID list
      storyForCurrentPage : [], // ID list for current page
      storyPerPager       : 30,
      storyPage           : 1,
      storyMaxPage        : null,
      isLoading           : true
    };
  }
  fetchStoryListID(){
    return new Promise(resolve =>{
      fetch(API_TOP_STORY_LIST)
        .then(response => response.json())
        .then(data => {
          resolve(data)
        })
    })
  }
  getStoryForCurrentPage(){
    let storyStartPoint = this.state.storyPerPager * (this.state.storyPage - 1)
    let storyEndPoint   = this.state.storyPerPager * this.state.storyPage
    let storyForCurrentPage    = this.state.storyList.slice(storyStartPoint,storyEndPoint)

    this.setState({
      storyForCurrentPage : storyForCurrentPage,
      isLoading           : false
    })
  }
  componentDidMount(){
    const { page } = this.props.match.params
    this.fetchStoryListID().then(data => {
      this.setState({
        storyList    : data,
        storyMaxPage : Math.ceil(data.length / this.state.storyPerPager),
        storyPage    : page !== undefined ? parseInt(page,10) : 1,
        }, () => this.getStoryForCurrentPage())
    })
  }
  componentWillReceiveProps(nextProps) {
    const { page } = nextProps.match.params
    if (this.state.storyPage !== page){
      window.scrollTo(0, 0)
      this.setState({
          storyPage    : page !== undefined ? parseInt(page,10) : 1,
          isLoading : true
        }, () => this.getStoryForCurrentPage());
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
      return <StoryList stories={this.state.storyForCurrentPage} />
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
