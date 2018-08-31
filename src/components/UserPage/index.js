import React, { Component } from 'react'
import User from '../User/'

class UserPage extends Component {
  constructor(props){
    super(props)
      this.state = {
        id : this.props.match.params.id,
      }
  };
  render(){
    return <User id={this.state.id} />
  }
}
export default UserPage



