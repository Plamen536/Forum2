import { useState } from 'react';
import { Box, Button, Text, Center } from '@chakra-ui/react'; // Use Center from Chakra UI for alignment
import Avatar from '../Avatar/Avatar';
import { NavLink } from 'react-router-dom';
import Logout from '../../Logout/Logout';

const DropdownMenu = () => {
  const [menuView, setMenuView] = useState(false);

  const isAdmin = false; // isAdmin is for test purposes

  return (
    <Box position="relative">
      <Button
        variant="link"
        onClick={() => setMenuView(!menuView)}
        display="flex"
        alignItems="center"
        color="black" // Change text color to black for the profile button
      >
        <Avatar />
        <Text ml={2} color="black">Profile</Text>
      </Button>

      {menuView && (
        <Center position="absolute" top="100%" left="0" zIndex="dropdown">
          <Box
            bg="white"
            boxShadow="md"
            borderRadius="md"
            p={3}
            width="auto" // Optionally set the width of the dropdown
          >
            <NavLink to="/your-profile">
              <Button variant="link" color="black" w="100%" textAlign="left">
                Your profile
              </Button>
            </NavLink>
            <Button variant="link" color="black" w="100%" textAlign="left" isDisabled>
              Status: {!isAdmin ? 'User ✅' : 'Admin 👑'}
            </Button>

            {/* Logout button */}
            <Button variant="link" color="black" w="100%" textAlign="left">
                <Logout></Logout>
              </Button>
          </Box>
        </Center>
      )}
    </Box>
  );
};

export default DropdownMenu;
