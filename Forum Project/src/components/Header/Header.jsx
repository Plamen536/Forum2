import { NavLink } from "react-router-dom";
import "./Header.css";

export default function Header() {
    return (
        <div>
            <h1>Forum</h1>
            <div>
                <NavLink to="/">Home</NavLink> |&nbsp;
                <NavLink to="/trending">Trending</NavLink> |&nbsp;
                <NavLink to="/login">Login</NavLink> |&nbsp;
                <NavLink to="/register">Register</NavLink> |&nbsp;
                <NavLink to="/upload">Upload</NavLink> |&nbsp;
            </div>
        </div>
    );
}
