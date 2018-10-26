import React, { Component } from 'react'
import TimeAgo from '../TimeAgo/'
import { fetchSingleItem } from '../Api/'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Link } from 'react-router-dom'


class Comment extends Component{
  constructor(props){
    super(props)
    this.state = {
      id        : this.props.id,
      text      : null,
      time      : null,
      by        : null,
      kids      : undefined,
      deleted   : false,
      isLoading : true
    }
  }
  componentDidMount(){
    fetchSingleItem(this.state.id)
      .then(item => {
        this.setState({
          text      : item.text,
          time      : item.time,
          by        : item.by,
          kids      : item.kids,
          deleted   : item.deleted,
          isLoading : false
        })
      })
  }
  render(){
  const isLoading = this.state.isLoading
  const deleted   = this.state.deleted
  const kids      = this.state.kids
  if ( deleted ) return null
  return (
    <div>
      { !isLoading ? (
      <div className="Box">
        <div className="Meta">
          <p style={{marginBottom : '5px'}}>
            <Link to={'/user/' + this.state.by}><strong>{this.state.by}</strong></Link> <TimeAgo time={this.state.time} />
          </p>
        </div>
        <div className="Content" dangerouslySetInnerHTML={{ __html: this.state.text }} />
        <div className="Reply">
          {kids !== undefined && kids.map((item) =>
          <Comment id = { item } key = { item } />
          )}
        </div>
      </div>
        ) : (
        <SkeletonTheme color="#202020" highlightColor="#444">
        <div className="Box">
          <div className="Meta">
            <p style={{width: '20%', marginBottom : '5px'}}>
              <Skeleton duration="0.5" />
            </p>
            <p>
              <Skeleton duration="0.5" />
            </p>
          </div>
        </div>
        </SkeletonTheme>
      )}
    </div>
    )
  }
}

export default Comment
