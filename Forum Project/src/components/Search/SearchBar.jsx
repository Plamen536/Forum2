import {useState} from 'react';
import './SearchBar.css';


const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        onSearch(query); // Call onSearch on every input change
    };

    return (
        <form className="search-form">
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by title, content, or author..."
                className="search-input"
            />
        </form>
    );
};

export default SearchBar;