import { useEffect, useState } from 'react';
import { fetchComment } from '../services/stories';
import { CommentType } from '../type/comment';

type Props = {
  commentIds: number[];
};

const Comments = (props: Props) => {
  const { commentIds } = props;
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    const getComments = async () => {
      try {
        const getCommentsPromises = commentIds.map((commentId) =>
          fetchComment(commentId)
        );

        const comments = await Promise.all(getCommentsPromises);
        setComments(comments as CommentType[]);
      } catch (error) {
        console.error(error);
      }
    };

    getComments();
  }, [commentIds]);

  return (
    <div>
      <h3>Comments:</h3>

      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            {comment?.text}
            {comment.kids && !!comment.kids.length && (
              <Comments commentIds={comment.kids} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
