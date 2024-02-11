import { getDocs, collection } from 'firebase/firestore'
import { auth, db } from '../../config/firebase';
import React, { useEffect, useState } from 'react';
import { IPost } from '../../models/Post';
import { PostList } from '../../components/PostList';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';
import "../../styles/mypost.css"

export const MyPosts = () => {
  const [user] = useAuthState(auth);
  const [postsList, setPostList] = useState<IPost[] | null>(null);
  const postsRef = collection(db, "posts");
  const navigate = useNavigate();

  const getAllLoggedInUserPosts = async () => {
    const data = await getDocs(postsRef);
    const allPosts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IPost[];
    const userPosts = allPosts.filter((post) => post.userId === user?.uid);
    setPostList(
      userPosts
    );
  };

  const handleEditPost = (postId: string) => {
    // Redirect to the edit post page (replace '/edit' with your actual route)
    navigate(`/edit/${postId}`);
  };
  useEffect(() => {
    getAllLoggedInUserPosts();
  }, []);

  return (
    <div className="my-posts-container">
      {postsList?.map((post) => (
        <div className="post-card" key={post.id}>
          <h2 className="post-title">{post.title}</h2>
          <p className="post-body">{post.description}</p>
          <p className="post-author">@{post.username}</p>
          <button className="edit-button" onClick={() => handleEditPost(post.id)}>Edit</button>
        </div>
      ))}
    </div>

  );
};