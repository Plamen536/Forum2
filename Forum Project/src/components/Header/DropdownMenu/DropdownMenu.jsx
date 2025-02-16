import { useState } from 'react';
import Avatar from '../Avatar/Avatar';
import { NavLink, useNavigate } from 'react-router-dom';
import './DropdownMenu.css';

const DropdownMenu = () => {
  const [menuView, setMenuView] = useState(false);
  
  const isAdmin = false;
  // isAdmin is for test purpose

  const handleClick = () => {
    setMenuView(!menuView);
  };

  return (
    <div className="dropdown-menu">
      {!menuView ? (
        <>
          <button onClick={handleClick}>
            <Avatar />
            <span>Username</span>
          </button>
        </>
      ) : (
        <>
          <button onClick={handleClick} className="back">
            X
          </button>
          <hr />
          <ul>
            <li>
              <NavLink to="/your-profile">
                <span>Your profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/your-posts">
                <span>Your posts</span>
              </NavLink>
            </li>
            <hr />
            <li>Status: {!isAdmin ? <>User ✅</> : <>Admin 👑</>}</li>
          </ul>
        </>
      )}
    </div>
  );
};
export default DropdownMenu;
