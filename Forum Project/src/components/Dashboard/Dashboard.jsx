import { Link, NavLink, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import PropTypes from 'prop-types';
import './Dashboard.css';

const Dashboard = () => {
  const db = getDatabase();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postsRef = ref(db, "posts");
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

  return (
    <div className='dashboard'>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.id} className='post'>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <button onClick={() => handleClick(post.id)}>Details</button>
          <h6>Likes: {post.likes}</h6>
          <h6>Date: {post.date}</h6>
        </div>
      ))}
    </div>
  );
};

Dashboard.propTypes = {
  userId: PropTypes.string,
  postId: PropTypes.string,
};

export default Dashboard;
