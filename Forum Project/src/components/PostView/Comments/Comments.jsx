import { Suspense } from 'react';
import Loading from '../Loading/Loading';

const Comments = () => {
  const comment = {
    name: 'John Doe',
    comment: 'This is a comment\nThis is on new line comment',
  };

  /**
   * @function renderCommentsWithBreaks
   * @description Splits the comments string by newline characters and returns an array of <p> elements.
   * @param {string} comments - The post comments to be split.
   * @returns {JSX.Element[]} An array of <p> elements with the split comments.
   */
  const renderCommentsWithBreaks = (comment) => {
    return comment.split('\n').map((line, index) => <p key={index}>{line}</p>);
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="comments">
        <h2>Comments</h2>
        <h3>{comment.name}</h3>
        {renderCommentsWithBreaks(comment.comment)}
      </div>
    </Suspense>
  );
};
export default Comments;
