import { Suspense, useState } from 'react';
import Avatar from '../Avatar/Avatar';
import { Link, useNavigate } from 'react-router-dom';
import './DropdownMenu.css';
import Loading from '../../PostView/Loading/Loading';

const DropdownMenu = () => {
  const [menuView, setMenuView] = useState(false);
  const navigate = useNavigate();
  const isAdmin = false;

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
              <Link to="/profile">
                <span>Your profile</span>
              </Link>
            </li>
            <li>
              <Link>
                <span>Your posts</span>
              </Link>
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
