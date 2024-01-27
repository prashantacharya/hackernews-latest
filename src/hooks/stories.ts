import { useEffect, useState } from 'react';
import { fetchStory, fetchTopStories } from '../services/stories';
import { StoryType } from '../type/story';

export const useFetchTopStoriesList = (): {
  topStories: number[];
  isLoading: boolean;
  error: string | null;
} => {
  const [topStories, setTopStories] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const topStories = await fetchTopStories();
        setTopStories(topStories);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message || 'Failed to fetch data');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { topStories, isLoading, error };
};

export const useFetchStories = (
  topStories: number[],
  page: number
): {
  stories: StoryType[];
  isLoading: boolean;
  error: null | string;
} => {
  const [stories, setStories] = useState<StoryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getStoriesInCurrentPage = async () => {
      try {
        setIsLoading(true);
        const startIndex = (page - 1) * 10;
        const endIndex = startIndex + 10;

        const storiesToFetch = topStories.slice(startIndex, endIndex);
        const promises = storiesToFetch.map((id) => fetchStory(id));
        const stories = await Promise.all(promises);
        setStories(stories);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getStoriesInCurrentPage();
  }, [topStories, page]);

  return { stories, isLoading, error };
};
