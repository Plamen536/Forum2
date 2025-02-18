import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { ref, onValue, get, update } from 'firebase/database';
import './Dashboard.css';
import { AppContext } from '../store/app.context';
import { db } from '../../config/firebase-config';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [sortByLikes, setSortByLikes] = useState(false);
  const { user } = useContext(AppContext);

  useEffect(() => {
    const postsRef = ref(db, 'posts');
    onValue(postsRef, (snapshot) => {
      const postsData = snapshot.val();
      if (postsData) {
        const postList = Object.entries(postsData).map(([id, post]) => ({
          id,
          ...post,
        }));
        setPosts(postList);
      } else {
        setPosts([]);
      }
    });
  }, []);

  const navigate = useNavigate();

  const handleClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleLike = async (postId) => {
    if (!user) return;

    const postRef = ref(db, `posts/${postId}/likes/${user.uid}`);
    const snapshot = await get(postRef);

    const updates = {};
    if (snapshot.exists()) {
      updates[`posts/${postId}/likes/${user.uid}`] = null;
    } else {
      updates[`posts/${postId}/likes/${user.uid}`] = true;
    }

    await update(ref(db), updates);
  };

  const isLikedByUser = (post) => {
    return post.likes && post.likes[user?.uid];
  };

  const getLikesCount = (post) => {
    return post.likes ? Object.keys(post.likes).length : 0;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  const sortedPosts = sortByLikes 
    ? [...posts].sort((a, b) => getLikesCount(b) - getLikesCount(a))
    : posts;

  return (
    <div className="dashboard">
      <h1>Posts</h1>
      <label>
          <input
            type="checkbox"
            checked={sortByLikes}
            onChange={(e) => setSortByLikes(e.target.checked)}
          />
          Sort by most liked
        </label>
      <hr />
      {sortedPosts.map((post) => (
        <div key={post.id} className="post">
          <h2>{post.title}</h2>
          <hr />
          <p>{post.content.length > 100 ? `${post.content.substring(0, 100)}...` : post.content}</p>
          <button onClick={() => handleClick(post.id)}>Details</button>
          {user && (
            <button onClick={() => handleLike(post.id)}>
              {isLikedByUser(post) ? 'Unlike' : 'Like'}
            </button>
          )}
          <h4>Likes: {getLikesCount(post)}</h4>
          <h4>Date: {formatDate(post.createdOn)}</h4>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
