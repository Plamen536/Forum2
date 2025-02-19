import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { ref, onValue, get, update } from 'firebase/database';
import { Box, Text, Button, Stack, Heading, Flex } from '@chakra-ui/react';
import { AppContext } from '../store/app.context';
import { db } from '../../config/firebase-config';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  // Fetch posts from Firebase
  useEffect(() => {
    const postsRef = ref(db, 'posts');
    onValue(postsRef, (snapshot) => {
      const postsData = snapshot.val();
      console.log('Fetched posts data:', postsData); // Debugging log
      if (postsData) {
        const postList = Object.entries(postsData).map(([id, post]) => ({
          id,
          ...post,
        }));
        setPosts(postList);
      } else {
        setPosts([]);
      }
    });
  }, []);

  // Navigate to the post detail page
  const handleClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  // Handle like/unlike action
  const handleLike = async (postId) => {
    if (!user) return;

    const postRef = ref(db, `posts/${postId}/likes/${user.uid}`);
    const snapshot = await get(postRef);

    const updates = {};
    if (snapshot.exists()) {
      updates[`posts/${postId}/likes/${user.uid}`] = null;
    } else {
      updates[`posts/${postId}/likes/${user.uid}`] = true;
    }

    await update(ref(db), updates);
  };

  // Check if the user has liked the post
  const isLikedByUser = (post) => {
    return post.likes && post.likes[user?.uid];
  };

  // Get the number of likes
  const getLikesCount = (post) => {
    return post.likes ? Object.keys(post.likes).length : 0;
  };

  // Format the date to a readable format
  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  return (
    <Box p={5} w="100%" display="flex" justifyContent="center" minHeight="100vh">
      <Stack spacing={8} w="80%" mt={4}>
        {posts.map((post) => (
          <Box
            key={post.id}
            p={6}
            bg="gray.700"
            borderRadius="lg"
            boxShadow="lg"
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.05)', bg: 'gray.600' }}
          >
            <Heading
              as="h2"
              size="xl"
              mb={4}
              onClick={() => handleClick(post.id)}
              _hover={{ cursor: 'pointer', color: 'blue.400' }}
            >
              {post.title}
            </Heading>
            <Text noOfLines={3} mb={5} fontSize="lg">
              {post.content}
            </Text>
            <Flex align="center" justify="space-between">
              <Flex>
                <Button
                  onClick={() => handleClick(post.id)}
                  colorScheme="teal"
                  variant="solid"
                  size="md"
                  mr={2}
                >
                  View Details
                </Button>
                {user && (
                  <Button
                    onClick={() => handleLike(post.id)}
                    colorScheme={isLikedByUser(post) ? 'red' : 'teal'}
                    variant="solid"
                    size="md"
                  >
                    {isLikedByUser(post) ? 'Unlike' : 'Like'}
                  </Button>
                )}
              </Flex>
            </Flex>
            <Text mt={4} fontSize="md" color="gray.400">
              Likes: {getLikesCount(post)} | Posted on {formatDate(post.createdOn)}
            </Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Dashboard;
