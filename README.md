# IDATG2204
Semester Project: E-Commerce Website Database Implementation
# ElectroMart API

**ElectroMart API** is a RESTful API built with **Node.js** and **Express** to manage products, users, and orders in an e-commerce platform. It uses **MySQL** for database management, handling operations like user registration and login (secured with **bcryptjs**), product retrieval, and order creation. The API allows users to interact with the platform by retrieving product data, managing their shopping cart, and placing orders.

## 🛠 Technologies used
### 1. Frontend:
- **React**: The core JavaScript library used to build the user interface, enabling a dynamic, interactive, and component-based architecture.
- **React Router**: A library used for handling routing and navigation between different pages (e.g., Home, Products, Cart, Orders, etc.).
- **CSS**: Used to style the frontend, ensuring responsive design and visual consistency.
- **Axios**: A promise-based HTTP client used to make API requests to the backend server for interacting with resources like products, orders, and user data.
- **LocalStorage**: A browser feature used to store cart data and user login state persistently across sessions.
  
### 2. Backend:
- **Node.js**: A JavaScript runtime environment that allows the backend to run JavaScript code server-side.
- **Express.js**: A web application framework for Node.js, used to handle routing and HTTP requests on the server.
- **MySQL**: A relational database management system for storing product data, user information, orders, and other essential business data.
- **bcrypt.js**: A library used to hash user passwords securely before storing them in the database, ensuring password security during authentication.

### 3. API Testing:
- **Postman**: A tool used for testing APIs by sending HTTP requests to the backend. Postman allows for efficient testing of endpoints (e.g., user login, product retrieval, order creation) and validating responses from the server during development.

### 4. Version Control:
- **Git**: A version control system used to track changes in the project and enable collaboration between team members.


---

## Running ElectroMart - Step-by-Step Setup

### Prerequisites:
Before starting, make sure you have the following installed:
- **Node.js** (with npm) - For running both the frontend and backend servers.
- **MySQL** - For setting up the database.


### 1. **Clone the Repository**
Clone the repository to your local machine.
```bash
git clone <backend-repository-url>
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
3. Import the file `electromart.sql`  //LEGG TIL RIKTIG FILBANE

### 4. Change to you setup (if needed)
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


---

## 📌 **API-endepunkter**

### 🔹 **Autentisering**
| Metode | Endepunkt         | Beskrivelse                |
|--------|-------------------|----------------------------|
| POST   | `/users/register` | Registrer ny bruker        |
| POST   | `/users/login`    | Logg inn, returnerer JWT   |

### 🔹 **Produkter**
| Metode | Endepunkt       | Beskrivelse                   |
|--------|---------------|------------------------------|
| GET    | `/products`   | Hent alle produkter         |
| POST   | `/products`   | Legg til nytt produkt       |
| PUT    | `/products/<id>` | Oppdater et produkt        |
| DELETE | `/products/<id>` | Slett et produkt           |

### 🔹 **Ordrer** (Krever JWT-token)
| Metode | Endepunkt          | Beskrivelse               |
|--------|--------------------|---------------------------|
| GET    | `/orders`          | Hent alle ordrer         |
| POST   | `/orders`          | Opprett ny ordre         |
| PUT    | `/orders/<id>`     | Oppdater ordrestatus     |
| DELETE | `/orders/<id>`     | Slett en ordre           |

---

## 🔑 **Autentisering (JWT)**
- Etter innlogging må du legge til **Authorization: Bearer <TOKEN>** i **Headers** i Postman for beskyttede endepunkter.

---

## 🧪 **Testing i Postman**
- Importer Postman-kolleksjonen (ElectroMart.postman_collection.json)
- Send **POST /users/login** for å få en JWT-token
- Bruk tokenen for å teste beskyttede endepunkter

---

## 🚀 **Videre utvikling**
- 🌍 **Frontend**: Bygge en UI for ElectroMart
- 🔐 **Sikkerhet**: Forbedre autentisering og autorisasjon
- ☁️ **Deploy**: Rulle ut backend til en server (Heroku, AWS, Railway)

---



