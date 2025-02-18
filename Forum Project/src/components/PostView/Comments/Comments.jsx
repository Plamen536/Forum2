import { Suspense, useContext, useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import { getUserData } from '../../../services/users.service';
import { AppContext } from '../../store/app.context';
import { get, onValue, ref } from 'firebase/database';
import { db } from '../../../config/firebase-config';
import { useParams } from 'react-router-dom';
import './Comments.css';

const Comments = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments(get(ref(db, `posts/${id}/comments`)));
  }, []);

  useEffect(() => {
    const commentsRef = ref(db, `posts/${id}/comments`);
    onValue(commentsRef, (snapshot) => {
      const commentsData = snapshot.val();
      if (commentsData) {
        const commentList = Object.entries(commentsData).map(
          ([id, comment]) => ({
            id,
            ...comment,
          })
        );
        setComments(commentList);
      } else {
        setComments([]);
      }
    });
  }, []);

  /**
   * @function renderCommentsWithBreaks
   * @description Splits the comments string by newline characters and returns an array of <p> elements.
   * @param {string} comments - The post comments to be split.
   * @returns {JSX.Element[]} An array of <p> elements with the split comments.
   */

  return (
    <Suspense fallback={<Loading />}>
      <div className="comments">
        <h2>Comments</h2>
        <hr />
        {comments.map((comment) => (
          <div className="comment-container" key={comment.id}>
            <span className="avatar-icon-container">
              <img className="avatar-icon" src={comment.avatar} alt="avatar" />
            </span>
            <div className="comment-content">
              <h3>{comment.author}</h3>
              <h3>{comment.text}</h3>
            </div>
          </div>
        ))}
      </div>
    </Suspense>
  );
};
export default Comments;
