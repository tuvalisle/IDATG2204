// // import React, { useState } from "react";
// // import axios from "axios";

// // function RegisterPage() {
// //   const [formData, setFormData] = useState({
// //     first_name: "",
// //     last_name: "",
// //     email: "",
// //     password: "",
// //     address: "",
// //     phone_number: "",
// //   });

// //   const [error, setError] = useState(null);
// //   const [success, setSuccess] = useState(null);

// //   const handleChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     // Log the form data to see if it's correctly set
// //     console.log('Register form data:', formData);

// //     // Send registration request to the backend
// //     axios
// //       .post("http://localhost:8080/users/register", formData)  // Update with the correct API URL (port 8080)
// //       .then((response) => {
// //         // Log the response to the console for debugging
// //         console.log('Register response:', response.data);

// //         if (response && response.data) {
// //           setSuccess(response.data.message);  // Use the message from response
// //           setError(null);
// //         } else {
// //           setError("Unexpected response from server");
// //         }
// //       })
// //       .catch((err) => {
// //         console.log('Register error:', err);  // Log the error for debugging
// //         if (err.response && err.response.data) {
// //           setError(err.response.data.error);  // Set the error message from the backend
// //         } else {
// //           setError("An error occurred during registration");
// //         }
// //         setSuccess(null);
// //       });
// //   };

// //   return (
// //     <div>
// //       <h1>Register</h1>
// //       {error && <p>{error}</p>}
// //       {success && <p>{success}</p>}
// //       <form onSubmit={handleSubmit}>
// //         <input
// //           type="text"
// //           name="first_name"
// //           value={formData.first_name}
// //           onChange={handleChange}
// //           placeholder="First Name"
// //         />
// //         <input
// //           type="text"
// //           name="last_name"
// //           value={formData.last_name}
// //           onChange={handleChange}
// //           placeholder="Last Name"
// //         />
// //         <input
// //           type="email"
// //           name="email"
// //           value={formData.email}
// //           onChange={handleChange}
// //           placeholder="Email"
// //         />
// //         <input
// //           type="password"
// //           name="password"
// //           value={formData.password}
// //           onChange={handleChange}
// //           placeholder="Password"
// //         />
// //         <input
// //           type="text"
// //           name="address"
// //           value={formData.address}
// //           onChange={handleChange}
// //           placeholder="Address"
// //         />
// //         <input
// //           type="text"
// //           name="phone_number"
// //           value={formData.phone_number}
// //           onChange={handleChange}
// //           placeholder="Phone Number"
// //         />
// //         <button type="submit">Register</button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default RegisterPage;

// import React, { useState } from 'react';
// import axios from 'axios';

// function RegisterPage() {
//   const [first_name, setFirstName] = useState('');
//   const [last_name, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [address, setAddress] = useState('');
//   const [phone_number, setPhone] = useState('');
//   const [error, setError] = useState(null);

//   const handleRegister = (e) => {
//     e.preventDefault();
//     console.log('Register form data:', formData);
//     axios
//       .post('http://localhost:8080/users/register', {
//         first_name,
//         last_name,
//         email,
//         password,
//         address,
//         phone_number,
//       })
//       .then((response) => {
//         console.log('Server response:', response.data);
//         window.location.href = '/login'; // Redirect to login page after successful registration
//       })
//       .catch((err) => {
//         console.error('Registration failed:', err);
//         setError('Registration failed! Please try again.');
//       });
//   };

//   return (
//     <div className="form-container">
//       {/* <h2>Sign up</h2> */}
//       {error && <div className="alert alert-danger">{error}</div>}
//       <form onSubmit={handleRegister}>
//         <div className="form-group">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="First Name"
//             value={first_name}
//             onChange={(e) => setFirstName(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Last Name"
//             value={last_name}
//             onChange={(e) => setLastName(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <input
//             type="email"
//             className="form-control"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <input
//             type="password"
//             className="form-control"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Address"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Phone Number"
//             value={phone_number}
//             onChange={(e) => setPhone(e.target.value)}
//           />
//         </div>
//         <button type="submit" className="btn-submit">
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// }

// export default RegisterPage;

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
