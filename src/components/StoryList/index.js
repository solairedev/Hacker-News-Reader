import React, { Component } from "react";

import Story from "../Story";

class StoryList extends Component {
  constructor(props){
    super(props);
    this.state = {
      stories : this.props.stories
    };
  }
  render() {
    const stories = this.state.stories;
    return (
        <div className="StoryList">
        {stories.map((story, index) =>
          <Story
            key={story.id}
            id ={story.id}
            index={index}
            title={story.title}
            url={story.url}
            rating={story.score}
            author={story.by}
            dataTime={story.time}
            commentCount={story.descendants}
          />
        )}
      </div>
      );
  }
}
export default StoryList;
