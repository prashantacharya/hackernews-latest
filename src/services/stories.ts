import { CommentType } from '../type/comment';
import { StoryType } from '../type/story';

export const fetchStory = async (
  id: number
): Promise<StoryType | undefined> => {
  try {
    const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
    const res = await fetch(url);
    const json = await res.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const fetchComment = async (
  id: number
): Promise<CommentType | undefined> => {
  try {
    const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
    const res = await fetch(url);
    const json = await res.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
