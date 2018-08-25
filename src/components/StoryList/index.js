import React, { Component } from "react";

import Story from "../Story";

const API = 'https://api.hackerwebapp.com/news';
const DEFAULT_QUERY = '?page=1';

class StoryList extends Component {
  constructor(props){
    super(props);
    this.state = {
      stories : this.props.stories
    };
  }
  componentDidMount(){
    if (this.state.isNeedFetch){
      fetch(API + DEFAULT_QUERY)
        .then(response => response.json())
        .then(data => this.setState({
          stories: data,
          isNeedFetch : false
        }));
    }
  }
  render() {
    return (
        <div>
        {this.state.stories.map((story, index) =>
          <Story
            key={story.id}
            test ={story.id}
            index={index}
            title={story.title}
            url={story.url}
            source={story.domain}
            rating={story.points}
            author={story.user}
            dataTime={story.time_ago}
            commentCount={story.comments_count}
          />
        )}
      </div>
      );
  }
}
export default StoryList;
