import { Suspense, useContext, useEffect, useState } from 'react';
import { getUserData } from '../../../services/users.service';
import { AppContext } from '../../store/app.context';

const Avatar = () => {
  const { user } = useContext(AppContext);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUserData(user.uid).then((data) =>
      setUserData(data[Object.keys(data)[0]])
    );
  }, [user]);

  return (
    <>
      <img src={userData.avatarUrl} alt="avatar" />
    </>
  );
};
export default Avatar;
