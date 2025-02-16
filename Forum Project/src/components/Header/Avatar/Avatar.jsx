import { useContext, useEffect, useState } from 'react';
import { getUserData } from '../../../services/users.service';
import { AppContext } from '../../store/app.context';

const Avatar = () => {
  const { user } = useContext(AppContext);
  const [userData, setUserData] = useState({});

  {
    user &&
      useEffect(() => {
        getUserData(user.uid).then((data) =>
          setUserData(data[Object.keys(data)[0]])
        );
      }, []);
  }

  return (
    <>
      <img src={userData.avatarUrl} alt="avatar" />
    </>
  );
};
export default Avatar;
