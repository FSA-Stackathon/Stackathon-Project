import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const Landing = (props) => {
  return (
    <div
      className='container-fluid'
      style={{
        backgroundImage:
          'url(https://cdn.pixabay.com/photo/2017/02/26/09/43/beatenberg-2099823_960_720.jpg)',
        height: '100vh',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <h1
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#808080',
        }}
      >
        Welcome to Trekkies Snowboards and Skis!
      </h1>
      <Container
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '27rem',
        }}
      >
        <Link to='/login'>
          <Button
            style={{ marginRight: '5rem', width: '15rem', height: '3rem' }}
            variant='secondary'
          >
            Login
          </Button>
        </Link>
        <Link to='/signup'>
          <Button
            style={{ marginRight: '5rem', width: '15rem', height: '3rem' }}
            variant='secondary'
          >
            Sign Up
          </Button>
        </Link>
        <Link to='/products'>
          <Button
            style={{ marginRight: '5rem', width: '15rem', height: '3rem' }}
            variant='secondary'
          >
            Guest
          </Button>
        </Link>
      </Container>
    </div>
  );
};

export default Landing;
