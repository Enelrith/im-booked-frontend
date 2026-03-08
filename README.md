# I'm Booked — Frontend

A React frontend for small business owners to manage their services and appointments.

## Tech Stack

- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Icons:** Font Awesome

## Features

- Register and log in with JWT-based authentication
- Create and manage multiple businesses
- Define services with custom pricing and duration
- Book and manage appointments with status tracking
- View business reports with overall and monthly stats — total appointments, revenue, and breakdowns by status

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx
│   ├── BusinessSidebar.tsx
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   ├── ServiceRow.tsx
│   ├── ServiceFooterRow.tsx
│   ├── AppointmentRow.tsx
│   ├── AppointmentFooterRow.tsx
│   └── DisplayAppointments.tsx
├── pages/
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── BusinessDashboard.tsx
│   ├── CreateBusiness.tsx
│   ├── ViewBusiness.tsx
│   ├── ViewReport.tsx
│   └── Unauthorized.tsx
├── services/
│   ├── Axios.ts                # Axios instance + refresh token interceptor
│   ├── Login.ts
│   ├── Register.ts
│   ├── BusinessView.ts
│   ├── BusinessThumbnails.ts
│   ├── BusinessAppointments.ts
│   ├── BusinessServices.ts
│   ├── CreateBusiness.ts
│   └── BusinessReport.ts
├── types/
│   └── index.ts
└── utils/
    └── index.ts
```

## Setup

1. Clone the repo
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in the values:
   ```env
   VITE_BACKEND_URL=http://localhost:8080
   VITE_FRONTEND_URL=http://localhost:5173
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```

## Authentication

- On login, the access token is stored in memory and attached to every request via the `Authorization` header
- The refresh token is stored in an HttpOnly cookie managed by the browser
- The Axios interceptor automatically refreshes the access token on `401` responses using the cookie

## Backend

- [I'm Booked Backend](https://github.com/enelrith/im-booked)