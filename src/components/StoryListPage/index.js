import React, { Component } from "react";

import Story from "../Story";

const API = 'https://api.hackerwebapp.com/news';
const DEFAULT_QUERY = '?page=1';

class StoryListPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      stories : this.props.stories,
      isLoading : true
    };
  }
  componentDidMount(){
      fetch(API + DEFAULT_QUERY)
        .then(response => response.json())
        .then(data => {
          this.setState({
            stories: data,
            isLoading : false
          })
          this.renderStoryList();
        }
      );
  }
  renderStoryList(){
    if (this.state.isLoading) {
      return (
          <span>
            Loading...
          </span>
          );
    } else {
      return (
        this.state.stories.map((story, index) =>
              <Story
                key={story.id}
                id ={story.id}
                index={index}
                title={story.title}
                url={story.url}
                source={story.domain}
                rating={story.points}
                author={story.user}
                dataTime={story.time_ago}
                commentCount={story.comments_count}
              />
              )
        )

        }

  }
  render() {
    return (
        <div>
          <h1>News</h1>
          { this.renderStoryList() }
        </div>
      );
  }
}
export default StoryListPage;
