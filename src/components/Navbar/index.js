import React from "react"
import {
  NavLink,
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
    const { match, location, history } = this.props

    const newsClass = (location.pathname.match(/^\/news/) || location.pathname === "/" ? "active" : "" ? "active" : "")

    return(
      <nav className="Navbar">
        <div className="Menu">
          <img className="Logo" src={logo} alt="Y-combinator" />
          <ul className="Navigation">
            <li>
              <Link className={newsClass} exact to='/'>News</Link>
            </li>
            <li>
              <NavLink to="/comments/">Comments</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar);
