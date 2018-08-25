import React, { Component } from "react";

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

      hasUserMark  : false
    };
  }
  // Just style yet
  userMark(){
    this.setState({hasUserMark: !this.state.hasUserMark})
  }
  render() {
    let mark_class = this.state.hasUserMark ? "MetaItem is-active" : "MetaItem ";

    return (
        <article className="Story" ref="Story">
          <header className="Header">
            <h2 className="Title"><a href={this.state.url}>{this.state.index}. {this.state.title}</a></h2>
          </header>
          <p className="Meta">
            <a href={'https://news.ycombinator.com/from?site=' + this.state.source} className="MetaItem"><i class="fas fa-globe-americas"></i> {this.state.source}</a>
            <a href={'https://news.ycombinator.com/user?id=' + this.state.author} className="MetaItem"><i class="fas fa-user"></i> {this.state.author}</a>
            <a href={'https://news.ycombinator.com/item?id=' + this.state.id}  className="MetaItem"><i class="fas fa-clock"></i> {this.state.dataTime}</a>
            <a href={'https://news.ycombinator.com/item?id=' + this.state.id}  className="MetaItem"><i class="fas fa-comments"></i> {this.state.commentCount}</a>
            <span className={mark_class}><i class="fas fa-thumbs-up"></i> {this.state.rating}</span>
          </p>
        </article>
      );
  }
}
export default Story;
