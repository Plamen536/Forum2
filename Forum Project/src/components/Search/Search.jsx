import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Box } from '@chakra-ui/react';

const Search = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?query=${query}`);
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        bg="white"
        color="black"
        borderColor="gray.300"
        _hover={{ borderColor: 'gray.400' }}
        _focus={{ borderColor: 'teal.400' }}
      />
      <Button onClick={handleSearch} colorScheme="teal" ml={2}>
        Search
      </Button>
    </Box>
  );
};

export default Search;