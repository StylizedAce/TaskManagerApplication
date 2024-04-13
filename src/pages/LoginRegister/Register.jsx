import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Check password requirements
    const isValid = newPassword.length >= 8 && /[A-Z]/.test(newPassword);
    setPasswordValid(isValid);

    const ismatch = newPassword === confirmPassword;
    setConfirmPasswordValid(ismatch)
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    // Check if password matches confirm password
    const ismatch = newConfirmPassword === password;
    setConfirmPasswordValid(ismatch);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!passwordValid || !confirmPasswordValid) {
      alert("Please make sure the passwords match and meet the requirements.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/register", {
        username,
        password,
      });
      console.log(response.data.message);
    } catch (error) {
      console.error("Error:", error.response.data.message);
    }
  };

  return (
    <div style={{textAlign: "center"}}>
      
      <div style={{marginTop: "10%"}}></div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>

        {confirmPasswordValid ? (
          <span style={{ color: "green" }}>&#10004;</span>
        ) : (
          <span style={{ color: "red" }}>&#10006;</span>
        )}
        <span>Passwords must match.</span>
        <br />

        {passwordValid ? (
          <span style={{ color: "green" }}>&#10004;</span>
        ) : (
          <span style={{ color: "red" }}>&#10006;</span>
        )}
        <span>
          Password must be at least 8 characters long and contain at least one
          uppercase letter.
        </span>

        <br />
        <br />
        <button type="submit">Create Account</button>
      </form>
      <br />
      <Link id="login" className="form-text" to={"/login"}>
        Already have an account? Login here
      </Link>
    </div>
  );
};

export default Register;
