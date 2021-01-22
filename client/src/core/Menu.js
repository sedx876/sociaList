import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth'

const Menu = () => (
  <div>
    <Link to='/'>Home</Link>
    <Link to='/signin'>Log In</Link>
    <Link to='/signup'>Create Account</Link>
  </div>
)

export default Menu