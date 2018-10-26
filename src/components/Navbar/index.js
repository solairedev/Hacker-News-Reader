import React from "react"
import {
  Link
} from 'react-router-dom'

import PropTypes from 'prop-types'

import "./Navbar.css"

import logo from "../../images/logo.jpg"
import { withRouter } from 'react-router'


class Navbar extends React.Component{
  static propTypes = {
    //match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    //history: PropTypes.object.isRequired
  }
  render(){
    const { location } = this.props

    const newNavClass    = (location.pathname.match(/^\/new/)    ? "active" : "")
    const topNavClass    = (location.pathname.match(/^\/top/)    ? "active" : "")
    const bestNavClass   = (location.pathname.match(/^\/best/)   ? "active" : "")
    const searchNavClass = (location.pathname.match(/^\/search/) ? "active" : "")

    return(
      <nav className="Navbar">
        <div className="Menu">
          <img className="Logo" src={logo} alt="Y-combinator" />
          <ul className="Navigation">
            <li>
              <Link className={newNavClass} to='/new/1'>New</Link>
            </li>
            <li>
              <Link className={topNavClass} to='/top/1'>Top</Link>
            </li>
            <li>
              <Link className={bestNavClass} to='/best/1'>Best</Link>
            </li>
            <li>
              <Link className={searchNavClass} to="/search/">Search</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar);
