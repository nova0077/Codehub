import { getDocs, collection } from 'firebase/firestore'
import { auth, db } from '../../config/firebase';
import React, { useEffect, useState } from 'react';
import { IPost } from '../../models/Post';
import { PostList } from '../../components/postList';
import { useAuthState } from "react-firebase-hooks/auth";

export const MyPosts = () => {
  const [user] = useAuthState(auth);
  const [postsList, setPostList] = useState<IPost[] | null>(null);
  const postsRef = collection(db, "posts");

  const getAllLoggedInUserPosts = async () => {
    const data = await getDocs(postsRef);
    const allPosts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IPost[];
    const userPosts = allPosts.filter((post)=> post.userId === user?.uid);
    setPostList(
      userPosts
    );
  };

  useEffect(() => {
    getAllLoggedInUserPosts();
  }, []);

  return (
    <PostList posts={postsList} />
  );
};