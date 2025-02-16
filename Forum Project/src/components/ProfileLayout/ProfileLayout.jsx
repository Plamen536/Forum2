import { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AppContext } from '../store/app.context';
import Logout from '../Logout/Logout';

const ProfileLayout = () => {
  const { user } = useContext(AppContext);
  
  return (
    <div className="profile-layout">
      {/* Custom profile header/navigation */}
      <div className="profile-header">
        <nav className="profile-nav">
          <NavLink to={'/'}>Home</NavLink> |&nbsp;
          {user && <NavLink to="/upload">Upload</NavLink>}&nbsp;
          {user && <Logout />}
        </nav>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default ProfileLayout;
