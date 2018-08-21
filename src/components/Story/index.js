import React, { Component } from "react";

import "./Story.css"

class Story extends Component {
  constructor(props){
    super(props);
    this.state = {
      index        : this.props.index + 1,
      title        : this.props.title,
      url          : this.props.url,
      source       : this.props.source,
      rating       : this.props.rating,
      author       : this.props.author,
      dataTime     : this.props.dataTime,
      commentCount : this.props.commentCount
    };
  }
  render() {
    return (
        <article className="Story" ref="Story">
          <header className="Header">
            <h2 className="Title"><a href={this.state.url}>{this.state.index}. {this.state.title}</a></h2>
          </header>
          <p className="Meta">
            <a href={this.state.source} className="MetaItem"><i class="fas fa-globe-americas"></i> {this.state.source}</a>
            <span className="MetaItem"><i class="fas fa-user"></i> {this.state.author}</span>
            <span className="MetaItem"><i class="fas fa-clock"></i> {this.state.dataTime}</span>
            <span className="MetaItem"><i class="fas fa-comments"></i> {this.state.commentCount}</span>
            <span className="MetaItem"><i class="fas fa-thumbs-up"></i> {this.state.rating}</span>
          </p>
        </article>
      );
  }
}
export default Story;
