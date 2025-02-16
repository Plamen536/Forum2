import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../store/app.context';
import './Header.css';
import DropdownMenu from './DropdownMenu/DropdownMenu';
import Logout from '../Logout/Logout';

export default function Header() {
  const { user,  } = useContext(AppContext);

  const Test = false;

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
          {user && <Logout />}
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
