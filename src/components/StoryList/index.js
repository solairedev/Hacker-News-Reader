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
        {stories.map((id) =>
          <Story
            key = {id}
            id  = {id}
          />
        )}
      </div>
      );
  }
}
export default StoryList;
