import { Suspense } from 'react';
import Comments from '../Comments/Comments';

const TrendingView = () => {
  const trening = {
    title: 'Trending Title',
    likes: 100,
  };
  const handleClick = () => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Comments />
      </Suspense>
    );
  };
  return (
    <div>
      <h1>{trening.title}</h1>
      <label htmlFor="">Likes: {trening.likes}</label>
      <div>
        <button onClick={handleClick}>Comments</button>
      </div>
    </div>
  );
};
export default TrendingView;
