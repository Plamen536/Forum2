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
        } else {
          setLikesCount(0);
          setIsLiked(false);
        }
      });
    }
  }, [id, currentUser]);

  useEffect(() => {
    getUserData(currentUser.uid)
      .then((data) => data[Object.keys(data)])
      .then((data) => setUserHandle(data.handle));
  }, [currentUser]);

  const deletePost = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const updates = {};
      updates[`posts/${id}`] = null;
      updates[`users/${user}/posts/${id}`] = null;

      await update(ref(db), updates);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  };

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
    const updates = {};
    const isTitleValid =
      editTitle && editTitle.length >= 16 && editTitle.length <= 32;
    const isContentValid =
      editContent && editContent.length >= 32 && editContent.length <= 8192;

    let hasValidChanges = false;

    if (isTitleValid) {
      updates[`posts/${id}/title`] = editTitle;
      updates[`users/${user}/posts/${id}/title`] = editTitle;
      hasValidChanges = true;
    } else if (editTitle && editTitle.trim().length > 0) {
      alert(`Title must be between 16 and 32 symbols`);
    }

    if (isContentValid) {
      updates[`posts/${id}/content`] = editContent;
      updates[`users/${user}/posts/${id}/content`] = editContent;
      hasValidChanges = true;
    } else if (editContent && editContent.trim().length > 0) {
      alert(`Content must be between 32 and 8192 symbols`);
    }

    if (hasValidChanges) {
      try {
        await update(ref(db), updates);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating post:', error);
        alert('Failed to update post');
      }
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
      {(isAdmin || user === userHandle) && (
        <button onClick={deletePost} style={{ backgroundColor: '#dc3545' }}>
          Delete Post
        </button>
      )}
      <hr />
    </div>
  );
};

export default PostHeader;
