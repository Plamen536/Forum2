import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../store/app.context';
import { logoutUser } from '../../services/auth.service';
import './Header.css';
import { getUserData } from '../../services/users.service';

export default function Header() {
  const { user, setAppState } = useContext(AppContext);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getUserData(user.uid).then((data) =>
      setUserData(data[Object.keys(data)[0]])
    );
  }, [user]);

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

  return (
    <div>
      <h1>Forum</h1>
      {user && <img src={userData.avatarUrl} alt="avatar" />}
      <div>
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
      </div>
    </div>
  );
}
