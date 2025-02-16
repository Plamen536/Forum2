import { useState, useContext } from 'react';
import { AppContext } from '../../store/app.context';
import { db }  from '../../config/firebase-config';
import { ref, set, push } from 'firebase/database';


const UploadView = () => {  
    const { user } = useContext(AppContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Post submitted:', {title, content});
        setTitle('');
        setContent('');
    };

    if(!user) {
        return alert("You must be logged in to upload a post");
    }
    
    const post = {
        title,
        content,
        author: user.uid,
        createdOn: new Date().toString(),
    };

    try {
        const newPostRef = push(ref(db, 'posts'));
        set(newPostRef, post);
        setTitle('');
        setContent('');
        alert('Post uploaded successfully');
    }   catch (error) {
        console.error('Error uploading post:', error.message);
        alert('Error uploading post');
    }
    
    
    

    return (
        <div>
      <h2>Upload a Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
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