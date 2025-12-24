🎨 Smart Learning Progress Tracker — Frontend

A production-ready Angular frontend for the Smart Learning Progress Tracker application, designed to integrate seamlessly with a JWT-secured Spring Boot backend.

This project demonstrates how a modern Angular application handles stateless authentication, secure token management, and real-world UI patterns commonly used in enterprise systems.

✨ Key Features
🔐 Authentication & Session Management

Username & password–based login

JWT access token handling

Automatic refresh token flow (fully transparent to users)

Secure logout with backend refresh-token invalidation

Persistent login across browser refreshes

Automatic redirection on unauthorized access (401)

🔒 Refresh tokens are never exposed in the UI

🧭 Routing & Navigation

Protected routes using Angular route guards

Authentication-only guard (AuthGuard)

Backend-driven authorization (no role logic in UI)

Clean redirect to login on session expiry

📚 Topic Management

View all learning topics

Search topics by name

Sorting by:

Confidence

Name

Deadline

Pagination support

Topic detail view

Inline actions:

Update confidence

Add revision notes

Mark topics as completed

Real-time UI updates after actions

📊 Learning Analytics

Statistics dashboard displaying:

Strong topics

Average topics

Weak topics

Aggregated insights for quick progress tracking

🎨 UI & UX

Clean, distraction-free layout

Dark mode with theme persistence

Separate layouts for authentication and protected pages

Login page without header/footer

Responsive design

Clear loading and error states

Minimal, professional styling (no heavy UI libraries)

🏗️ Architecture Overview
AppComponent (Layout)
 ├── Header / Footer (Protected routes only)
 ├── RouterOutlet
 │    ├── LoginComponent
 │    ├── TopicListComponent
 │    ├── TopicDetailComponent
 │    ├── TopicCreateComponent
 │    └── TopicStatsComponent

🔑 Authentication Flow (Frontend)
🔐 Login

User submits credentials

Backend returns:

Access Token (JWT)

Refresh Token

Tokens stored securely in browser storage

User redirected to protected routes

🔁 Token Refresh (Automatic)

Access token expiry detected via HTTP interceptor

Refresh token used to fetch a new access token

Original request retried silently

No user interruption

🔓 Logout

Logout request sent to backend

Refresh token invalidated server-side

Tokens cleared client-side

User redirected to login page

🧠 Design Decisions
✔ Backend-First Authorization

Frontend does not enforce roles

Backend remains the single source of truth

UI reacts gracefully to 401 / 403 responses

✔ Stateless UI

No session state stored in components

Fully token-based authentication

Clean separation of concerns

✔ Layout Separation

Authentication pages rendered without app shell

Protected pages rendered with full layout

Improves UX and avoids visual clutter

🧰 Tech Stack
Layer	Technology
Framework	Angular (Standalone Components)
Language	TypeScript
Routing	Angular Router
HTTP	Angular HttpClient
Auth Handling	HTTP Interceptors
State	Component state + Observables
Styling	SCSS
UI Pattern	Minimal, dashboard-style
🌐 Deployment

The application is fully deployed and production-ready, with the frontend hosted on Vercel and the backend hosted on Render.

🔗 Live URLs

Frontend (Angular UI):
https://smart-learning-progress-tracker-ui.vercel.app

Backend (Spring Boot API):
https://smart-learning-progress-tracker-1.onrender.com

⚙️ Production Environment Configuration

Frontend is configured to use the deployed backend:

export const environment = {
  production: true,
  apiBaseUrl: 'https://smart-learning-progress-tracker-1.onrender.com/api/v1'
};

🔐 Production Highlights

Secure cross-origin communication between Vercel and Render

Stateless JWT-based authentication

Production-grade CORS configuration

Automatic token refresh works seamlessly in production

Same authentication and authorization flow as local development

✅ Verified in Production

Login & logout flow

Automatic token refresh

Route protection on reload

Unauthorized access handling (401)

Search, sort, and pagination

Revision & completion workflows

▶️ Running the Frontend Locally
1️⃣ Install dependencies
npm install

2️⃣ Configure environment

src/environments/environment.ts

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:9090/api/v1'
};

3️⃣ Start the application
ng serve

4️⃣ Access
http://localhost:4200

🚀 Future Enhancements

Role-based UI hints (UX-only)

Toast notifications

Skeleton loaders

Improved accessibility

Mobile-first refinements


👤 Author

D Dhanush
Frontend & Backend Developer
Java | Spring Boot | Angular

🔗 GitHub: https://github.com/ddhanushd

⭐ If you like this project, feel free to star it or contribute!
