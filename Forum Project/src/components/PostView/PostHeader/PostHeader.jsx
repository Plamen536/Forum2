import './PostHeader.css';
import { useNavigate } from 'react-router-dom';

/**
 * @module PostHeader
 * @description Header component for post display with navigation and author info
 *
 * @component
 * @param {object} props
 * @param {string} props.user - Username of post author
 * @param {string} props.title - Title of the post
 * @param {boolean} props.isAdmin - Flag indicating if current user is admin
 *
 * @example
 * return (
 *   <PostHeader
 *     user="JohnDoe"
 *     title="Post Title"
 *     isAdmin={false}
 *   />
 * )
 *
 * @returns {JSX.Element} Post header with navigation and title
 */

const PostHeader = ({ user, title, isAdmin }) => {
  const navigate = useNavigate();
  return (
    <div className="postHeader">
      <button onClick={() => navigate(-1)}>{'← Back'}</button>
      <h2>Author: {user}</h2>
      <h1>{title}</h1>
      {isAdmin && <button>Delete Post</button>}
      <hr />
    </div>
  );
};
export default PostHeader;
