import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../config/firebase-config';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';



const Search = () => { 
    const [searchResults, setSearchResults] = useState("");

    const handleSearch = async (searchQuery) => {
        const articlesRef = collection(db, "articles");
        const q = query(
            articlesRef,
            where("title", ">=", searchQuery),
            where("title", "<=", searchQuery + "\uf8ff")
        );

        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map(doc => doc.data());

        setSearchResults(results);
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <SearchResults results={searchResults} />
        </div>
    );
};

export default SearchBar;
