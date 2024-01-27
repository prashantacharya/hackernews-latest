import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetchStories, useFetchTopStoriesList } from '../hooks/stories';

function StoriesList() {
  const [page, setPage] = useState(1);

  const {
    topStories,
    error,
    isLoading: isTopStoriesListLoading,
  } = useFetchTopStoriesList();

  const {
    stories,
    error: storiesError,
    isLoading: isStoriesLoading,
  } = useFetchStories(topStories, page);

  if (error || storiesError) {
    return (
      <div>
        {error}
        {storiesError}
      </div>
    );
  }

  if (isTopStoriesListLoading || isStoriesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul>
        {stories.map((story) => (
          <li key={story.id}>
            <Link to={`/${story.id}`}>{story.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StoriesList;
