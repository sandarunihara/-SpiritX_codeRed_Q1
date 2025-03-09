# -SpiritX_codeRed_Q1
# SecureConnect - SpiritX_codeRed_Q1

## 📌 Project Overview
SecureConnect is a secure authentication system built using the **MERN stack** with **Vite** for the frontend. The system features a robust signup and login mechanism with real-time validation, authentication error handling, session management, and password security enhancements.

## 🚀 Features Implemented
### 🔹 Signup Page
- ✅ Username, Password, and Confirm Password fields.
- ✅ Field-specific error messages for validation failures.
- ✅ Prevents signup if fields are empty.
- ✅ Ensures username uniqueness and minimum 8-character length.
- ✅ Password requirements: one lowercase, one uppercase, one special character.
- ✅ Password confirmation check.
- ✅ Real-time validation for all fields.
- ✅ Authentication errors displayed above the CTA button.
- ✅ Confirmation dialog with auto-redirect to login after successful signup.
- ✅ Password strength indicator.

### 🔹 Login Page
- ✅ Username and Password input fields.
- ✅ Error messages under input fields for validation failures.
- ✅ Prevents login if fields are empty.
- ✅ Consistent error handling and validation as Signup Page.
- ✅ Prevents login if username doesn’t exist or password is incorrect.
- ✅ Real-time validation for all fields.
- ✅ Upon successful login, redirects to a landing page.
- ✅ Displays a personalized message: **"Hello, <username>!"**
- ✅ Implements session management to keep the user logged in until they logout.
- ✅ Logout redirects the user back to the login page.

---

## 🛠️ Instructions to Run the Project
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/SecureConnect.git
cd SecureConnect
```

### 2️⃣ Install Dependencies
#### Frontend Setup (Vite + React)
```sh
cd frontend
npm install
npm run dev
```
Visit `http://localhost:5173/` in your browser.

#### Backend Setup (Express + MongoDB)
```sh
cd backend
npm install
npm start
```
Server runs on `http://localhost:5000/`

### 3️⃣ Environment Variables (Create `.env` files)
#### Backend `.env`
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

## 🗄️ Database Setup & Configuration
### 🔹 MongoDB Setup
1. Install MongoDB and start the service.
2. Use the provided **MongoDB dump** to populate sample users.
3. Run the following command to import the database dump:
```sh
mongorestore --uri="your_mongodb_connection_string" --db secureconnect dump/
```

---

## 🤔 Assumptions Made During Development
- Each username is unique.
- Password strength is measured using a predefined complexity rule.
- Real-time validation provides instant feedback before form submission.

---

## 🔥 Additional Features
- 🌟 JWT-based authentication.
- 🌟 Secure password hashing using **bcrypt**.
  

---

## 📌 Ready to Secure Your Place at the Top? Start Coding and Xcelerate Your Way to Success! 🚀

