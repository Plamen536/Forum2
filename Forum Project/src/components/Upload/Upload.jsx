import { useState, useContext } from 'react';
import { AppContext } from '../store/app.context';


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
        return <p>Log in to upload a post</p>;
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