import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header>
      <h1>Innova Real Estate</h1>
      <nav>
        <ul>
          {user && (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              {/* Other authenticated links */}
            </>
          )}
        </ul>
      </nav>
      <div>
        {user ? (
          <>
            <span>Welcome, {user.username}!</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
