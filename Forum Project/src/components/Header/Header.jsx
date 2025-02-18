import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../store/app.context';
import { Box, Button, Container, Flex, Heading, Stack } from '@chakra-ui/react';
import DropdownMenu from './DropdownMenu/DropdownMenu';
import Logout from '../Logout/Logout';

export default function Header() {
  const { user } = useContext(AppContext);

  return (
    <Box as="header" bg="teal.500" color="white" py={4}>
      <Container maxW="container.xl">
        <Flex align="center" justify="space-between">
          <Heading as="h1" size="lg">
            <NavLink to="/">Forum</NavLink>
          </Heading>
          <nav>
            <Stack direction="row" spacing={6} align="center">
              <NavLink to="/dashboard">
                <Button variant="link" color="white">
                  Dashboard
                </Button>
              </NavLink>
              {!user && (
                <>
                  <NavLink to="/login">
                    <Button variant="link" color="white">
                      Login
                    </Button>
                  </NavLink>
                  <NavLink to="/register">
                    <Button variant="link" color="white">
                      Register
                    </Button>
                  </NavLink>
                </>
              )}
              {user && (
                <>
                  <NavLink to="/upload">
                    <Button variant="link" color="white">
                      Upload
                    </Button>
                  </NavLink>
                  <NavLink to="/users">
                    <Button variant="link" color="white">
                      Users
                    </Button>
                  </NavLink>
                  <DropdownMenu />
                </>
              )}
            </Stack>
          </nav>
        </Flex>
      </Container>
    </Box>
  );
}
