import React, { useState, useEffect } from 'react';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { IComment } from '../models/Comment';

interface CommentProps {
  postId: string;
  user: { uid: string | null; displayName: string | null; email: string | null };
}

export const Comment: React.FC<CommentProps> = ({ postId, user }) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  const commentsRef = collection(db, 'comments');
  const commentsDoc = query(commentsRef, where('postId', '==', postId));

  const getComments = async () => {
    const data = await getDocs(commentsDoc);
    setComments(data.docs.map((doc) => doc.data() as IComment));
  };

  const addComment = async () => {
    if (user && newComment.trim() !== '') {
      try {
        await addDoc(commentsRef, {
          postId,
          userName: user.displayName || '',
          userEmail: user.email || '',
          userMessage: newComment,
        });
        setNewComment('');
        getComments();
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div>
      <div>
        <h3>Comments</h3>
        {comments.map((comment, index) => (
          <div key={index}>
            <p>
              <strong>{comment.userName ? comment.userName : comment.userEmail}</strong>: {comment.userMessage}
            </p>
          </div>
        ))}
      </div>
      {user && (
        <div>
          <textarea
            rows={4}
            cols={50}
            placeholder="Add your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={addComment}>Add Comment</button>
        </div>
      )}
    </div>
  );
};
