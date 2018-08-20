import React from "react"
import {
  Link,
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
              <Link to='/'>New</Link>
            </li>
            <li>
              <Link to="/comments">Comments</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar;
