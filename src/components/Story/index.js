import React, { Component } from "react";
import TimeAgo from '../TimeAgo/'
import "./Story.css"

class Story extends Component {
  constructor(props){
    super(props);
    this.state = {
      id           : this.props.id,
      index        : this.props.index + 1,
      title        : this.props.title,
      url          : this.props.url,
      source       : this.props.source,
      rating       : this.props.rating,
      author       : this.props.author,
      dataTime     : this.props.dataTime,
      commentCount : this.props.commentCount,
    };
  }
  render() {
    return (
        <article className="Story" ref="Story">
          <header className="Header">
            <h2 className="Title"><a target="_blank" href={this.state.url}>{this.state.index}. {this.state.title}</a></h2>
          </header>
          <p className="Meta">
            {this.state.rating} points by <a href={'https://news.ycombinator.com/user?id=' + this.state.author}>{this.state.author}</a> <TimeAgo time={this.state.dataTime} /> | <a href={'https://news.ycombinator.com/item?id=' + this.state.id}>{this.state.commentCount} comments</a>
          </p>
        </article>
      );
  }
}
export default Story;
