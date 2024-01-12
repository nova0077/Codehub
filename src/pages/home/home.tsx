import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../config/firebase';
import React, { useEffect, useState } from 'react';
import { IPost } from '../../models/Post';
import { PostList } from '../../components/PostList';

export const Home = () => {
  const [postsList, setPostList] = useState<IPost[] | null>(null);
  const postsRef = collection(db, "posts");

  const getAllPosts = async () => {
    const data = await getDocs(postsRef);
    setPostList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IPost[]
    );
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <PostList posts={postsList} />
  );
};