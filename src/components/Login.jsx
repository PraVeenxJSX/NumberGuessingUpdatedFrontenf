import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [showAdminInput, setShowAdminInput] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        username,
        password,
      });
      const { token } = response.data;

      localStorage.setItem('token', token);

      navigate('/');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  const handleAdminAccess = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/admin-access', {
        key: adminKey,
      });

      if (response.data.success) {
        navigate('/admin-panel');
      } else {
        setError('Invalid Admin Key');
      }
    } catch (error) {
      setError('Error validating admin key');
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => setShowAdminInput(!showAdminInput)}>Admin</button>
      {showAdminInput && (
        <div>
          <input
            type="text"
            placeholder="Enter Secure Key"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
          />
          <button onClick={handleAdminAccess}>Enter</button>
        </div>
      )}
    </div>
  );
};

export default Login;
