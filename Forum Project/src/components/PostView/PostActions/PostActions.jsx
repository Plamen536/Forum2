import PropTypes from 'prop-types';
import Comments from '../Comments/Comments';
import Reply from '../Reply/Reply';

const PostActions = ({
  likes,
  viewComments,
  toggleViewComments,
  isLogged,
  viewReply,
  toggleViewReply,
  handleAddReply,
  reply,
}) => {
  /**
   * @function renderLikesWithK
   * @description Formats the likes count to include 'k' for thousands.
   * @param {number} likes - The number of likes.
   * @returns {string} The formatted likes count.
   */
  const renderLikesWithK = (likes) => {
    if (likes < 1000) {
      return likes.toString();
    }
    return (likes / 1000).toFixed(1) + 'k';
  };

  return (
    <div className="postActions">
      <span>Likes: {renderLikesWithK(likes)}</span>
      <button onClick={toggleViewComments}>
        {!viewComments ? (
          <>Comments ( 。_ 。)</>
        ) : (
          <> Hide Comments ( ﾉ ﾟｰﾟ)ﾉ</>
        )}
      </button>
      {isLogged && (
        <button onClick={toggleViewReply}>
          {!viewReply ? <>Reply</> : <>Hide Reply</>}
        </button>
      )}
      {viewReply && <Reply replyContent={handleAddReply} />}
      {viewComments && <Comments onAddReply={reply} />}
    </div>
  );
};

PostActions.propTypes = {
  likes: PropTypes.number,
  viewComments: PropTypes.string,
  toggleViewComments: PropTypes.func,
  isLogged: PropTypes.bool,
  viewReply: PropTypes.bool,
  toggleViewReply: PropTypes.func,
  handleAddReply: PropTypes.func,
  reply: PropTypes.array,
};
export default PostActions;
