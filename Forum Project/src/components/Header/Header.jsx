import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../store/app.context';
import { logoutUser } from '../../services/auth.service';
import './Header.css';
import { getUserData } from '../../services/users.service';
import Avatar from './Avatar/Avatar';
import DropdownMenu from './DropdownMenu/DropdownMenu';

export default function Header() {
  const { user, setAppState } = useContext(AppContext);
  const navigate = useNavigate();

  const Test = false;

  const logout = () => {
    logoutUser()
      .then(() => {
        setAppState({
          user: null,
          userData: null,
        });
        navigate('/login');
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  if (!Test) {
    return (
      <div>
        {user && <DropdownMenu />}
        <h1>Forum</h1>
        <nav>
          <NavLink to="/">Home</NavLink> |&nbsp;
          <NavLink to="/dashboard">Dashboard</NavLink> |&nbsp;
          {!user && (
            <>
              <NavLink to="/login">Login</NavLink> |&nbsp;
              <NavLink to="/register">Register</NavLink>
            </>
          )}
          {user && <NavLink to="/upload">Upload</NavLink>}
          {user && <button onClick={logout}>Logout</button>}
        </nav>
      </div>
    );
  } else {
    return (
      <>
        <DropdownMenu />
      </>
    );
  }
}
