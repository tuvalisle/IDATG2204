import React, { useState } from "react";
import axios from "axios";

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
    console.log('Register form data:', formData);

    // Send registration request to the backend
    axios
      .post("http://localhost:8080/users/register", formData)  // Update with the correct API URL (port 8080)
      .then((response) => {
        // Log the response to the console for debugging
        console.log('Register response:', response.data);

        if (response && response.data) {
          setSuccess(response.data.message);  // Use the message from response
          setError(null);
        } else {
          setError("Unexpected response from server");
        }
      })
      .catch((err) => {
        console.log('Register error:', err);  // Log the error for debugging
        if (err.response && err.response.data) {
          setError(err.response.data.error);  // Set the error message from the backend
        } else {
          setError("An error occurred during registration");
        }
        setSuccess(null);
      });
  };

  return (
    <div>
      <h1>Register</h1>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Last Name"
        />
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
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
        />
        <input
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
