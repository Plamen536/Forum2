import './PostView.css';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../store/app.context';
import PostHeader from './PostHeader/PostHeader';
import PostContent from './PostContent/PostContent';
import PostActions from './PostActions/PostActions';
import { useParams } from 'react-router-dom';
import { onValue, ref } from 'firebase/database';
import { db } from '../../config/firebase-config';

const PostView = () => {
  const [viewComments, setViewComments] = useState(false);
  const [viewReply, setViewReply] = useState(false);
  const [reply, setReply] = useState([]);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { user } = useContext(AppContext);

  useEffect(() => {
    const postRef = ref(db, `posts/${id}`);

    const unsubscribe = onValue(postRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPost(data);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

  const toggleViewComments = () => {
    setViewComments(!viewComments);
  };

  const toggleViewReply = () => {
    setViewReply(!viewReply);
  };

  const handleAddReply = (newReply) => {
    setReply([...reply, newReply]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="postView">
      <div className="postViewUser">
        <PostHeader user={post.author} title={post.title} isAdmin={false} />
        <PostContent content={post.content} />
      </div>
      <div className="postViewButton">
        <PostActions
          likes={post.likes || 0}
          viewComments={viewComments}
          toggleViewComments={toggleViewComments}
          isLogged={!!user}
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
