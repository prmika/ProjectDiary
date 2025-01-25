import React, { useState } from "react";
import { auth, googleProvider } from "../../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const handleSubmit = () => {
    console.log(isSignUp);
    isSignUp ? handleSignUp() : handleEmailLogin();
  };
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error logging in with Google", error);
    }
  };

  const handleEmailLogin = async () => {
    try {
      console.log("täällä");
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result);
      // Handle successful sign-in (e.g., redirect to a protected page)
    } catch (error) {
      console.log("Error logging in with email and password", error);
    }
  };

  const handleSignUp = async () => {
    try {
      console.log("täällä");
      await createUserWithEmailAndPassword(auth, email, password);

      // Handle successful sign-up (e.g., redirect to a welcome page)
    } catch (error) {
      console.log("Error signing up with email and password", error);
    }
  };

  return (
    <div className="card-container">
      <div className="card">
        <h1>Login</h1>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="button" onClick={handleSubmit}>
            {isSignUp ? "Signup with email" : "Login with Email"}
          </button>
          <div className="login-text">
            <p
              onClick={() => console.log("Forgot password")}
              style={{ cursor: "pointer" }}
            >
              Forgot your password?
            </p>
            <div style={{ display: "flex" }}>
              <p className="info">
                {isSignUp ? "Already a user?" : "Don't have an account?"}{" "}
              </p>{" "}
              &nbsp;
              <p
                onClick={() => setIsSignUp(!isSignUp)}
                style={{ cursor: "pointer" }}
              >
                {isSignUp ? "Login" : "Sign up"}
              </p>
            </div>
          </div>
          <div className="form-group" style={{ alignItems: "center" }}>
            <p>or</p>
          </div>
          <button onClick={handleGoogleLogin} className="button">
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
