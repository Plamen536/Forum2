import './PostHeader.css';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../store/app.context';
import { ref, get, update } from 'firebase/database';
import { db } from '../../../config/firebase-config';
import { useParams } from 'react-router-dom';
import { Box, Button, Input, Textarea } from '@chakra-ui/react';
import { getUserData } from '@/services/users.service';

const PostHeader = ({ user, title, content, isAdmin }) => {
  const navigate = useNavigate();
  const { user: currentUser } = useContext(AppContext);
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);
  const [userHandle, setUserHandle] = useState();
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

  useEffect(() => {
    getUserData(currentUser.uid)
      .then((data) => data[Object.keys(data)])
      .then((data) => setUserHandle(data.handle));
  }, []);

  const handleLike = async () => {
    if (!currentUser) return;

    const postRef = ref(db, `posts/${id}/likes/${currentUser.uid}`);
    const updates = {};

    if (isLiked) {
      updates[`posts/${id}/likes/${currentUser.uid}`] = null;
      setLikesCount((prev) => prev - 1);
    } else {
      updates[`posts/${id}/likes/${currentUser.uid}`] = true;
      setLikesCount((prev) => prev + 1);
    }

    await update(ref(db), updates);
    setIsLiked(!isLiked);
  };

  const handleSaveEdit = async () => {
    try {
      const updates = {};
      updates[`posts/${id}/title`] = editTitle;
      updates[`posts/${id}/content`] = editContent;

      await update(ref(db), updates);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post');
    }
  };

  return (
    <div className="postHeader">
      <div className="headerButtons">
        <button onClick={() => navigate(-1)}>{'← Back'}</button>
        {currentUser && (
          <button onClick={handleLike}>
            {isLiked ? 'Unlike:' : 'Like:'} {likesCount}
          </button>
        )}
        {currentUser && user === userHandle && (
          <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        )}
      </div>

      {isEditing ? (
        <Box p={4}>
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Edit title..."
            mb={3}
          />
          <Textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="Edit content..."
            mb={3}
          />
          <Button onClick={handleSaveEdit} colorScheme="teal" size="sm" mr={2}>
            Save
          </Button>
          <Button
            onClick={() => setIsEditing(false)}
            colorScheme="gray"
            size="sm"
          >
            Cancel
          </Button>
        </Box>
      ) : (
        <>
          <h2>Author: {user}</h2>
          <h1>{title}</h1>
        </>
      )}

      {isAdmin && <button>Delete Post</button>}
      <hr />
    </div>
  );
};

export default PostHeader;
