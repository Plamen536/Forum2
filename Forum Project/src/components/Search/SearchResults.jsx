const SearchResults = ({ results }) => {
    if (!Array.isArray(results)) {
        return <div className="search-results"></div>;
      }

    return (
        <div className="search-results">
            {results.map((article, index) => (
                <div key={index}>
                    <h2>{article.title}</h2>
                    <p>{article.content}</p>
                    <p><strong>Author:</strong> {article.authorName}</p>
                </div>
            ))}
        </div>
    );
}

export default SearchResults;