import './PostHeader.css'
import { useNavigate } from 'react-router-dom';

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
