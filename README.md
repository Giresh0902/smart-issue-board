Issue Tracker – React + Firebase

This is a simple Issue Tracking Application built using React, Vite, Firebase Authentication, and Firestore.
Users can sign up, log in, create issues, update their status, and view all issues in a clean dashboard.

🚀 Live Demo

https://vercel.com/giresh0902s-projects/smart-issue-board

🛠️ Tech Stack
Frontend

React (component-based UI)

Vite (fast build tool and dev server)

CSS for styling

Backend (Serverless)

Firebase Authentication

Firebase Firestore (NoSQL database)

Deployment

Vercel (for hosting the frontend)

📘 Why I Chose This Stack

I selected React + Vite + Firebase because:

⚡ React makes UI development simple with reusable components.

⚡ Vite provides super-fast development and optimized production builds.

🔐 Firebase Auth handles sign-up/login securely with no backend code.

🔥 Firestore allows real-time updates — ideal for dynamic issue lists.

☁️ The entire system works serverlessly, making deployment very easy.

🚀 Perfect for small-to-medium projects that need fast development.

This combination is lightweight, scalable, and easy to maintain.

📂 Firestore Data Structure

I used a single collection called issues.

issues (collection)
   └── issueId (document)
         ├── title: string
         ├── description: string
         ├── priority: "Low" | "Medium" | "High"
         ├── status: "Open" | "In Progress" | "Done"
         ├── assignedTo: string
         ├── createdAt: timestamp

Why this structure?

Flat and simple → easier to query with getDocs()

Better performance for small datasets

Easy to update individual fields (like status)

Scales well for future improvements

🔁 How I Handled Similar Issues

To avoid duplicate or invalid issue handling:

Issue creation form uses controlled inputs to ensure complete data.

Status update is validated:

❌ Direct transition from Open → Done is not allowed.

After each update, loadIssues() is called to refresh the UI.

Firestore is always the source of truth, so UI never goes out of sync.

⚠️ Challenges & Confusing Parts

These were the main challenges faced during development:

🔐 Firebase Authentication Errors

400 Bad Request

Invalid API key issues
These required rechecking Firebase configuration and enabling Email/Password sign-in.

🔄 React Router + Vercel Refresh Issue

Pages gave 404 errors on refresh until adding:

{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}

🔥 Firestore Rules

Had to configure rules properly to read/write issues safely.

🔁 UI Not Updating

Updating issue status required re-fetching all issues to instantly refresh the list.

🚀 What I Plan to Improve Next
✨ Features

Role-based access (Admin / Developer / Tester)

Comments inside each issue

Attachments (images/screenshots)

Notifications on status change

Search, sort, and filter options

🎨 UI/UX

Better dashboard design

Add responsive design for mobile

Pagination for large issue lists

🧩 Backend

Add optional Node.js + MongoDB backend for advanced workflows.

📦 Installation & Setup
1️⃣ Clone the repo
git clone <your-repo-url>
cd <project-folder>

2️⃣ Install dependencies
npm install

3️⃣ Start development server
npm run dev

4️⃣ Build for production
npm run build

🔥 Firebase Setup
Create firebase.js inside src/
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);


Enable:

Email/Password Authentication

Firestore Database

Firestore Rules

🚀 Deployment (Vercel)

Push project to GitHub

Go to https://vercel.com

Import your repo

Build command:

npm run build


Output directory:

dist


Add vercel.json:

{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}


Deploy 🎉

🙌 Conclusion

This project demonstrates:

Firebase authentication

Firestore CRUD

React component architecture

Issue tracking features

Vercel deployment process

It is simple, scalable, and easy to extend.
