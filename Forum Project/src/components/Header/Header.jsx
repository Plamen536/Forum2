import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../store/app.context";
import { logoutUser } from "../../services/auth.service";
import "./Header.css";

export default function Header() {

    const { user, userData, setAppState } = useContext(AppContext);
    const navigate = useNavigate();
  
    const logout = () => {
      logoutUser()
        .then(() => {
          setAppState({
            user: null,
            userData: null
          });
          navigate('/login');
        })
        .catch((error) => {
          console.error(error.message);
        })
    }


    return (
        <div>
            <h1>Forum</h1>
            <div>
                <NavLink to="/">Home</NavLink> |&nbsp;
                <NavLink to="/trending">Trending</NavLink> |&nbsp;
                {!user && (<>
                <NavLink to="/login">Login</NavLink> |&nbsp;
                <NavLink to="/register">Register</NavLink>
                </>)}
                {user && <NavLink to="/upload">Upload</NavLink>}
                {user && <button onClick={logout}>Logout</button>}
            </div>
        </div>
    );
}
