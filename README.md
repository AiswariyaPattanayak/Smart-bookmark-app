

📘 Smart Bookmark App

📌 Project Overview

Smart Bookmark App is a web application that allows users to save, organize, and manage their bookmarks efficiently.
Users can store links, categorize them, and access them quickly from a clean dashboard.

The application also includes secure authentication and cloud storage integration.

⸻

🚀 Live Demo

Deployed on Vercel
(https://smart-bookmark-app-jy4m.vercel.app/)

⸻

🛠 Tech Stack
	•	Frontend: React + Vite
	•	Backend/Auth/Database: Supabase
	•	Authentication: Google OAuth via Google Cloud Console
	•	Styling: CSS / (add Tailwind/Bootstrap if used)

⸻

✨ Features
	•	🔖 Save bookmarks with title & URL
	•	🗂 Organize links
	•	🔍 Quick search functionality
	•	🔐 Google Sign‑In authentication
	•	☁️ Cloud storage with Supabase
	•	📱 Responsive UI

⸻

📂 Installation & Setup

Clone the repository:

git clone <https://github.com/AiswariyaPattanayak/Smart-bookmark-app.git>
cd smart-bookmark-app

Install dependencies:

npm install

Run the development server:

npm run dev


⸻

🔐 Environment Variables

Create a .env file and add:

VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key


⸻

⚠️ Problems Faced & How I Solved Them

❌ Problem 1: Google Login Error — redirect_uri_mismatch

Issue:
While implementing Google authentication, the login failed with:

Error 400: redirect_uri_mismatch

Cause:
The redirect URL from Supabase was not added to Google OAuth credentials.

✅ Solution:
	1.	Open Google Cloud Console
	2.	Go to OAuth Client → Authorized Redirect URIs
	3.	Add Supabase callback URL
    4.	Save changes and restart the app

After adding the correct callback URL, Google login worked successfully.

⸻

❌ Problem 2: Authentication not working after deployment

Issue:
Login worked locally but failed on production.

Cause:
Production domain was missing in Supabase redirect settings.

✅ Solution:

Added the deployed site URL in:
	•	Supabase → Authentication → Redirect URLs

⸻

❌ Problem 3: Confusion setting up OAuth credentials

Issue:
Difficulty locating Client ID and configuring it correctly.

✅ Solution:
	•	Generated Web OAuth Client ID from Google Cloud Console
	•	Linked it to Supabase provider settings
	•	Verified both local & production URLs

⸻

📈 Future Improvements
	•	🏷 Bookmark tagging system
	•	🌙 Dark mode
	•	📊 Usage analytics
	•	🔄 Bookmark import/export

⸻

📚 What I Learned
	•	Setting up OAuth authentication flow
	•	Integrating Supabase with frontend apps
	•	Handling deployment environment differences
	•	Debugging redirect URI issues
	•	Managing environment variables securely

⸻

👩‍💻 Author:
Aiswariya Pattanayak
GitHub: https://github.com/AiswariyaPattanayak/Smart-bookmark-app.git
Vercel: https://smart-bookmark-app-jy4m.vercel.app/
