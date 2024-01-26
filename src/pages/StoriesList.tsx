import { useEffect, useState } from 'react';
import { fetchStory } from '../services/stories';
import { StoryType } from '../type/story';
import { Link } from 'react-router-dom';

function StoriesList() {
  const [topStoriesList, setTopStoriesList] = useState<number[]>([]);
  const [storiesInPage, setStoriesInPage] = useState<StoryType[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getTopStories = async () => {
      try {
        const res = await fetch(
          'https://hacker-news.firebaseio.com/v0/topstories.json'
        );
        const jsonData = await res.json();

        setTopStoriesList(jsonData);
      } catch (err) {
        console.log(err);
      }
    };

    getTopStories();
  }, []);

  useEffect(() => {
    const getStoriesInCurrentPage = async () => {
      const startIndex = (page - 1) * 10;
      const endIndex = startIndex + 10;

      const storiesToFetch = topStoriesList.slice(startIndex, endIndex);
      const promises = storiesToFetch.map((id) => fetchStory(id));
      const stories = await Promise.all(promises);
      setStoriesInPage(stories as StoryType[]);
    };

    getStoriesInCurrentPage();
  }, [topStoriesList, page]);

  return (
    <div>
      <ul>
        {storiesInPage.map((story) => (
          <li key={story.id}>
            <Link to={`/${story.id}`}>{story.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StoriesList;
