import React, { Component } from "react";
import TimeAgo from '../TimeAgo/'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import {
  Link
} from 'react-router-dom'
import { fetchSingleItem } from '../Api/'
import "./Story.css"


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
  componentDidMount(){
    fetchSingleItem(this.state.id)
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
          <p className="Meta"> {this.state.rating} points by <Link to={'/user/' + this.state.author}>{this.state.author}</Link> {this.state.dataTime ? (<TimeAgo time={this.state.dataTime} />) : ""}| <Link to={'/item/' + this.state.id}>{this.state.commentCount} comments</Link> </p>
            ) : (
            <SkeletonTheme color="#202020" highlightColor="#444">
              <div style={{marginBottom: '3px', maxWidth: '75%'}} >
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
