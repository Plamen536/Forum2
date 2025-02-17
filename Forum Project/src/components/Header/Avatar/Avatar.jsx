import { useContext, useEffect, useState } from 'react';
import { getUserData } from '../../../services/users.service';
import { AppContext } from '../../store/app.context';

const Avatar = () => {
  const { user } = useContext(AppContext);
  const [userData, setUserData] = useState({});

  {
    user &&
      useEffect(() => {
        getUserData(user.uid)
          .then((data) => data[Object.keys(data)[0]])
          .then((data) => setUserData(data.avatarUrl))
          .catch((error) => console.log(error.message));
      }, [user]);
  }

  return (
    <>
      <img src={userData} alt="avatar" />
    </>
  );
};
Avatar.displayName = 'Avatar';
export default Avatar;
