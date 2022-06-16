import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, authenticate} from '../store'

const Navbar = ({handleLogout, isLoggedIn, createGuestUser}) => (
  <div>
    <h1>Trekkies Snowboard & Skis</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/" href="#" onClick={handleLogout}>logout</Link>
          <Link to="/products">Snowboards & Skis</Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/guest" onClick={createGuestUser}>Continue as Guest</Link>
          <Link to="/">Landing</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleLogout() {
      dispatch(logout())
    },
    createGuestUser() {
      dispatch(authenticate('guestUser@me.com', 'guestPW', 'signup', 'guestUser', 'guestUser'))
    },
  }
}

export default connect(mapState, mapDispatch)(Navbar)
