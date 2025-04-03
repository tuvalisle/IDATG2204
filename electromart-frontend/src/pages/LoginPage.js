import React, { useState } from "react";
import axios from "axios";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Log the form data to see if it's correctly set
    console.log('Login form data:', formData);

    // Send login request to the backend
    axios
      .post("http://localhost:8080/users/login", formData)  // Update with the correct API URL (port 8080)
      .then((response) => {
        // Log the response to the console for debugging
        console.log('Login response:', response.data);

        if (response && response.data) {
          setSuccess(response.data.message);  // Use the message from response
          setError(null);
        } else {
          setError("Unexpected response from server");
        }
      })
      .catch((err) => {
        console.log('Login error:', err);  // Log the error for debugging
        if (err.response && err.response.data) {
          setError(err.response.data.error);  // Set the error message from the backend
        } else {
          setError("An error occurred during login");
        }
        setSuccess(null);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
