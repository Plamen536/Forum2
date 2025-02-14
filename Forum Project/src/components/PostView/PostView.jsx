import './PostView.css';
import { useState } from 'react';
import PostHeader from './PostHeader/PostHeader';
import PostContent from './PostContent/PostContent';
import PostActions from './PostActions/PostActions';

const PostView = () => {
  const [viewComments, setViewComments] = useState(false);
  const [viewReply, setViewReply] = useState(false);
  const [reply, setReply] = useState([]);
  const isLogged = true;

  // test object
  const post = {
    user: 'AaAAaAzZzzZ',
    title: 'Post Title',
    likes: 1134,
    content:
      'Each post must have a user who created it.\nThe title must be between 16 and 64 symbols.\nThe content must be between 32 symbols and 8192 symbols.\nThe post must have a user who created it.\nOther users must be able to post replies.',
  };

  /**
   * @function toggleViewComments
   * @description Switches the viewComments state between true and false.
   */
  const toggleViewComments = () => {
    setViewComments(!viewComments);
  };

  /**
   * @function toggleViewReply
   * @description Switches the replyView state between true and false.
   */
  const toggleViewReply = () => {
    setViewReply(!viewReply);
  };

  const handleAddReply = (newReply) => {
    setReply([...reply, newReply]);
  };

  return (
    <div className="postView">
      <div className="postViewUser">
        <PostHeader user={post.user} title={post.title} isAdmin={true} />
        <PostContent content={post.content} />
      </div>
      <div className="postViewButton">
        <PostActions
          likes={post.likes}
          viewComments={viewComments}
          toggleViewComments={toggleViewComments}
          isLogged={isLogged}
          viewReply={viewReply}
          toggleViewReply={toggleViewReply}
          handleAddReply={handleAddReply}
          reply={reply}
        />
      </div>
    </div>
  );
};
export default PostView;
