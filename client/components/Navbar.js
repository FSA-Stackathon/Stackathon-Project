import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, authenticate } from '../store';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Cart from './Cart';

const Navigation = ({ handleLogout, isLoggedIn, createGuestUser }) => (
  <Navbar bg='light' variant='light' sticky='top'>
    <Container>
      <Navbar.Brand as={Link} to='/'>
        Trekkies Snowboard & Skis
      </Navbar.Brand>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Nav>
            <Nav.Link as={Link} to='/home'>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to='/' href='#' onClick={handleLogout}>
              logout
            </Nav.Link>
            <Nav.Link as={Link} to='/products'>
              Snowboards & Skis
            </Nav.Link>
            <Nav.Item
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Cart />
            </Nav.Item>
          </Nav>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Nav>
            <Nav.Link as={Link} to='/login'>
              Login
            </Nav.Link>
            <Nav.Link as={Link} to='/signup'>
              Sign Up
            </Nav.Link>
            <Nav.Link as={Link} to='/guest' onClick={createGuestUser}>
              Continue as Guest
            </Nav.Link>
            <Nav.Link as={Link} to='/'>
              Landing
            </Nav.Link>
            <Nav.Item
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Cart />
            </Nav.Item>
          </Nav>
        </div>
      )}
    </Container>
  </Navbar>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleLogout() {
      dispatch(logout());
    },
    createGuestUser() {
      dispatch(
        authenticate(
          'guestUser@me.com',
          'guestPW',
          'signup',
          'guestUser',
          'guestUser'
        )
      );
    },
  };
};

export default connect(mapState, mapDispatch)(Navigation);
