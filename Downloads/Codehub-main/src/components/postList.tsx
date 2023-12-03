import React from 'react';
import { IPost } from '../models/Post';
import { Post } from './post';

interface PostListProps {
  posts: IPost[] | null | undefined;
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div>
      {posts && posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};