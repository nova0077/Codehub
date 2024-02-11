// EditPost.tsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import "../styles/editpost.css"

const EditPost: React.FC = () => {
  const { postId } = useParams<any>();
  const [postContent, setPostContent] = useState<string>('');

  useEffect(() => {
    const fetchPostData = async () => {
      if (postId) {

        const postDoc = doc(db, 'posts', postId);
        const postSnapshot = await getDoc(postDoc);

        if (postSnapshot.exists()) {
          const postData = postSnapshot.data();
          setPostContent(postData?.description || ''); // Assuming description is the field to be edited
        } else {
          console.error('Post not found');
        }
      }
    };

    fetchPostData();
  }, [postId]);

  const handleSaveChanges = async () => {
    if (postId) {
      const postDoc = doc(db, 'posts', postId);
      await updateDoc(postDoc, { description: postContent }); // Update with the actual field to be edited

      // Redirect to the post details page after editing (replace '/post' with your actual route)
      // You might want to use react-router's useHistory or useNavigate for navigation.
      window.location.href = `/post/${postId}`;
    }
  };

  return (
    <div className="edit-post-container">
      <h1 className="edit-post-title">Edit Post</h1>
      <textarea
        className="edit-post-textarea"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />
      <button
        className="save-changes-button"
        onClick={handleSaveChanges}
      >
        Save Changes
      </button>
    </div>

  );
};

export default EditPost;
