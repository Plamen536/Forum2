import { Suspense, useContext, useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import { AppContext } from '../../store/app.context';
import { get, onValue, ref, update } from 'firebase/database';
import { db } from '../../../config/firebase-config';
import { useParams } from 'react-router-dom';
import './Comments.css';

/**
 * @module Comments
 * @description A component that displays and manages comments for a post
 * 
 * @component
 * @param {object} props
 * @param {string} props.id - Post ID from URL parameters
 * @param {object} props.user - Current user object from context
 * 
 * @example
 * return (
 *   <Comments />
 * )
 * 
 * @returns {JSX.Element} Comments section with like functionality and sorting
 */

const Comments = () => {
  const { id } = useParams();
  const { user } = useContext(AppContext);
  const [comments, setComments] = useState([]);
  const [sortByLikes, setSortByLikes] = useState(false);

  useEffect(() => {
    const commentsRef = ref(db, `posts/${id}/comments`);
    onValue(commentsRef, (snapshot) => {
      const commentsData = snapshot.val();
      if (commentsData) {
        const commentList = Object.entries(commentsData).map(
          ([id, comment]) => ({
            id,
            ...comment,
            likes: comment.likes || {},
          })
        );
        setComments(commentList);
      } else {
        setComments([]);
      }
    });
  }, [id]);

  const handleLikeClick = async (commentId) => {
    if (!user) return;

    const commentRef = ref(
      db,
      `posts/${id}/comments/${commentId}/likes/${user.uid}`
    );
    const snapshot = await get(commentRef);

    const updates = {};
    if (snapshot.exists()) {
      // User already liked - remove like
      updates[`posts/${id}/comments/${commentId}/likes/${user.uid}`] = null;
    } else {
      // User hasn't liked - add like
      updates[`posts/${id}/comments/${commentId}/likes/${user.uid}`] = true;
    }

    await update(ref(db), updates);
  };

  const isLikedByUser = (comment) => {
    return comment.likes && comment.likes[user?.uid];
  };

  const getLikesCount = (comment) => {
    return comment.likes ? Object.keys(comment.likes).length : 0;
  };

  const sortedComments = sortByLikes
    ? [...comments].sort((a, b) => getLikesCount(b) - getLikesCount(a))
    : comments;

  return (
    <Suspense fallback={<Loading />}>
      <div className="comments">
        <h2>Comments</h2>
        <div className="comments-header">
          <label className="sort-checkbox">
            <input
              type="checkbox"
              checked={sortByLikes}
              onChange={(e) => setSortByLikes(e.target.checked)}
            />
            Sort by most liked
          </label>
        </div>
        <hr />
        {sortedComments.map((comment) => (
          <div className="comment-container" key={comment.id}>
            <span className="avatar-icon-container">
              <img className="avatar-icon" src={comment.avatar} alt="avatar" />
              <i className="upvote">Upvotes: {getLikesCount(comment)}</i>
            </span>
            <div className="comment-content">
              {user && (
                <button
                  onClick={() => handleLikeClick(comment.id)}
                  className="like-unlike"
                >
                  {isLikedByUser(comment) ? 'Unlike' : 'Like'}
                </button>
              )}
              <h2>{comment.author}</h2>
              <h3>{comment.text}</h3>
            </div>
          </div>
        ))}
      </div>
    </Suspense>
  );
};

export default Comments;
