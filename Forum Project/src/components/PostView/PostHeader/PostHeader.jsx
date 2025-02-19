import './PostHeader.css';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../store/app.context';
import { ref, get, update } from 'firebase/database';
import { db } from '../../../config/firebase-config';
import { useParams } from 'react-router-dom';

const PostHeader = ({ user, title, isAdmin }) => {
  const navigate = useNavigate();
  const { user: currentUser } = useContext(AppContext);
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const postRef = ref(db, `posts/${id}/likes`);
      get(postRef).then((snapshot) => {
        if (snapshot.exists()) {
          const likes = snapshot.val();
          setLikesCount(Object.keys(likes).length);
          setIsLiked(!!likes[currentUser?.uid]);
        }
      });
    }
  }, [id, currentUser]);

  const handleLike = async () => {
    if (!currentUser) return;

    const postRef = ref(db, `posts/${id}/likes/${currentUser.uid}`);
    const updates = {};

    if (isLiked) {
      updates[`posts/${id}/likes/${currentUser.uid}`] = null;
      setLikesCount(prev => prev - 1);
    } else {
      updates[`posts/${id}/likes/${currentUser.uid}`] = true;
      setLikesCount(prev => prev + 1);
    }

    await update(ref(db), updates);
    setIsLiked(!isLiked);
  };

  return (
    <div className="postHeader">
      <div className="headerButtons">
        <button onClick={() => navigate(-1)}>{'← Back'}</button>
        {currentUser && (
          <button onClick={handleLike}>
            {isLiked ? 'Unlike' : 'Like'} ({likesCount})
          </button>
        )}
      </div>
      <h2>Author: {user}</h2>
      <h1>{title}</h1>
      {isAdmin && <button>Delete Post</button>}
      <hr />
    </div>
  );
};

export default PostHeader;