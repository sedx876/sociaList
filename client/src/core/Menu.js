import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth'


const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: '#ff9900' }
  else return { color: '#ffffff' }
}

const Menu = ({history}) => (
  <div>
    <ul className='nav nav-tabs bg-primary'>
      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, '/')} to="/">
          sociaList
        </Link>
      </li>

    {!isAuthenticated() && (
      <>
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
    </>
    )}

  {isAuthenticated() && 
  <>
  <li className="nav-item">
    <span className="nav-link" 
      style={{ cursor: 'pointer', color: '#fff' }} 
      onClick={() => signout(() => history.push('/'))}>
      Sign Out 
    </span>
  </li>

  <li className="nav-item">
    <span className="nav-link">
      {isAuthenticated().user.name} 
    </span>
  </li>
  </>}
  </ul>
  </div>
)

export default withRouter(Menu)