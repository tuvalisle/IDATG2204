const bcrypt = require('bcryptjs');
const db = require('../db');  // Assuming you have your DB connection here

// Register a new user
exports.register = (req, res) => {
  console.log('Register request received:', req.body);  // Log the incoming data

  const { first_name, last_name, email, password, address, phone_number } = req.body;

  // Validate required fields
  if (!first_name || !last_name || !email || !password || !address || !phone_number) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check if email or phone number already exists in the database
  db.query('SELECT * FROM Users WHERE email = ? OR phone_number = ?', [email, phone_number], (err, results) => {
    if (err) {
      console.error('Error checking existing users:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'Email or phone number already exists' });
    }

    // Hash the password before storing it in the database
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err);
        return res.status(500).json({ error: 'Error hashing password' });
      }

      // Insert the new user into the database (hashed password)
      const query = 'INSERT INTO Users (first_name, last_name, email, password, address, phone_number) VALUES (?, ?, ?, ?, ?, ?)';
      db.query(query, [first_name, last_name, email, hashedPassword, address, phone_number], (err, result) => {
        if (err) {
          console.error('Error registering user:', err);
          return res.status(500).json({ error: 'Failed to register user' });
        }

        console.log('User registered successfully, ID:', result.insertId);  // Log the inserted user ID
        res.status(201).json({ message: 'User registered successfully', user_id: result.insertId });
      });
    });
  });
};


/// Login a user
exports.login = (req, res) => {
  console.log('Login request received:', req.body); // Log the request body to check the incoming data

  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Find the user by email
  db.query('SELECT * FROM Users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      console.log('No user found with this email');
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const user = results[0];
    console.log('User found:', user); // Log the user object fetched from the database

    // Compare the provided password with the hashed password in the database
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ error: 'Error comparing passwords' });
      }

      console.log('Password match result:', isMatch); // Log the result of the password comparison

      if (!isMatch) {
        console.log('Invalid password');
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      // Successful login - send response
      console.log('User successfully logged in');
      res.json({ message: 'Login successful', user_id: user.user_id, first_name: user.first_name });
    });
  });
};