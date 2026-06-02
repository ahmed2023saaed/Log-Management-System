# Logging System Backend API

A backend system built with Node.js, Express, and MongoDB (Mongoose) that allows developers to manage applications and collect runtime logs with different severity levels.

---

## Features

- Developer authentication (Register / Login / Logout)
- Unique API key generation per developer
- Application management (create, read, delete)
- Log management system with levels (INFO, WARN, ERROR)
- Automatic log counting for repeated messages
- Filtering, sorting, and pagination for logs
- Protected routes using JWT and API key validation

---

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Token (JWT)
- bcrypt.js
- dotenv

---

## Data Models

### Developer
- username (string)
- email (unique)
- password (hashed)
- apiKey (unique, generated automatically)

### Application
- name (unique, no spaces allowed)
- createdAt (date)
- developer (reference to Developer)

### Log
- message (string)
- level (INFO | WARN | ERROR)
- count (number of occurrences)
- createdAt (date)
- updatedAt (date)
- application (reference to Application)

---

## API Endpoints

### Developer Routes
- POST /api/users/register → Create a new developer
- POST /api/users/login → Login developer
- POST /api/users/logout → Logout developer

---

### Application Routes
- GET /api/applications → Get all applications
- GET /api/applications/:name → Get application by name
- POST /api/applications → Create new application
- DELETE /api/applications/:name → Delete application

---

### Log Routes

- GET /api/applications/:name/logs  
Supports:
- Pagination: ?page=1&limit=10
- Sorting: ?sort=createdAt or ?sort=-createdAt
- Filtering: ?level=INFO | WARN | ERROR

- POST /api/applications/:name/logs  
Headers required:
- x-api-key: YOUR_API_KEY

---

## Security

- Passwords are hashed using bcrypt
- JWT authentication protects routes
- API key required for creating logs
- Middleware used for authorization and validation

---

## Environment Variables

PORT=3000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  

---

## Project Structure

src/
├── models/
├── routes/
├── controllers/
├── middleware/
├── config/
├── server.js

---

## Run Project

npm install  
npm run dev

---

## Author

Ahmed Saaed
