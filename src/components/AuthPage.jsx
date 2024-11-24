import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../config/fireBaseConfig";

const AuthPage = () => {
  const [user, setUser] = useState({});
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  // Handle input changes for email/password fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle form submission for email/password
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (login) {
        // Login existing user
        await signInWithEmailAndPassword(auth, user.email, user.password);
        setUser({});
        navigate("/add");
      } else {
        // Sign up new user
        const res = await createUserWithEmailAndPassword(
          auth,
          user.email,
          user.password
        ).catch((err) => {
          alert(err.code);
        });
        if (res) {
          setUser({});
          navigate("/add");
        }
      }
    } catch (error) {
      alert(error.message || "Authentication failed");
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google User Signed In:", result.user);
      navigate("/add");
    } catch (error) {
      alert(error.message || "Google Sign-In failed");
    }
  };

  return (
    <div>
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-4">
            <div className="form-content border p-2 rounded">
              <h3>{!login ? "SignUp" : "Login"} Form</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={user.email || ""}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="password"
                  className="form-control my-2"
                  placeholder="Enter Password"
                  value={user.password || ""}
                  onChange={handleChange}
                />
                <input
                  type="submit"
                  value={!login ? "SignUp" : "Login"}
                  className="btn btn-primary"
                />
                <span className="d-block mt-3">
                  {login
                    ? "Don't have an account?"
                    : "Already have an account?"}
                  <span
                    style={{ cursor: "pointer" }}
                    className="ms-1 text-primary"
                    onClick={() => setLogin(!login)}
                  >
                    {login ? "SignUp" : "Login"}
                  </span>
                </span>
              </form>
              <hr />
              <button
                className="btn btn-danger w-100 mt-3"
                onClick={handleGoogleSignIn}
              >
                Sign In with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
