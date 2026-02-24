# I'm Booked — Frontend

The frontend of an appointment booking system for businesses.

## Tech Stack

- **Framework:** React with TypeScript
- **Build Tool:** Vite
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS

## Project Structure

```
src/
├── components/       
│   ├── LoginForm.tsx
│   └── RegisterForm.tsx
├── pages/            
│   ├── Home.tsx
│   ├── Login.tsx
│   └── Register.tsx
├── services/         
│   ├── Axios.ts      
│   ├── Login.ts
│   ├── Register.ts
│   └── GetUser.ts
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

4. Run the server:
   ```bash
   npm run dev
   ```
   
## Authentication

Authentication is handled by JWT tokens:

- **Access token** — stored in memory, attached to each request's `Authorization` header
- **Refresh token** — stored in an HttpOnly cookie, sent automatically by the browser to refresh the access token

The Axios instance automatically attempts to refresh the access token on `401` responses, and redirects to `/login` if the refresh fails.

## Backend

- [I'm Booked Backend](https://github.com/enelrith/im-booked) - The Spring Boot backend of this project.