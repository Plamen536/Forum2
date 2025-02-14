import { Link, NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './TrendingView.css';

const TrendingView = ({ userId, postId }) => {
  const navigate = useNavigate();

  const obj = {
    user: 'az',
    post: {
      title: 'New Title',
      date: '2025-02-15',
      likes: 100,
    },
  };

  const handleClick = () => {
    navigate('/post');
    // navigate(`/post/${postId}`);
  };

  return (
    <div>
      <h3>Author: {obj.user}</h3>
      <h1>{obj.post.title}</h1>
      <button onClick={handleClick}>Details</button>
      <h6>Likes: {obj.post.likes}</h6>
      <h6>Date: {obj.post.date}</h6>
    </div>
    //with DB template
    //   <div>
    //   <h3>Author: {userId}</h3>
    //   <h1>{postId.title}</h1>
    //   <h6>Likes: {postId.likes}</h6>
    //   <h6>Date: {postId.date}</h6>
    // </div>
  );
};

TrendingView.propTypes = {
  userId: PropTypes.array,
  postId: PropTypes.array,
};

export default TrendingView;
