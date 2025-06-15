# 🔐 Full Stack Authentication App

A modern full-stack authentication application built with:

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Express.js + MongoDB + JWT
- **Auth**: Secure login/signup, profile editing, and session management via HTTP-only cookies
- **Deployment**: Dockerized setup with NGINX serving the frontend

---

## 🚀 Features

- User registration and login
- JWT-based authentication (stored in secure HTTP-only cookies)
- Profile dashboard with editable user info
- Password strength validation
- Role-based redirection and protected routes
- Full Docker and Docker Compose support

---

## 📁 Project Structure

```css

├── backend/
│ ├── config/ # DB connection
│ ├── middlewares/ # Auth middleware
│ ├── models/ # Mongoose models
│ ├── routes/ # Auth & user APIs
│ ├── utils/ # Validation & API utils
│ ├── Dockerfile # Backend Dockerfile
│ └── .env # Backend environment variables
├── frontend/
│ ├── components/
│ ├── context/
│ ├── pages/
│ ├── App.jsx
│ ├── main.jsx
│ ├── Dockerfile # Frontend Dockerfile
│ └── vite.config.js
├── docker-compose.yml
└── README.md

```

---

## ⚙️ Local Development Setup

1. Clone the repo

```bash
git clone https://github.com/durgeshpd/secure-vault.git
cd auth-app
```

2. Set environment variables
```bash
Backend .env
Inside backend/.env:

env

PORT=3000
MONGO_URI=mongodb://localhost:27017/authdb
JWT_SECRET=your_super_secret_key
FRONTEND_URL=http://localhost:5173
```
3. Install dependencies

Backend:

```bash

cd backend
npm install
```

Frontend:

```bash

cd ../frontend
npm install
```
4. Run app locally

In separate terminals:

Backend

```bash

cd backend
npm start
```
Frontend

```bash

cd frontend
npm run dev
```
Then visit http://localhost:5173

---

🐳 Docker Setup

Prerequisite: Docker & Docker Compose

Build and start containers:

```bash

docker-compose up --build

```

Frontend: http://localhost:5173

Backend API: http://localhost:3000

---

🧪 API Endpoints

Auth

POST /auth/signup — register a new user

POST /auth/login — login & receive cookie

POST /auth/logout — clear session

User

GET /users/me — get current user info

PATCH /users/me — update profile

PATCH /users/me/password — change password

---

🔐 Security

Passwords hashed using bcrypt

JWT stored in HTTP-only, secure cookies

Input validation via validator.js

CORS configured properly for dev and prod

---

🧰 Technologies Used

Frontend: React, Vite, Tailwind, React Router

Backend: Node.js, Express.js, MongoDB, JWT

Other: Axios, React Toastify, Docker, NGINX

---

📬 Contact

Feel free to open an issue or submit a pull request if you have ideas or improvements.
