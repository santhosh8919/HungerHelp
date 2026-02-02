# 🍽️ HungerHelp

**HungerHelp** is a surplus food management platform built to help reduce food waste and connect surplus food donors with needy recipients — such as individuals, NGOs, shelters, or institutions.

🔗 **Live Demo:** [http://surplus-food-management-client.onrender.com/](http://surplus-food-management-client.onrender.com/)

---

## 🌟 Project Overview

Food wastage is a pressing global issue while millions still go hungry. HungerHelp bridges this gap by providing an online system where:

* **Food donors** can register and list surplus food.
* **Recipients** (individuals, volunteers, NGOs) can view and request available donations.
* **Admin** can manage donation approvals and ensure safe distribution.

This increases visibility and efficiency of food distribution while minimizing waste.

---

## 🗂️ Features

✔️ User registration and authentication (Donor, Recipient, Admin)
✔ Dashboard for tracking donations and requests
✔ Add & manage surplus food items
✔ Search and filter food donations
✔ Real‑time removal of claimed or processed items
✔ Clean, intuitive frontend UI

---

## 🧠 Technology Stack

| Layer      | Technology Used                 |
| ---------- | ------------------------------- |
| Frontend   | React.js, HTML, CSS, JavaScript |
| Backend    | Node.js, Express.js             |
| Database   | MongoDB                         |
| Auth       | JSON Web Tokens (JWT)           |
| Deployment | Render                          |

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/santhosh8919/HungerHelp.git
```

### 2️⃣ Backend Setup

```bash
cd HungerHelp/server
npm install
```

Create a `.env` file with:

```
PORT=5000
MONGODB_URI=<your_mongo_connection_string>
JWT_SECRET=<your_jwt_secret>
```

Start the server:

```bash
npm start
```

### 3️⃣ Frontend Setup

```bash
cd HungerHelp/client
npm install
```

Update the API base URL in your React config/environment file if needed:

```
REACT_APP_API_URL=http://localhost:5000
```

Start the client:

```bash
npm start
```

---

## ⚙️ Folder Structure (Example)

```
HungerHelp/
├── client/                  # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── index.js
├── server/                  # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── .gitignore
└── README.md
```

---

## 🖼️ Screenshots / Usage

*(Replace these with actual images from your project if available)*

**Landing Page**
<img width="1895" height="934" alt="image" src="https://github.com/user-attachments/assets/46972b62-b09c-418d-9c08-d375f512092c" />

**Donor Dashboard**
<img width="1897" height="754" alt="image" src="https://github.com/user-attachments/assets/48e5bd99-7650-4cf4-9970-a49067f6fed3" />

<img width="1876" height="927" alt="image" src="https://github.com/user-attachments/assets/5b2b75ac-ef8e-449d-a58e-b724e2d2b1e3" />

---

## 👍 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/xyz`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature/xyz`)
5. Open a Pull Request

---



---

## 📞 Contact

Maintained by: **Santhosh Mudavath**
GitHub: [https://github.com/santhosh8919](https://github.com/santhosh8919)
Email:mudavathsanthosh883@gmail.com



[1]: https://github.com/santhosh8919/HungerHelp "GitHub - santhosh8919/HungerHelp"



