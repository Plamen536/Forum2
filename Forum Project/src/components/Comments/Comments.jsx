const Comments = () => {
  const comment = {
    name: "John Doe",
    comment: "This is a comment",
  };
  return (
    <div>
      <h1>Comments</h1>
      <h2>{comment.name}</h2>
      <p>{comment.comment}</p>
    </div>
  );
};
export default Comments;
