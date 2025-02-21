import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Text, Spinner, Stack } from "@chakra-ui/react";
import { ref, query, orderByChild, equalTo, get } from "firebase/database";
import { db } from "../../config/firebase-config";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchResults = async () => {
      if (!queryParam) return;

      console.log("Query Parameter:", queryParam); // Debug log

      const postsRef = ref(db, "posts");
      const snapshot = await get(postsRef);

      if (snapshot.exists()) {
        const posts = Object.values(snapshot.val());
        console.log("Fetched Posts:", posts); // Debug log

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(queryParam.toLowerCase())
    );


        setResults(filteredPosts);
      } else {
            console.log("No posts found"); // Debug log
        setResults([]);
      }

      setLoading(false);
    };

    fetchResults();
  }, [queryParam]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" color="teal.500" />
      </Box>
    );
  }

  return (
    <Box p={5}>
      <Text fontSize="2xl" mb={4}>
        Search Results for "{queryParam}"
      </Text>
      {results.length > 0 ? (
        <Stack spacing={4}>
          {results.map((post) => (
            <Box
              key={post.uid}
              p={5}
              shadow="md"
              borderWidth="1px"
              borderRadius="md"
            >
              <Text fontSize="xl" fontWeight="bold">
                {post.title}
              </Text>
              <Text mt={2}>{post.content}</Text>
            </Box>
          ))}
        </Stack>
      ) : (
        <Text>No results found.</Text>
      )}
    </Box>
  );
};

export default SearchResults;
