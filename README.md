Sure. Here is the **full README.md code** with the demo credentials added.

````md
# 🍱 HungerHelp — Surplus Food Management System

HungerHelp is a full-stack web application designed to reduce food wastage by connecting people and organizations that have surplus food with those who need it.

The platform allows users to register, manage surplus food, search available food, and remove food once it has been collected.

---

## 🚀 Features

- 🔐 User Registration & Login
- 👤 User Authentication using JWT
- 📊 User Dashboard
- 🍱 Add and Manage Surplus Food
- 🔎 Search and Filter Food
- 📦 View Available Food
- ❌ Remove Food after Collection
- ⚡ Real-time food availability updates
- 📱 Responsive User Interface
- 🔒 Secure Backend APIs
- ☁️ Cloud Deployment using Render

---

## 🔐 Demo Credentials

Use the following credentials to log in to the live demo:

```text
Email: santhosh1@gmail.com
Password: santhosh
````

> **Note:** These credentials are intended only for demo/testing purposes. Do not use real or sensitive passwords in a public repository.

---

## 🛠️ Technologies Used

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* REST API

### Database

* MongoDB

### Authentication

* JSON Web Token (JWT)

### Deployment

* Render

---

## 📂 Project Structure

```text
HungerHelp/
│
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── App.jsx
│       └── main.jsx
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── README.md
└── package.json
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/santhosh8919/HungerHelp.git
```

Navigate into the project:

```bash
cd HungerHelp
```

---

## 💻 Frontend Setup

Navigate to the client folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run on the local development URL shown in your terminal.

---

## 🖥️ Backend Setup

Open another terminal and navigate to the server folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm start
```

For development:

```bash
npm run dev
```

---

## 🔑 Environment Variables

The following environment variables are required:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> Never upload your actual MongoDB connection string, JWT secret, API keys, or other private credentials to GitHub.

---

## 📸 Screenshots

### Login Page

Add your login page screenshot here.

```md
![Login Page](screenshots/login.png)
```

### Dashboard

Add your dashboard screenshot here.

```md
![Dashboard](screenshots/dashboard.png)
```

### Food Management

Add your food management screenshot here.

```md
![Food Management](screenshots/food-management.png)
```

---

## 🌐 Live Demo

**HungerHelp Live Application:**

[http://surplus-food-management-client.onrender.com/](http://surplus-food-management-client.onrender.com/)

---

## 🔗 GitHub Repository

[https://github.com/santhosh8919/HungerHelp](https://github.com/santhosh8919/HungerHelp)

---

## 🎯 Project Objective

The main objective of HungerHelp is to provide a simple digital platform for managing surplus food and reducing unnecessary food wastage.

The application helps users:

1. Add information about surplus food.
2. Make available food visible to other users.
3. Search and filter available food.
4. Manage food collection.
5. Remove food once it is no longer available.

---

## 🔄 Application Flow

```text
User
  │
  ▼
Register / Login
  │
  ▼
Dashboard
  │
  ├── Add Surplus Food
  │
  ├── View Available Food
  │
  ├── Search / Filter
  │
  └── Remove Collected Food
  │
  ▼
MongoDB Database
```

---

## 🔒 Authentication

HungerHelp uses JWT-based authentication.

The authentication flow is:

```text
User Login
    ↓
Backend verifies credentials
    ↓
JWT Token Generated
    ↓
Token sent to Client
    ↓
Client uses Token for Protected APIs
```

---

## 🤝 Contributing

Contributions are welcome!

If you would like to contribute:

```bash
git fork
```

Create a new branch:

```bash
git checkout -b feature/new-feature
```

Make your changes and commit:

```bash
git add .
git commit -m "Add new feature"
```

Push the changes:

```bash
git push origin feature/new-feature
```

Then create a Pull Request.

---

## 👨‍💻 Author

**Santhosh Mudavath**

Computer Science Graduate
Full-Stack Developer

### GitHub

[https://github.com/santhosh8919](https://github.com/santhosh8919)

### Email

[mudavathsanthosh883@gmail.com](mailto:mudavathsanthosh883@gmail.com)

---

## ⭐ Support

If you find this project useful, please consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is created for educational and demonstration purposes.

```

**Important:** Since the GitHub repository is public, anyone can see `santhosh1@gmail.com / santhosh`. Make sure this is a **dummy/demo account**, not an account using your real password.
```
