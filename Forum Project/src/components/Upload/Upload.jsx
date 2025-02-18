import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../store/app.context';
import { db } from '../../config/firebase-config';
import { ref, set, push } from 'firebase/database';
import { getUserData } from '../../services/users.service';
import {
  Box,
  Button,
  Input,
  Textarea,
  Text,
  Stack,
} from '@chakra-ui/react';

const UploadView = () => {
  const { user } = useContext(AppContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userHandle, setUserHandle] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    getUserData(user.uid).then((data) =>
      setUserHandle(data[Object.keys(data)[0]]),
    );
  }, [user]);

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
      setError('Error uploading post');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    setError(''); // Reset error message

    if (!title || !content) {
      setError('Please enter title and content');
      isValid = false;
    } else if (title.length < 16 || title.length > 64) {
      setError('The title must be between 16 and 64 symbols.');
      isValid = false;
    } else if (content.length < 32 || content.length > 8192) {
      setError('The content must be between 32 symbols and 8192 symbols.');
      isValid = false;
    }

    if (isValid) {
      console.log('Post submitted:', { title, content });
      postsDB();
    }
  };

  if (!user) {
    return (
      <Box p={5} bg="red.300" borderRadius="md" boxShadow="xl">
        <Text color="red.800" fontSize="lg">You must be logged in to upload a post</Text>
      </Box>
    );
  }

  return (
    <Box p={5} maxWidth="600px" mx="auto" bg="teal.50" borderRadius="md" boxShadow="lg">
      <h2 style={{ color: 'black' }}>Upload a Post</h2>
      &nbsp;
      {error && (
        <Box mb={4} p={3} bg="yellow.200" borderRadius="md">
          <Text color="yellow.800" fontSize="sm">{error}</Text>
        </Box>
      )}
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Box>
            <Text mb={2} color="black">Title</Text>
            <Input
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={64}
              placeholder="Enter the title"
              required
              bg="teal.100"
              borderColor="teal.400"
              color="black" // Set text color to black
            />
            <Text fontSize="sm" color="black" textAlign="right">{title.length}/64</Text>
          </Box>

          <Box>
            <Text mb={2} color="black">Content</Text>
            <Textarea
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              minLength={32}
              maxLength={8192}
              placeholder="Enter the content"
              resize="vertical"
              required
              bg="teal.100"
              borderColor="teal.400"
              color="black" // Set text color to black
            />
            <Text fontSize="sm" color="black" textAlign="right">{content.length}/8192</Text>
          </Box>

          <Button colorScheme="teal" type="submit" width="full" _hover={{ bg: 'teal.400' }}>
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default UploadView;
