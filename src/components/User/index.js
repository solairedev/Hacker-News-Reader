import React, { Component } from 'react'
import TimeAgo from '../TimeAgo/'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import "./User.css"
import { fetchUserInfo } from '../Api/'

class User extends Component {
  constructor(props){
    super(props)
      this.state = {
        id         : this.props.id,
        about      : null,
        created    : null,
        karma      : null,
        submitted  : null,
        isLoading  : true,
      }
  };
  componentDidMount(){
    fetchUserInfo( this.state.id )
      .then( user => {
        this.setState({
          about     : user.about,
          created   : user.created,
          karma     : user.karma,
          submitted : user.submitted,
          isLoading : false
        })
    })
  }
  render(){
    return (
        <div className="Box">
        {this.state.isLoading ? (
          <SkeletonTheme color="#202020" highlightColor="#444">
            <p className="Title" style={{maxWidth: '15%', marginBottom: '8px'}} >
              <Skeleton duration="0.5" />
            </p>
            <p className="Meta" style={{maxWidth: '25%'}}>
              <Skeleton duration="0.5" />
              <Skeleton duration="0.5" />
              <Skeleton duration="0.5" />
            </p>
          </SkeletonTheme>
        ) : (
        <div>
          <h1 className="Title">{this.state.id}</h1>
          <div className="Meta">
            <p><strong>Created:</strong> <TimeAgo time={this.state.created} /></p>
            <p><strong>Karma:</strong> {this.state.karma}</p>
            {this.state.about === undefined ? (
              <span><strong>About:</strong> none</span>
              ) : (
               <p dangerouslySetInnerHTML={{ __html: '<strong>About</strong>: ' + this.state.about }} />
                )
              }
          </div>
        </div>
        )
      }
      </div>
    )
  }
}

export default User



