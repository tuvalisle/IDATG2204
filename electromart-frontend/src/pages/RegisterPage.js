import React, { useState } from 'react';
import axios from 'axios';

function RegisterPage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    address: "",
    phone_number: "",
  });
  const [error, setError] = useState(null);
  const [setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Register form data:', formData);

    // Send registration request to the backend
    axios
      .post("http://localhost:8080/users/register", formData)
      .then((response) => {
        console.log('Server response:', response.data);
        window.location.href = '/'; // Redirect to login page after successful registration

        if (response && response.data) {
          setSuccess(response.data.message);  // Use the message from response
          setError(null);
        } else {
          setError("Unexpected response from server");
        }
      })
      .catch((err) => {
        console.log('Register error:', err);
        if (err.response && err.response.data) {
          setError(err.response.data.error);  // Set the error message from the backend
        } else {
          setError("An error occurred during registration");
        }
        setSuccess(null);
      });
  };

  return (
    <div className="form-container">
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <input
            type="text"
            name="first_name"
            className="form-control"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="last_name"
            className="form-control"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="address"
            className="form-control"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="phone_number"
            className="form-control"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn-submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
