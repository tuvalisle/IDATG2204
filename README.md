# IDATG2204
Semester Project: E-Commerce Website Database Implementation
# ElectroMart API

ElectroMart API is a RESTful API built with Node.js and Express to manage products, users, and orders in an e-commerce platform. It uses MySQL for database management, handling operations like user registration and login (secured with bcryptjs), product retrieval, and order creation. The API allows users to interact with the platform by retrieving product data, managing their shopping cart, and placing orders.

---

## Running ElectroMart - Step-by-Step Setup

### Prerequisites:
Before starting, make sure you have the following installed:
- **Node.js** (with npm) - For running both the frontend and backend servers.
- **MySQL** - For setting up the database.


### 1. **Clone the Repository**
Clone the repository to your local machine.
```bash
git@github.com:tuvalisle/IDATG2204.git
cd IDATG2204
```

### 2. **Install Dependencies**
Navigate to the backend folder, electromart-node, and install the following libraries:
```bash
npm install express mysql2 cors bcryptjs axios
```

Navigate to the frontend folder, electromart-frontend, and install the following libraries:
```bash
npm install express mysql2 cors bcryptjs react-scripts react-router-dom react-dom
```

### 3. Set up the database
1. Open phpMyAdmin or terminal
2. Create a new database named `electromart`
3. Import the file `electromart.sql`

### 4. Change the database setup (if needed)
Update database connection details in the db.js file to match your local MySQL setup, if you have another credentials than given below:
```bash
const db = mysql.createConnection({
  host: "localhost",
  user: "root",      // your MySQL username
  password: "",      // your MySQL password
  database: "electromart"
});
```

### 5. Start the backend server
Navigate to the backend folder, electromart-node, and type in the following:
```bash
node server.js
```

### 6. Start the frontend server
Navigate to the frontend folder, electromart-frontend, and type in the following:
```bash
npm start
```

Now you should be able to use our ElectroMart webpage!


