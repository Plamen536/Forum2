import {useNavigate } from 'react-router-dom';

const SearchResults = ({ results }) => {
    const navigate = useNavigate();

    console.log("Rendering SearchResults with:", results);

    if (!Array.isArray(results)) {
        return <div className="search-results"></div>;
      }

    const handleArticleClick = (articleId) => {
        navigate(`/article/${articleId}`);
    }

    return (
        <div className="search-results">
            {results.map((article, index) => (
                <div key={index} onClick={() =>handleArticleClick(article.id)}>
                    <h2>{article.title}</h2>
                    <p>{article.content}</p>
                    <p><strong>Author:</strong> {article.authorName}</p>
                </div>
            ))}
        </div>
    );
}

export default SearchResults;