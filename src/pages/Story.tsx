import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchStory } from '../services/stories';
import { StoryType } from '../type/story';
import Comments from '../components/comments';

const Story = () => {
  const { id } = useParams();
  const [story, setStory] = useState<StoryType>();

  useEffect(() => {
    const getStory = async () => {
      if (!id) return;
      try {
        const story = await fetchStory(+id);
        if (story) {
          setStory(story);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getStory();
  }, [id]);

  if (!id) return null;

  return (
    <div>
      {story?.title}
      <Comments commentIds={story?.kids || []} />
    </div>
  );
};

export default Story;
