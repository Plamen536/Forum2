import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../store/app.context';
import './Header.css';
import DropdownMenu from './DropdownMenu/DropdownMenu';
import Logout from '../Logout/Logout';

export default function Header() {
  const { user } = useContext(AppContext);

  return (
    <header className="header">
      {user && <DropdownMenu />}
      <h1>Forum</h1>
      <nav className="navbar">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        {!user && (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
        {user && <NavLink to="/upload">Upload</NavLink>}
        {user && <Logout />}
      </nav>
    </header>
  );
}
