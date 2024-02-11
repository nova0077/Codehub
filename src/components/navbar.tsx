import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useState } from "react";
import "../styles/navbar.css"

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const [showLinks, setShowLinks] = useState(false);

  const signUserOut = async () => {
    await signOut(auth);
  };

  const toggleLinks = () => {
    setShowLinks((prev) => !prev);
  };

  return (
    <div className="navbar">
      <div className="navbar-toggle" onClick={toggleLinks}>
        ☰
      </div>
      <div className={`navbar-links ${showLinks ? "show" : ""}`}>
        <Link to="/" onClick={() => setShowLinks(false)}>
          Home
        </Link>
        <Link to="/my/posts" onClick={() => setShowLinks(false)}>
          My Posts
        </Link>
        <Link to="/bookmarked" onClick={() => setShowLinks(false)}>
          Bookmarked Posts
        </Link>
        {!user ? (
          <Link to="/login" onClick={() => setShowLinks(false)}>
            Login
          </Link>
        ) : (
          <Link to="/createpost" onClick={() => setShowLinks(false)}>
            Create Post
          </Link>
        )}
      </div>
      <div className="navbar-user">
        {user && (
          <>
            <p>{user?.displayName}</p>
            <img
              src={user?.photoURL || " "}
              alt="User Avatar"
              width="30"
              height="30"
            />
            <button onClick={signUserOut}>Log Out</button>
          </>
        )}
      </div>
    </div>
  );
};
