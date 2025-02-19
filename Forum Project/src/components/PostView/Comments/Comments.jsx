import { Suspense, useContext, useEffect, useMemo, useState } from 'react';
import Loading from '../Loading/Loading';
import { AppContext } from '../../store/app.context';
import { get, onValue, ref, update } from 'firebase/database';
import { db } from '../../../config/firebase-config';
import { useParams } from 'react-router-dom';
import './Comments.css';
import { getUserData } from '@/services/users.service';
import { Box, Button, Textarea } from '@chakra-ui/react';

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
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState('');
  const [userHandle, setUserHandle] = useState();

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

  useEffect(() => {
    if (user?.uid) {
      getUserData(user.uid)
        .then((data) => data[Object.keys(data)])
        .then((data) => setUserHandle(data.handle))
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, [user?.uid]);

  const handleEditClick = (comment) => {
    setEditingCommentId(comment.id);
    setEditText(comment.text);
  };

  const handleSaveEdit = async (commentId) => {
    const updates = {};
    updates[`posts/${id}/comments/${commentId}/text`] = editText;

    try {
      await update(ref(db), updates);
      setEditingCommentId(null);
      setEditText('');
    } catch (error) {
      console.error('Error updating comment:', error);
      alert('Failed to update comment');
    }
  };

  const handleLikeClick = async (commentId) => {
    if (!user) return;

    try {
      const commentRef = ref(
        db,
        `posts/${id}/comments/${commentId}/likes/${user.uid}`
      );
      const snapshot = await get(commentRef);

      const updates = {};
      if (snapshot.exists()) {
        updates[`posts/${id}/comments/${commentId}/likes/${user.uid}`] = null;
      } else {
        updates[`posts/${id}/comments/${commentId}/likes/${user.uid}`] = true;
      }

      await update(ref(db), updates);
    } catch (error) {
      console.error('Error updating like:', error);
      alert('Failed to update like');
    }
  };

  const isLikedByUser = (comment) => {
    return comment.likes && comment.likes[user?.uid];
  };

  const getLikesCount = (comment) => {
    return comment.likes ? Object.keys(comment.likes).length : 0;
  };

  const sortedComments = useMemo(() => {
    return sortByLikes
      ? [...comments].sort((a, b) => getLikesCount(b) - getLikesCount(a))
      : comments;
  }, [comments, sortByLikes]);

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
                <div>
                  <button
                    onClick={() => handleLikeClick(comment.id)}
                    className="like-unlike"
                  >
                    {isLikedByUser(comment) ? 'Unlike' : 'Like'}
                  </button>
                  {/* Only show edit button if the comment author matches current user */}
                  {user && userHandle === comment.author && (
                    <button onClick={() => handleEditClick(comment)}>
                      Edit
                    </button>
                  )}
                </div>
              )}
              <h2>{comment.author}</h2>
              {editingCommentId === comment.id ? (
                <Box>
                  <Textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    placeholder="Edit your comment..."
                  />
                  <Button
                    onClick={() => handleSaveEdit(comment.id)}
                    colorScheme="teal"
                    size="sm"
                    mt={2}
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => setEditingCommentId(null)}
                    colorScheme="gray"
                    size="sm"
                    mt={2}
                    ml={2}
                  >
                    Cancel
                  </Button>
                </Box>
              ) : (
                <h3>{comment.text}</h3>
              )}
            </div>
          </div>
        ))}
      </div>
    </Suspense>
  );
};

export default Comments;
