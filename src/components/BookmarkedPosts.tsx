import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { IPost } from '../models/Post';
import { PostList } from './PostList';
import { useAuthState } from 'react-firebase-hooks/auth';

export const BookmarkedPosts: React.FC = () => {
  const [user] = useAuthState(auth);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<IPost[] | null>(null);
  const userId = user?.uid;

  useEffect(() => {
    const fetchBookmarkedPosts = async () => {
      const bookmarksRef = collection(db, 'bookmarks');
      const bookmarkedPostsQuery = query(bookmarksRef, where('userId', '==', userId));
      const bookmarksSnapshot = await getDocs(bookmarkedPostsQuery);

      const postIds = bookmarksSnapshot.docs.map((doc) => doc.data().postId);
      const posts = await Promise.all(postIds.map(async (postId) => {
        const postRef = doc(db, 'posts', postId);
        const postSnapshot = await getDoc(postRef);
        return { ...postSnapshot.data(), id: postSnapshot.id } as IPost;
      }));

      setBookmarkedPosts(posts);
    };

    fetchBookmarkedPosts();
  }, [userId]);

  return (
    <div>
      <h1>Bookmarked Posts</h1>
      <PostList posts={bookmarkedPosts} />
    </div>
  );
};
