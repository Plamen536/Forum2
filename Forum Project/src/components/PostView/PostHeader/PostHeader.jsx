const PostHeader = ({ user, title, isAdmin }) => {
  return (
    <div className="postHeader">
      <h2>Author: {user}</h2>
      <h1>{title}</h1>
      {isAdmin && <button>Delete Post</button>}
      <hr />
    </div>
  );
};
export default PostHeader;
