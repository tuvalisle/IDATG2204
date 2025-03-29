# IDATG2204
Semester Project: E-Commerce Website Database Implementation
# ElectroMart API

ElectroMart API er en RESTful API bygget med Flask og MySQL for å administrere produkter, brukere og ordrer i en e-handelsapplikasjon.

## 🛠 Teknologier brukt
- **Flask** – Web-rammeverk for Python
- **MySQL** (MariaDB) – Relasjonsdatabase
- **JWT** (JSON Web Token) – Autentisering
- **bcrypt** – Hashing av passord
- **Postman** – API-testing

---

## 📥 **Installasjon & Kjøring**

### 1️⃣ **Klon repoet og gå til mappen**
```bash
git clone https://github.com/ditt-repo/electromart-api.git
cd electromart-api
```

### 2️⃣ **Sett opp et virtuelt miljø og installer avhengigheter**
```bash
python3 -m venv venv
source venv/bin/activate  # (Windows: venv\Scripts\activate)
pip install -r requirements.txt
```

### 3️⃣ **Start MySQL og opprett databasen**
Logg inn på MySQL og kjør:
```sql
CREATE DATABASE electromart;
USE electromart;
```
Importer skjemaet:
```bash
mysql -u root -p electromart < database.sql
```

### 4️⃣ **Start Flask-serveren**
```bash
python app.py
```

Backend kjører nå på **`http://127.0.0.1:5000`** 🎉

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



