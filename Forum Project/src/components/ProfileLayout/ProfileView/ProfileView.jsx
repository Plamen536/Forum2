import { useContext, useEffect, useState } from 'react';
import { Box, Button, Heading, Input, Stack, Text } from '@chakra-ui/react';
import Avatar from '../../Header/Avatar/Avatar';
import { AppContext } from '../../store/app.context';
import { getUserData } from '../../../services/users.service';
import Header from '../../Header/Header';
import { useNavigate } from 'react-router-dom';

const ProfileView = () => {
  const { user } = useContext(AppContext);
  const [data, setData] = useState('');
  const [fileName, setFileName] = useState('');
  const navigate = useNavigate();

  const uploadFile = (formData) => {
    const file = formData.get('image');
    console.log(file.name);
    alert(`file: ${file}`);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  useEffect(() => {
    getUserData(user.uid)
      .then((data) => setData(data[Object.keys(data)[0]]))
      .catch((error) => error.message);
  }, [user]);

  return (
    <Box maxW="container.sm" mx="auto" py={6}>
      <Heading as="h1" size="xl" mb={6}>
        <Button onClick={() => navigate(-1)}>Back</Button> Profile
      </Heading>

      <Box mb={6}>
        <Avatar />
      </Box>

      <Text fontSize="lg" fontWeight="bold">
        Username: {data.handle}
      </Text>
      <Text fontSize="md">First Name: {data.firstName}</Text>
      <Text fontSize="md" mb={4}>
        Last Name: {data.lastName}
      </Text>

      <hr />

      <Heading as="h2" size="md" mt={6} mb={4}>
        Settings
      </Heading>

      <form action={uploadFile}>
        <Box mb={4}>
          <Text mb={2}>Upload Image of Avatar</Text>

          <Stack direction="row" align="center">
            <Input
              type="file"
              name="image"
              id="image"
              onChange={handleFileChange}
              display="none" // Hides the default file input button
            />
            <Button
              as="label"
              htmlFor="image"
              colorScheme="teal"
              variant="outline"
            >
              Choose File
            </Button>
            <Text>{fileName ? fileName : 'No file selected'}</Text>
          </Stack>
        </Box>

        <Button type="submit" colorScheme="teal" variant="solid">
          Change Avatar
        </Button>
      </form>
    </Box>
  );
};

export default ProfileView;
