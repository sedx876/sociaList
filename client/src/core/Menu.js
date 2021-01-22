import React from 'react';
import { Link, withRouter } from 'react-router-dom';
// import { signout, isAuthenticated } from '../auth'


const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: '#ff9900' }
  else return { color: '#ffffff' }
}

export const signout = next => {
  if (typeof window !== 'undefined') localStorage.removeItem('jwt')
  next()
  return fetch('http://localhost:8080/api/signout', {
      method: 'GET'
  })
      .then(response => {
          console.table('signout', response)
          return response.json()
      })
      .catch(err => console.table(err))
}

const Menu = ({history}) => (
  <div>
    <ul className='nav nav-tabs bg-primary'>
      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, '/')} to="/">
          sociaList
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">
          Log In
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">
          Create Account
        </Link>
      </li>

      <li className="nav-item">
        <span className="nav-link" 
          style={{ cursor: 'pointer', color: '#fff' }} 
          onClick={() => signout(() => history.push('/'))}>
          Sign Out 
        </span>
      </li>
    </ul>
  </div>
)

export default withRouter(Menu)