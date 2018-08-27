import React, { Component } from "react";
import TimeAgo from '../TimeAgo/'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';


import "./Story.css"

const API_SINGLE_STORY     = 'https://hacker-news.firebaseio.com/v0/item/'
const DEFAULT_FORMAT       = '.json';

class Story extends Component {
  constructor(props){
    super(props);
    this.state = {
      id           : this.props.id,
      index        : null,
      title        : null,
      url          : null,
      source       : null,
      rating       : null,
      author       : null,
      dataTime     : null,
      commentCount : null,
      isLoading    : true
    };
  }
  fetchSingleStory(id){
    return new Promise(resolve => {
      fetch(API_SINGLE_STORY + id + DEFAULT_FORMAT)
        .then(response => response.json())
        .then(data => {
          let item  = data
          resolve(item)
        })
    })
  }
  componentDidMount(){
    this.fetchSingleStory(this.state.id)
      .then((item) =>{
        this.setState({
          index        : item.id,
          title        : item.title,
          url          : item.url,
          rating       : item.score,
          author       : item.by,
          dataTime     : item.time,
          commentCount : item.descendants,
          isLoading    : false
        })
    })
  }
  render() {
    return (
        <article className="Story" ref="Story">
          <header className="Header">
            <h2 className="Title"><a target="_blank" href={this.state.url}>{this.state.title}</a></h2>
          </header>
          {!this.state.isLoading ? (
            <p className="Meta"> {this.state.rating} points by <a href={'https://news.ycombinator.com/user?id=' + this.state.author}>{this.state.author}</a> {this.state.dataTime ? (<TimeAgo time={this.state.dataTime} />) : ""}| <a href={'https://news.ycombinator.com/item?id=' + this.state.id}>{this.state.commentCount} comments</a> </p>
            ) : (
            <SkeletonTheme color="#202020" highlightColor="#444">
              <div style={{maxWidth: '75%'}} >
                  <Skeleton duration="0.5" />
                  <div style={{maxWidth: '45%'}} >
                    <Skeleton />
                  </div>
                </div>
              </SkeletonTheme>
            )
          }
        </article>
      );
  }
}
export default Story;
