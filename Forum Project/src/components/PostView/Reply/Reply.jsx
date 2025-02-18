import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../store/app.context';
import { getUserData } from '../../../services/users.service';
import { push, ref } from 'firebase/database';
import { useParams } from 'react-router-dom';
import { db } from '../../../config/firebase-config';
import './Reply.css'

const Reply = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [reply, setReply] = useState('');
  const [userData, setUserData] = useState({});
  const { user } = useContext(AppContext);

  useEffect(() => {
    if (!user?.uid) return;

    setIsLoading(true);
    getUserData(user.uid)
      .then((data) => setUserData(data[Object.keys(data)]))
      .catch((error) => {
        console.error('Error fetching user data:', error);
        alert('Error loading user data');
      })
      .finally(() => setIsLoading(false));
  }, [user?.uid]);

  const replySubmit = async () => {
    try {
      const newReply = {
        avatar: userData.avatarUrl,
        text: reply,
        author: userData.handle,
        timestamp: Date.now(),
      };
      await push(ref(db, `posts/${id}/comments`), newReply);
      setReply('');
      alert('Successfully posted reply!');
    } catch (error) {
      console.error('Error posting reply:', error.message);
      alert('Error posting reply!');
    }
  };

  const handleReplayChange = (e) => {
    setReply(e.target.value);
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!reply.trim()) {
      alert('Please enter a reply');
      return;
    }
    replySubmit();
  };

  return (
    <div className='reply-form'>
      <form onSubmit={handleReplySubmit}>
        <label htmlFor="postComment">Enter text: </label>
        <br />
        <textarea
          onChange={handleReplayChange}
          value={reply}
          name="postComment"
          id="postComment"
          rows={1}
        />
        <br />
        <br />
        <button onSubmit={handleReplySubmit}>Submit</button>
      </form>
    </div>
  );
};

export default Reply;
