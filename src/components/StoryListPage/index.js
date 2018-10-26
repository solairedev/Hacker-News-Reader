import React, { Component } from "react";
import {
  Link
} from 'react-router-dom'
import { fetchStoryListID } from '../Api/'
import StoryList from '../StoryList'


class StoryListPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      storyList           : [], // Full ID list
      storyForCurrentPage : [], // ID list for current page
      storyPerPager       : 30,
      storyPage           : 1,
      storyMaxPage        : null,
      isLoading           : true,
      type                : this.props.type
    };
  }
  getStoryForCurrentPage(){
    let storyStartPoint     = this.state.storyPerPager * (this.state.storyPage - 1)
    let storyEndPoint       = this.state.storyPerPager * this.state.storyPage
    let storyForCurrentPage = this.state.storyList.slice(storyStartPoint,storyEndPoint)

    this.setState({
      storyForCurrentPage : storyForCurrentPage,
      isLoading           : false
    })
  }
  componentDidMount(){
    const { page } = this.props.match.params
    fetchStoryListID( this.props.type ).then(data => {
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
    const currentPage  = this.state.storyPage
    const maxPage      = this.state.storyMaxPage
    const nextPageLink = '/' + this.state.type + '/' + ( this.state.storyPage + 1 ).toString();
    const prevPageLink = '/' + this.state.type + '/' + ( this.state.storyPage - 1 ).toString();
    return (
        <div>
          { this.renderStoryList() }
          <div className="List-manager">
            <div className="Control">
              {currentPage !== 1 && <Link to={prevPageLink}>&lt; prev</Link> }
              <span>{currentPage} / {maxPage}</span>
              {currentPage !== maxPage && <Link to={nextPageLink}>next &gt;</Link> }
            </div>
          </div>
        </div>
      );
  }
}
export default StoryListPage;
