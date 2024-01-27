import { CommentType } from '../type/comment';
import { StoryType } from '../type/story';

export const fetchStory = async (id: number): Promise<StoryType> => {
  const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
  const res = await fetch(url);

  if (res.status !== 200) {
    throw new Error('Failed to fetch data');
  }

  const json = await res.json();
  return json;
};

export const fetchComment = async (id: number): Promise<CommentType> => {
  const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
  const res = await fetch(url);

  if (res.status !== 200) {
    throw new Error('Failed to fetch data');
  }

  const json = await res.json();
  return json;
};

export const fetchTopStories = async (): Promise<number[]> => {
  const res = await fetch(
    'https://hacker-news.firebaseio.com/v0/topstories.json'
  );

  if (res.status !== 200) {
    throw new Error('Failed to fetch data');
  }
  const jsonData = await res.json();
  return jsonData;
};
