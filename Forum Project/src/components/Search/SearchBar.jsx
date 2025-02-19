import {useState} from 'react';
import './SearchBar.css';

const SearchBar = ({onSearch}) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (event) =>{
         setSearchQuery(event.target.value)
};

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        onSearch(searchQuery);
    };

    return (
        <form onSubmit={handleSearchSubmit} className="search-form">
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by title, content, or author..."
                className="search-input"
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;