import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AppContext } from '../../store/app.context';
import Comments from '../Comments/Comments';
import Reply from '../Reply/Reply';
import './PostActions.css';

const PostActions = ({
  viewComments,
  toggleViewComments,
  isLogged,
  viewReply, 
  toggleViewReply,
  reply,
}) => {
  const { user } = useContext(AppContext);

  return (
    <div className="postActions">
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
  viewComments: PropTypes.bool,
  toggleViewComments: PropTypes.func,
  isLogged: PropTypes.bool,
  viewReply: PropTypes.bool,
  toggleViewReply: PropTypes.func,
  handleAddReply: PropTypes.func,
  reply: PropTypes.array,
};

export default PostActions;