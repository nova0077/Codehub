import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import { Login } from "./pages/login"
import { Navbar } from './components/navbar';
import { CreatePost } from './pages/create-post/create-post';
import { Home } from './pages/home/home';
import { MyPosts } from './pages/my-posts/myPosts';
import EditPost from './components/EditPost';
import { BookmarkedPosts } from './components/BookmarkedPosts';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my/posts" element={<MyPosts />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/edit/:postId" element={<EditPost />} />
          <Route path="/bookmarked" element={<BookmarkedPosts />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
