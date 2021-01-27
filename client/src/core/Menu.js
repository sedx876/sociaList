import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';


const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: '#ff9900' };
  else return { color: '#ffffff' };
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
        <Link className="nav-link" style={isActive(history, '/users')} to="/users">
          Members Directory
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
      <Link to={`/findpeople`} style={isActive(history, `/findpeople`)} className="nav-link">
        Find People
      </Link>
    </li>

  <li className="nav-item">
    <span className="nav-link">
      <Link to={`/user/${isAuthenticated().user._id}`}
      style={(isActive(history, `/user/${isAuthenticated().user._id}`))}>
      {`${isAuthenticated().user.name} Profile`} 
      </Link>
    </span>
  </li>

	<li className="nav-item">
    <span className="nav-link" 
      style={{ cursor: 'pointer', color: '#fff' }} 
      onClick={() => signout(() => history.push('/'))}>
      Log Out 
    </span>
  </li>
  </>}
  </ul>
  </div>
)

export default withRouter(Menu)