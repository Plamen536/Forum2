import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../store/app.context';
import { getUserData } from '../../../services/users.service';

const Reply = ({ replyContent }) => {
  const [reply, setReply] = useState('');
  const { user } = useContext(AppContext);

  useEffect(() => {
    getUserData(user.uid)
      .then((data) => data[Object.keys(data)])
      .catch((error) => console.log(error));
  }, []);

  const handleReplayChange = (e) => {
    setReply(e.target.value);
  };

  const handleReplySubmit = () => {
    replyContent(reply);
    setReply('');
  };

  return (
    <div>
      <label htmlFor="replyContent">Enter text: </label>
      <br />
      <textarea
        onChange={handleReplayChange}
        value={reply}
        name="replyContent"
        id="replyContent"
        rows={1}
      />
      <br />
      <br />
      <button onClick={handleReplySubmit}>Submit</button>
    </div>
  );
};
Reply.propTypes = {
  replyContent: PropTypes.func.isRequired,
};

export default Reply;
