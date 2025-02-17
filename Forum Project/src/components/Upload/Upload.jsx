import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../store/app.context';
import { db } from '../../config/firebase-config';
import { ref, set, push } from 'firebase/database';
import { getUserData } from '../../services/users.service';

const UploadView = () => {
  const { user } = useContext(AppContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userHandle, setUserHandle] = useState({});

  useEffect(() => {
    getUserData(user.uid).then((data) =>
      setUserHandle(data[Object.keys(data)[0]])
    );
  }, []);

  const postsDB = async () => {
    try {
      const newPostRef = push(ref(db, 'posts'));
      const postId = newPostRef.key;

      const post = {
        title,
        content,
        author: userHandle.handle,
        createdOn: new Date().toString(),
        uid: postId,
      };

      await Promise.all([
        set(ref(db, `posts/${postId}`), post),
        set(ref(db, `users/${userHandle.handle}/posts/${postId}`), post),
      ]);

      setTitle('');
      setContent('');
      alert('Post uploaded successfully');
    } catch (error) {
      console.error('Error uploading post:', error.message);
      alert('Error uploading post');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    if (!title || !content) {
      alert(`Please enter title and content`);
      isValid = false;
    }
    if (title.length < 16 || title.length > 64) {
      alert(`The title must be between 16 and 64 symbols.`);
      isValid = false;
    }
    if (content.length < 32 || content.length > 8192) {
      alert(`The content must be between 32 symbols and 8192 symbols.`);
      isValid = false;
    }

    if (isValid) {
      console.log('Post submitted:', { title, content });
      postsDB();
    }
  };

  if (!user) {
    return alert('You must be logged in to upload a post');
  }

  

  return (
    <div>
      <h2>Upload a Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content: </label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UploadView;
