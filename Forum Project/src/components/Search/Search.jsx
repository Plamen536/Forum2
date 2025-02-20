import { useState, useEffect } from "react";
import { getDatabase, ref, query, orderByChild, startAt, endAt, get, set } from "firebase/database";
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import './SearchBar.css';

const Search = () => { 
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        // Add some test data to the database
        const db = getDatabase();
        const postsRef = ref(db, "posts");
        set(postsRef, {
            post1: { title: "Test Post Title 1", content: "Test Post Content 1", authorName: "Author 1" },
            post2: { title: "Test Post Title 2", content: "Test Post Content 2", authorName: "Author 2" },
            post3: { title: "Test Post Title 3", content: "Test Post Content 3", authorName: "Author 3" }
        });
    }, []);

    const handleSearch = async (searchQuery) => {
        console.log("Search query:", searchQuery); //
        const db = getDatabase();
        const postsRef = ref(db, "posts");

        
        const titleQuery = query(
            postsRef,
            orderByChild("title"),
            startAt(searchQuery),
            endAt(searchQuery + "\uf8ff")
        );

        
        const contentQuery = query(
            postsRef,
            orderByChild("content"),
            startAt(searchQuery),
            endAt(searchQuery + "\uf8ff")
        );

        
        const authorQuery = query(
            postsRef,
            orderByChild("authorName"),
            startAt(searchQuery),
            endAt(searchQuery + "\uf8ff")
        );

        try {
        const titleSnapshot = await get(titleQuery);
        const contentSnapshot = await get(contentQuery);
        const authorSnapshot = await get(authorQuery);

        console.log("Title snapshot:", titleSnapshot.val());
        console.log("Content snapshot:", contentSnapshot.val());
        console.log("Author snapshot:", authorSnapshot.val());


        const results = new Set();
            titleSnapshot.forEach(childSnapshot => {
                console.log("Title match:", childSnapshot.val());
                results.add({ id: childSnapshot.key, ...childSnapshot.val() });
            });
            contentSnapshot.forEach(childSnapshot => {
                console.log("Content match:", childSnapshot.val());
                results.add({ id: childSnapshot.key, ...childSnapshot.val() });
            });
            authorSnapshot.forEach(childSnapshot => {
                console.log("Author match:", childSnapshot.val());
                results.add({ id: childSnapshot.key, ...childSnapshot.val() });
            });

        const resultsArray = Array.from(results);
        console.log("Search results:", resultsArray); // Log the search results
        setSearchResults(resultsArray);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <SearchResults results={searchResults.slice(0, 3)} /> 
        </div>
    );
};

export default Search;