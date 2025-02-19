import { useContext, useEffect, useState } from 'react';
import { Box, Button, Heading, Input, Stack, Text } from '@chakra-ui/react';
import Avatar from '../../Header/Avatar/Avatar';
import { AppContext } from '../../store/app.context';
import { getUserData } from '../../../services/users.service';
import { useNavigate } from 'react-router-dom';
import { onValue, ref, update } from 'firebase/database';
import { db } from '../../../config/firebase-config';

const ProfileView = () => {
  const { user } = useContext(AppContext);
  const [userPosts, setUserPosts] = useState([]);
  const [data, setData] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    getUserData(user.uid)
      .then((data) => {
        const userData = data[Object.keys(data)[0]];
        setData(userData);
        setEditForm({
          firstName: userData.firstName,
          lastName: userData.lastName,
        });
      })
      .catch((error) => error.message);
  }, [user]);

  useEffect(() => {
    if (data.handle) {
      const userPostsRef = ref(db, `users/${data.handle}/posts`);
      onValue(userPostsRef, (snapshot) => {
        if (snapshot.exists()) {
          const posts = Object.values(snapshot.val());
          setUserPosts(posts);
        } else {
          setUserPosts([]);
        }
      });
    }
  }, [data.handle]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      editForm.firstName.length < 4 ||
      editForm.firstName.length > 32 ||
      editForm.lastName.length < 4 ||
      editForm.lastName.length > 32
    ) {
      alert('First and last name must be between 4 and 32 characters');
      return;
    }

    try {
      const updates = {};
      updates[`users/${data.handle}/firstName`] = editForm.firstName;
      updates[`users/${data.handle}/lastName`] = editForm.lastName;

      await update(ref(db), updates);
      setData((prev) => ({
        ...prev,
        firstName: editForm.firstName,
        lastName: editForm.lastName,
      }));
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <Box maxW="container.sm" mx="auto" py={6}>
      <Heading as="h1" size="xl" mb={6}>
        <Button onClick={() => navigate(-1)}>Back</Button> Profile
      </Heading>

      <Box mb={6}>
        <Avatar size={120} />
      </Box>

      <Text fontSize="lg" fontWeight="bold">
        Username: {data.handle}
      </Text>

      {!isEditing ? (
        <>
          <Text fontSize="md">First Name: {data.firstName}</Text>
          <Text fontSize="md" mb={4}>
            Last Name: {data.lastName}
          </Text>
          <Button
            onClick={() => setIsEditing(true)}
            colorScheme="teal"
            variant="outline"
            mb={4}
          >
            Edit Name
          </Button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <Stack spacing={4} mb={4}>
            <Box>
              <Text mb={2}>First Name</Text>
              <Input
                name="firstName"
                value={editForm.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                minLength={4}
                maxLength={32}
              />
            </Box>
            <Box>
              <Text mb={2}>Last Name</Text>
              <Input
                name="lastName"
                value={editForm.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                minLength={4}
                maxLength={32}
              />
            </Box>
            <Stack direction="row" spacing={4}>
              <Button type="submit" colorScheme="teal">
                Save Changes
              </Button>
              <Button onClick={() => setIsEditing(false)} variant="outline">
                Cancel
              </Button>
            </Stack>
          </Stack>
        </form>
      )}
      <hr />
      <Heading as="h2" size="lg" my={4}>
        Your Posts:
      </Heading>

      {userPosts.length > 0 ? (
        <Stack spacing={4}>
          {userPosts.map((post) => (
            <Box
              key={post.uid}
              p={5}
              shadow="md"
              borderWidth="1px"
              borderRadius="md"
              _hover={{ shadow: 'lg' }}
            >
              <Heading as="h3" size="md" mb={2}>
                {post.title}
              </Heading>
              <Text noOfLines={2} mb={3} color="gray.600">
                {post.content.length > 100
                  ? `${post.content.substring(0, 100)}...`
                  : post.content}
              </Text>
              <Text fontSize="sm" color="gray.500">
                Posted on: {new Date(post.createdOn).toLocaleDateString()}
              </Text>
              <Button
                mt={3}
                size="sm"
                colorScheme="teal"
                onClick={() => navigate(`/post/${post.uid}`)}
              >
                View Post
              </Button>
            </Box>
          ))}
        </Stack>
      ) : (
        <Text color="gray.500" textAlign="center">
          You haven't created any posts yet.
        </Text>
      )}
    </Box>
  );
};

export default ProfileView;
