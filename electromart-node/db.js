const mysql = require('mysql2');

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Use your database username (e.g., 'root')
  password: '',  // Use your database password (e.g., 'password')
  database: 'electromart',  // Database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the MySQL database!');
});

module.exports = db;  // Export the db connection for use in other files
