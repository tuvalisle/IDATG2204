import React, { useState } from 'react';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8080/users/login', { email, password })
      .then((response) => {
        localStorage.setItem('user_id', response.data.user_id);
        window.location.reload(); // Or redirect to homepage
      })
      .catch((err) => {
        setError('Login failed! Please check your credentials.');
      });
  };

  return (
    <div className="form-container">
      {/* <h2>Sign in</h2> */}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-submit">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default LoginPage;


