import { auth, provider } from "../config/firebase";
import { UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css"

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const signUpWithEmailAndPassword = async (): Promise<void> => {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User signed up:", user);
      setIsSignedUp(true);
      navigate('/');
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const signInWithEmailAndPasswordHandler = async (): Promise<void> => {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User signed in:", user);
      navigate('/');
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="login-container">
      {!isSignedUp ? (
        <>
          <h2 className="login-header">Sign Up</h2>
          <label className="login-label">Email:</label>
          <input className="login-input" type="email" value={email} onChange={handleEmailChange} />

          <label className="login-label">Password:</label>
          <input className="login-input" type="password" value={password} onChange={handlePasswordChange} />

          <button className="login-button" onClick={signUpWithEmailAndPassword}>Sign Up</button>

          <p className="login-switch">Already have an account? <button className="login-switch-button" onClick={() => setIsSignedUp(true)}>Sign In</button></p>
        </>
      ) : (
        <>
          <h2 className="login-header">Sign In</h2>
          <label className="login-label">Email:</label>
          <input className="login-input" type="email" value={email} onChange={handleEmailChange} />

          <label className="login-label">Password:</label>
          <input className="login-input" type="password" value={password} onChange={handlePasswordChange} />

          <button className="login-button" onClick={signInWithEmailAndPasswordHandler}>Sign In</button>
        </>
      )}
    </div>

  );
};
