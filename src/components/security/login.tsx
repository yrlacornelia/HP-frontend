'use client'
import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event:any) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const token = data.token;

      localStorage.setItem('token', token);
      // Redirect or handle successful login

    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form className="flex flex-col mt-12 w-72" onSubmit={handleLogin}>
      <label className="mb-1" htmlFor="Username">Name</label>
      <input
        className="mb-3 rounded"
        type="text"
        id="Username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label className="mb-1" htmlFor="password">Password</label>
      <input
        className="mb-3 rounded"
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="mt-4" type="submit">Login</button>
    </form>
  );
};

export default Login;
