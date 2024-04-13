import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (window.sessionStorage.getItem('username')) {
    window.location.href = '/homepage';
  }



  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log(JSON.stringify({ username, password }))
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username , password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log("Here comes the data");
      console.log(data.message);

      if (data.message !== 'Login successful') {
        alert('Invalid username or password');
        return;
      }

      window.sessionStorage.setItem('username', username);
      window.location.href = '/homepage';

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{textAlign: "center"}}>
      <div style={{marginTop: "10%"}}></div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <Link id="register" className="form-text" to="/register">
        If you don't have an account, please register here
      </Link>
    </div>
  );
};

export default Login;
