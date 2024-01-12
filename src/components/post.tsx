import React, { useEffect, useState } from "react";
import { addDoc, getDocs, collection, query, where, doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { IPost } from "../models/Post";
import { ILike } from "../models/Like";
import { Comment } from './comment'



interface Props {
  post: IPost;
}

export const Post = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);
  const [likes, setLikes] = useState<ILike[] | null>(null);
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id));
  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })));
  };

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: post.id });
      if (user) {
        setLikes((prev) => prev ? [...prev, { userId: user.uid, likeId: newDoc.id }] : [{ userId: user.uid, likeId: newDoc.id }]);
      }
    } catch (error) {
      alert(error);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );
      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const bookmarksRef = collection(db, "bookmarks");

  const addBookmark = async () => {
    try {
      const newDoc = await addDoc(bookmarksRef, { userId: user?.uid, postId: post.id });
      if (user) {
        setBookmarked(true);
      }
    } catch (error) {
      alert(error);
    }
  };

  const removeBookmark = async () => {
    try {
      const bookmarkToDeleteQuery = query(
        bookmarksRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );
      const bookmarkToDeleteData = await getDocs(bookmarkToDeleteQuery);
      const bookmarkId = bookmarkToDeleteData.docs[0].id;
      const bookmarkToDelete = doc(db, "bookmarks", bookmarkId);
      await deleteDoc(bookmarkToDelete);
      setBookmarked(false);
    } catch (error) {
      console.log(error);
    }
  };


  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);
  const getBookmark = async () => {
    if (!user) {
      setBookmarked(false);
    } else {
      const bookmarksDoc = query(bookmarksRef, where("userId", "==", user.uid));
      const bookmarksData = await getDocs(bookmarksDoc);
      const bookmarks = bookmarksData.docs.map((doc) => doc.data().postId);
      const isMarked = (bookmarks as string[]).some((post) => post === props.post.id);
      setBookmarked(isMarked);
    }
  }


  useEffect(() => {
    getLikes();
    getBookmark();
  }, []);

  return (
    <div>
      <div className="title">
        <h1>{post.title}</h1>
      </div>
      <div className="body">
        <p> {post.description}</p>
      </div>
      <div className="footer">
        <p>@{post.username}</p>
        <button onClick={hasUserLiked ? removeLike : addLike}>
          {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
        </button>
        <button onClick={bookmarked ? removeBookmark : addBookmark}>
          {bookmarked ? "Remove Bookmark" : "Bookmark"}
        </button>
        {likes && <p> Likes: {likes.length}</p>}
      </div>
      <Comment postId={post.id} user={user || { uid: null, displayName: null, email: null }} />
    </div>
  );
};
