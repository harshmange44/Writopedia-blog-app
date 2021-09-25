import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/auth/register", {
        name,
        username,
        email,
        password,
      });
      // res.data && window.location.replace("/login");
      console.log("DEBUGGG: register: "+res.data.msg);
      res.data && setSubmitted(true);
    } catch (err) {
      setError(true);
      setErrorMsg(err);
    }
  };

  const handleReverification = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/verification/resend-email", {
        name,
        username,
        email,
        password,
      });
      // res.data && window.location.replace("/login");
      // res.data && setSubmitted(true);
    } catch (err) {
      setError(true);
      setErrorMsg(err);
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
      <label>Name</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your name..."
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Email</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="registerButton" type="submit">
          Register
        </button>

        {isSubmitted && <div className="resendVerificationButton" onClick={handleReverification}>
        {/* <Link className="link" to="/resend-email"> */}
          Re-send Verification Link
        {/* </Link> */}
      </div>}
      </form>
      {/* <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button> */}
      {error && <span style={{color:"red", marginTop:"10px"}}>{"Something went wrong! " + errorMsg}</span>}
    </div>
  );
}
