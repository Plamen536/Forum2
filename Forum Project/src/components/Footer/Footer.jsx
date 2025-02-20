import './Footer.css';
import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  IconButton,
  Divider,
} from '@chakra-ui/react';
import { SiGithub } from 'react-icons/si';

const socialLinks = [{ href: 'https://github.com/Plamen536/Forum2', icon: <SiGithub /> }];

const Footer = () => {
  return (
    <Box bg="gray.900" color="gray.300" py={8}>
      <Container maxW="container.lg">
        <Stack spacing={6}>
          {/* Navigation Links */}
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={6}
            justify="center"
            align="center"
          >
            <Link href="/" _hover={{ color: 'white' }}>
              Home
            </Link>

            <Link href="/dashboard" _hover={{ color: 'white' }}>
              About
            </Link>

            <Link href="#" _hover={{ color: 'white' }}>
              Services
            </Link>

            <Link href="#" _hover={{ color: 'white' }}>
              Contact
            </Link>
          </Stack>

          {/* Social Media Icons */}
          <Stack direction="row" spacing={4} justify="center">
            {socialLinks.map(({ href, icon }, index) => (
              <IconButton
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                as="a"
                href={href}
                aria-label="GitHub"
                variant="ghost"
                color="gray.300"
                boxSize={10}
                fontSize={30}
                _hover={{ color: 'white', bg: 'gray.700' }}
                icon={icon}
              />
            ))}
          </Stack>

          <Divider borderColor="gray.600" />

          {/* Copyright */}
          <Text textAlign="center" fontSize="sm">
            &copy; {new Date().getFullYear()} Forum. All rights reserved.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
