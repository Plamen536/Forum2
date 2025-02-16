import { useContext, useEffect, useState } from 'react';
import Avatar from '../../Header/Avatar/Avatar';
import { AppContext } from '../../store/app.context';
import { getUserData } from '../../../services/users.service';

const ProfileView = () => {
  const { user } = useContext(AppContext);
  const [data, setData] = useState('');

  const uploadFile = (formData) => {
    const file = formData.get('image');
    console.log(file.name);
    alert(`file: ${file}`);
  };

  useEffect(() => {
    getUserData(user.uid)
      .then((data) => setData(data[Object.keys(data)[0]]))
      .catch((error) => error.message);
  }, [user]);

  return (
    <div>
      <h1>Profile</h1>
      <Avatar />
      <h2>Username: {data.handle}</h2>
      <h4>firstName: {data.firstName}</h4>
      <h4>lastName: {data.lastName}</h4>
      <hr />
      <h2>Settings</h2>
      <form action={uploadFile}>
        <label htmlFor="image">Upload image of avatar</label>
        <input type="file" name="image" />
        <button type="submit">Change avatar</button>
      </form>
    </div>
  );
};
export default ProfileView;
