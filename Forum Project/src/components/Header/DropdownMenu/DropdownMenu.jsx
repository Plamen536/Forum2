import { useState } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import Avatar from '../Avatar/Avatar';
import { NavLink } from 'react-router-dom';
import Logout from '../../Logout/Logout';

const DropdownMenu = () => {
  const [menuView, setMenuView] = useState(false);

  const isAdmin = false; // isAdmin is for test purpose

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
        <Text ml={2} color="black">Username</Text>
      </Button>

      {menuView && (
        <Box
          position="absolute"
          top="100%"
          left="0"
          bg="white"
          boxShadow="md"
          borderRadius="md"
          p={3}
          zIndex="dropdown"
          width="auto" // Optionally set the width of the dropdown
        >
          <NavLink to="/your-profile">
            <Button variant="link" color="black" w="100%" textAlign="left">
              Your profile
            </Button>
          </NavLink>
          <NavLink to="/your-posts">
            <Button variant="link" color="black" w="100%" textAlign="left">
              Your posts
            </Button>
          </NavLink>
          <Button variant="link" color="black" w="100%" textAlign="left" isDisabled>
            Status: {!isAdmin ? 'User ✅' : 'Admin 👑'}
          </Button>

          {/* Logout button with black color */}
          <Logout>
            <Button variant="link" color="black" w="100%" textAlign="left">
              asdasdasdsadsadsadsadsad
            </Button>
          </Logout>
        </Box>
      )}
    </Box>
  );
};

export default DropdownMenu;
