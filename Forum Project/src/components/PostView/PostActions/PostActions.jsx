import PropTypes from 'prop-types';
import Comments from '../Comments/Comments';
import Reply from '../Reply/Reply';
import './PostActions.css';

/**
 * @module PostActions
 * @description Handles post interaction actions like comments and replies
 *
 * @component
 * @param {object} props
 * @param {number} props.likes - Number of likes on the post
 * @param {boolean} props.viewComments - Flag to show/hide comments
 * @param {Function} props.toggleViewComments - Function to toggle comments visibility
 * @param {boolean} props.isLogged - User login status
 * @param {boolean} props.viewReply - Flag to show/hide reply section
 * @param {Function} props.toggleViewReply - Function to toggle reply visibility
 * @param {Array} props.reply - Array of replies
 *
 * @example
 * return (
 *   <PostActions
 *     likes={5}
 *     viewComments={false}
 *     toggleViewComments={() => {}}
 *     isLogged={true}
 *     viewReply={false}
 *     toggleViewReply={() => {}}
 *     reply={[]}
 *   />
 * )
 *
 * @returns {JSX.Element} Post actions container with comments and reply options
 */

const PostActions = ({
  likes,
  viewComments,
  toggleViewComments,
  isLogged,
  viewReply,
  toggleViewReply,
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
      {viewReply && <Reply />}
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
