import React, { Component } from 'react';
import Story from '../Story';
import { fetchSingleItem } from '../Api/'
import Comment from '../Comment/'
import './StoryPage.css'

class StoryPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      id        : this.props.match.params.id,
      kids      : null,
      isLoading : true
    }
  }
  componentDidMount(){
    fetchSingleItem(this.state.id)
      .then(item => {
          this.setState({
            kids      : item.kids,
            isLoading : false
          })
        }
      )
  }
  render(){
    const id        = this.state.id
    const kids      = this.state.kids
    const isLoading = this.state.isLoading
    return (
      <div className="StoryPage">
        <Story key = { id } id = { id } />
        {!isLoading && kids !== undefined && kids.map((item) => <Comment id = { item } key = { item } />)}
      </div>
    )
  }
}

export default StoryPage
