import React from 'react';
import './Home.css';
import PostsAndUsers from '../../Posts&Users/Posts&Users';

const Home = () => {
  return (
    <div className="Home">
      <h1>Welcome to the Forum</h1>
      <p>This is the home page of the forum project.</p>
      <hr />
      <PostsAndUsers />
    </div>
  );
};

export default Home;
