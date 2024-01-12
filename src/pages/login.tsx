import { auth, provider } from "../config/firebase";
import { UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
    <div>
      <h2>Sign Up</h2>
      <label>Email:</label>
      <input type="email" value={email} onChange={handleEmailChange} />

      <label>Password:</label>
      <input type="password" value={password} onChange={handlePasswordChange} />

      <button onClick={signUpWithEmailAndPassword}>Sign Up</button>

      <h2>Sign In</h2>
      <label>Email:</label>
      <input type="email" value={email} onChange={handleEmailChange} />

      <label>Password:</label>
      <input type="password" value={password} onChange={handlePasswordChange} />

      <button onClick={signInWithEmailAndPasswordHandler}>Sign In</button>
    </div>
  );
}