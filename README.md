# Community Board Frontend

Frontend application for the **Community Board** platform, built with **React**.  
This app allows users to register, log in, create posts with tags, like posts, comment, and view user profiles.

---

## 🚀 Features

- User authentication (JWT-based)
- Create, edit, and delete posts
- Tags system with filtering
- Like (vote) system
- Comments on posts
- User profile pages with avatars
- Responsive and clean UI
- Real-time interaction with backend API

---

## 🛠 Tech Stack

- **React**
- **React Router**
- **Axios**
- **React Hooks**
- **Custom CSS (CSS variables)**
- **React Hot Toast**

## 📁 Project Structure

src/
├── api/
│ └── axios.js
├── components/
├── contexts/
├── pages/
├── services/
├── App.js
├── index.js

▶️ Run Locally
Install dependencies:

npm install
Start development server:

http://localhost:3000
🔗 Backend Connection
The frontend communicates with the backend via REST API using Axios.

Example API base URL:

bash
Copy code
http://localhost:5000/api
Endpoints used include:

/auth

/posts

/comments

/likes

/profile

🏷 Tags System
Tags are selected during post creation

Sent to backend as an array

Stored as JSON in the database

Parsed and rendered dynamically

Used for real-time filtering in the feed

Example:

less
Copy code
#discussion #help #news
🔐 Authentication
JWT stored in localStorage

Automatically attached to requests via Axios interceptor

Protected routes require authentication

🌍 Deployment
Frontend can be deployed on Vercel

Backend hosted separately (e.g. Render)

API URL configured using environment variables

👨‍💻 Author
Omar Salam
Computer Science
Lebanese International University (LIU)

📌 Notes
This project was initially bootstrapped with Create React App, then extended with custom architecture and features.
