import React from "react"
import {
  NavLink
} from 'react-router-dom'

import "./Navbar.css"
import logo from "../../images/logo.jpg"

class Navbar extends React.Component{
  render(){
    return(
      <nav className="Navbar">
        <div className="Menu">
          <img className="Logo" src={logo} alt="Y-combinator" />
          <ul class="Navigation">
            <li>
              <NavLink exact to='/'>News</NavLink>
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

export default Navbar;
