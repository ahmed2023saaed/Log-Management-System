# Logging System (Full Stack Project)

A full-stack **Log Management System** built with:

- Backend: Node.js, Express, MongoDB (Mongoose)
- Frontend: React + Tailwind CSS

The system allows developers to manage applications and monitor logs in real time with filtering, sorting, and analytics.

---

## Features

### Authentication
- Developer register, login, logout
- JWT-based authentication
- Secure route protection

### API Key System
- Each developer gets a unique API key
- API key required for logging

### Application Management
- Create applications
- View all applications
- Delete applications
- View application details

### Log Management
- Store logs with levels: INFO, WARN, ERROR
- Auto increment count for repeated logs
- Pagination (10 logs per page)
- Sorting (latest / most occurred)
- Filtering by level
- Search logs by message

### Dashboard (Frontend)
- Developer authentication UI
- View API key
- Manage applications
- View logs per application
- Interactive table with sorting & filtering
- Pagination controls
- Responsive UI built with Tailwind CSS

### Bonus Features (Frontend)
- Pie chart (INFO / WARN / ERROR distribution)
- Line chart (logs per day per level)
- Analytics dashboard for better insights

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (Authentication)
- bcrypt.js
- dotenv

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- Chart.js (or other charting library)

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
- POST `/api/users/register` → Register developer
- POST `/api/users/login` → Login developer
- POST `/api/users/logout` → Logout developer

---

### Application Routes
- GET `/api/applications` → Get all applications
- GET `/api/applications/:name` → Get application by name
- POST `/api/applications` → Create application
- DELETE `/api/applications/:name` → Delete application

---

### Log Routes
- GET `/api/applications/:name/logs`
  - Pagination: `?page=1&limit=10`
  - Sorting: `?sort=createdAt` or `?sort=-createdAt`
  - Filtering: `?level=INFO|WARN|ERROR`
  - Search: `?message=error`

- POST `/api/applications/:name/logs`
  - Headers:
    - `x-api-key: YOUR_API_KEY`

---

## Security
- Passwords hashed using bcrypt
- JWT authentication
- Protected routes middleware
- API key validation for log submission

---

## Project Structure

### Backend

---

## Author

Ahmed Saaed
