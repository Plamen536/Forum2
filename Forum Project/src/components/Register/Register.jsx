import { AppContext } from "../store/app.context";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/auth.service";
import { createUserHandle, getUserByHandle } from "../../services/users.service";

export default function Register() {
  const { setAppState } = useContext(AppContext);
  const [user, setUser] = useState({
    handle: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const register = async () => {
    if (!user.handle || !user.email || !user.password) {
      return alert('Please enter username, email, and password');
    }

    try {
      const userFromDB = await getUserByHandle(user.handle);
      if (userFromDB) {
        throw new Error(`User with handle ${user.handle} already exists`);
      }

      const userCredential = await registerUser(user.email, user.password);
      await createUserHandle(user.handle, userCredential.user.uid, user.email);

      setAppState({
        user: userCredential.user,
        userData: null,
      });
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  const updateUser = (prop) => (e) => {
    setUser({
      ...user,
      [prop]: e.target.value,
    });
  };

  return (
    <div>
      <h3>Register</h3>
      <div>
        <label htmlFor="handle">Username: </label>
        <input value={user.handle} onChange={updateUser('handle')} type="text" name="handle" id="handle" />
        <br /><br />
        <label htmlFor="email">Email: </label>
        <input value={user.email} onChange={updateUser('email')} type="email" name="email" id="email" />
        <br /><br />
        <label htmlFor="password">Password: </label>
        <input value={user.password} onChange={updateUser('password')} type="password" name="password" id="password" />
        <button onClick={register}>Register</button>
      </div>
    </div>
  );
}