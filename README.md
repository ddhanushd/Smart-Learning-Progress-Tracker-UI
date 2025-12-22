🎨 Smart Learning Progress Tracker — Frontend

A modern Angular frontend for the Smart Learning Progress Tracker application, designed to work seamlessly with a JWT-secured Spring Boot backend.

This frontend focuses on clean UX, secure authentication handling, and real-world Angular best practices, demonstrating how a production UI integrates with a stateless backend.

✨ Key Features
🔐 Authentication & Session Management

Username & password–based login

JWT Access Token handling

Transparent Refresh Token flow (no user interaction)

Secure logout with backend refresh-token invalidation

Persistent login across browser refreshes

Automatic redirect on unauthorized access (401)

🔒 Refresh tokens are never exposed in the UI

🧭 Routing & Navigation

Protected routes using Angular route guards

Authentication-only guard (authGuard)

Backend-driven authorization (no role guessing in UI)

Clean redirection to login on session expiry

📚 Topic Management UI

View all learning topics

Search topics by name

Sort topics by:

Confidence

Name

Deadline

Paginated topic listing

Topic detail view

Inline revision support:

Update confidence

Add revision notes

Mark topic as completed

Real-time UI updates after actions

📊 Learning Analytics

Statistics dashboard showing:

Strong topics

Average topics

Weak topics

Aggregated view for quick progress tracking

🎨 UI & UX

Clean, distraction-free layout

Dark-mode support with theme persistence

Separate layout for authentication pages

Login page has no header/footer

Responsive design

Clear loading & error states

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

🔑 Authentication Flow (Frontend Perspective)
🔐 Login

User submits username & password

Backend returns:

Access Token (JWT)

Refresh Token

Tokens stored securely in browser storage

User redirected to protected routes

🔁 Token Refresh (Automatic)

Access token expiry detected in HTTP interceptor

Refresh token used to fetch a new access token

Original request retried silently

User experience remains uninterrupted

🔓 Logout

Logout request sent to backend

Refresh token invalidated server-side

Tokens cleared client-side

User redirected to login page

🧠 Design Decisions
✔ Backend-First Authorization

Frontend does not enforce roles

Backend is the single source of truth

UI reacts gracefully to 401 and 403 responses

✔ Stateless UI

No session state stored in components

All authentication is token-based

Clean separation of concerns

✔ Layout Separation

Login page rendered without app shell

Protected pages rendered with full layout

Prevents visual clutter and improves UX

🧰 Tech Stack
Layer	Technology
Framework	Angular (Standalone Components)
Language	TypeScript
Routing	Angular Router
State Handling	Component state + Observables
HTTP	Angular HttpClient
Auth Handling	HTTP Interceptors
Styling	SCSS
UI Pattern	Clean, minimal, dashboard-style
▶️ Running the Frontend
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

🧪 Tested Scenarios

Login / logout flow

Token refresh after access token expiry

Route protection on reload

Unauthorized access handling

Search, sort, pagination

Revision & completion workflows

🚀 Future Enhancements

Role-based UI hints (UX only)

Toast notifications

Skeleton loaders

Improved accessibility

Mobile-first refinements

🎯 Interview-Ready Highlights

“The frontend uses Angular route guards and HTTP interceptors to integrate with a stateless JWT-secured backend. Authentication is transparent to users, with refresh tokens handled silently and authorization enforced strictly server-side.”

👤 Author

D Dhanush
Frontend & Backend Developer
Java | Spring Boot | Angular

🔗 GitHub: https://github.com/ddhanushd

⭐ If you like this project, give it a star and feel free to contribute!
