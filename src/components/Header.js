import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Header.css';
import logo from '../assets/logo.png';

function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/">
            {/*<img src={logo} alt="Innova Real Estate Logo" className="logo" />*/}
          </Link>
          {/*<h1>Innova Real Estate</h1>*/}
        </div>
        <nav>
          <ul className="nav-links">
            {user && (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/Contact">Contact</Link>
                </li>
                <li>
                  <Link to="/About">About</Link>
                </li>
                {/* Otras rutas para usuarios autenticados */}
              </>
            )}
          </ul>
        </nav>
        <div className="auth-buttons">
          {user ? (
            <>
              <span> {user.username}</span>
              <button onClick={logout} className="logout-button">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="login-button">Login</button>
              </Link>
              <Link to="/register">
                <button className="register-button">Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
