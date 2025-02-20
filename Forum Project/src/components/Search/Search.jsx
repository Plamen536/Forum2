import { useState } from "react";
import { getDatabase, ref, query, orderByChild, startAt, endAt, get } from "firebase/database";
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import './SearchBar.css';

const Search = () => { 
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async (searchQuery) => {
        const db = getDatabase();
        const articlesRef = ref(db, "articles");

        // Query by title
        const titleQuery = query(
            articlesRef,
            orderByChild("title"),
            startAt(searchQuery),
            endAt(searchQuery + "\uf8ff")
        );

        // Query by content
        const contentQuery = query(
            articlesRef,
            orderByChild("content"),
            startAt(searchQuery),
            endAt(searchQuery + "\uf8ff")
        );

        // Query by authorName
        const authorQuery = query(
            articlesRef,
            orderByChild("authorName"),
            startAt(searchQuery),
            endAt(searchQuery + "\uf8ff")
        );

        const titleSnapshot = await get(titleQuery);
        const contentSnapshot = await get(contentQuery);
        const authorSnapshot = await get(authorQuery);

        const results = new Set();
        titleSnapshot.forEach(childSnapshot => {
            results.add({ id: childSnapshot.key, ...childSnapshot.val() });
        });
        contentSnapshot.forEach(childSnapshot => {
            results.add({ id: childSnapshot.key, ...childSnapshot.val() });
        });
        authorSnapshot.forEach(childSnapshot => {
            results.add({ id: childSnapshot.key, ...childSnapshot.val() });
        });

        setSearchResults(Array.from(results));
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <SearchResults results={searchResults.slice(0, 3)} /> {/* Limit to 3 results */}
        </div>
    );
};

export default Search;