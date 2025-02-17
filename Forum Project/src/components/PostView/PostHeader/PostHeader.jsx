import { useNavigate } from 'react-router-dom';

const PostHeader = ({ user, title, isAdmin }) => {
  const navigate = useNavigate();
  return (
    <div className="postHeader">
      <h2>Author: {user}</h2>
      <h1>{title}</h1>
      <button onClick={() => navigate(-1)}>Back</button><br />
      {isAdmin && <button>Delete Post</button>}
      <hr />
    </div>
  );
};
export default PostHeader;
