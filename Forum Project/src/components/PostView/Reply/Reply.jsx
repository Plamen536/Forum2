import { useState } from 'react';
import PropTypes from 'prop-types';

const Reply = ({ reply }) => {
  const [addReply, setAddReply] = useState('');

  const handleReplayChange = (e) => {
    setAddReply(e.target.value);
  };

  const handleReplySubmit = () => {
    reply(addReply);
    setAddReply('');
  };

  return (
    <div>
      <label htmlFor="reply">Enter text: </label>
      <br />
      <textarea
        onChange={handleReplayChange}
        value={addReply}
        name="reply"
        id="reply"
        rows={1}
      ></textarea>
      <br />
      <br />
      <button onClick={handleReplySubmit}>Submit</button>
    </div>
  );
};
Reply.propTypes = {
  reply: PropTypes.string,
};

export default Reply;
