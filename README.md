📚 Library Management System

A simple Library Management System built with HTML, CSS, and JavaScript. It supports two types of users: Admins and Members.

Admins can manage books (add, edit, delete) and members.

Members can browse books and request to borrow them.

A Dark/Light Mode toggle is available and persists across pages.

🚀 Features
🔑 Authentication

Simple login system for Admin and Member roles.

👨‍💻 Admin Dashboard

Add new books with details (title, author, category, etc.).

Edit existing book details.

Delete books from the catalog.

View list of available and borrowed books.

View list of Member.

👥 Member Dashboard

Browse the library’s book collection.

Request to borrow books.

See borrowed books.

🌗 Dark/Light Mode

Toggle between Light ☀️ and Dark 🌙 mode.

Preference is saved using localStorage, so it stays consistent across pages until changed.

🛠️ Tech Stack

Frontend: HTML, CSS, JavaScript

Data Handling: LocalStorage (can be upgraded to a real database later)

📂 Project Structure
library-management/
│── index.html            # Login page
│── admin-dashboard.html  # Admin dashboard
│── member-dashboard.html # Member dashboard
│── aboutUs.html 
│── contact.html 
│── signIn.html
│── register.html
│── style.css             # Stylesheet
│── script.js             # Main JavaScript logic (CRUD, toggle, etc.)
│── README.md             # Project documentation

⚡ Setup & Usage

Clone or download the repository.

git clone https://github.com/ekramjemalh/Library_Management_System_Webpage.git


Open index.html in your browser.

Login as either:

Admin → access book management tools.

Member → borrow/request books.

🎨 Dark/Light Mode

Toggle button:☀️


JS handles persistent theme with localStorage.

📌 Future Improvements

Add real authentication with a backend.

Store book & user data in a database.

Implement borrow/return approval workflow.

Add search & filter functionality for books.

📜 License

This project is free to use and modify for learning purposes.

## 👤 Connect with Me  

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-blue?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ekram-jemalh)

