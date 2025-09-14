# AI SaaS Chat Bot (MERN + OpenAI)

A full‑stack AI chatbot inspired by ChatGPT. Users can sign up, log in, chat with an AI model (OpenAI), and have their messages securely stored and managed in MongoDB. Authentication uses signed, HTTP‑only cookies with JWTs.

- Backend: Node.js, Express, TypeScript, MongoDB (Mongoose)
- Frontend: React, TypeScript, Vite, MUI
- AI: OpenAI Chat Completions (gpt-3.5-turbo)

## Features

- JWT auth with signed HTTP‑only cookies (secure by default)
- User signup/login/logout & auth status
- Persisted chat history per user (view and delete)
- OpenAI chat completion integration
- Request validation with express-validator
- Structured controllers/routes with TypeScript

## Project structure

```
AI-SaaS-Chat-Bot/
  backend/           # Express + TS API server
    src/
      app.ts
      index.ts
      config/openai-config.ts
      controllers/
      db/connection.ts
      models/User.ts
      routes/
      utils/
    package.json
  frontend/          # React + Vite web app
    src/
      main.tsx       # axios baseURL and withCredentials
      ...
    package.json
  README.md          # You are here
```

## Prerequisites

- Node.js 18+ and npm
- A MongoDB connection string
- OpenAI API key (and optionally Organization ID)

## Quick start (Windows PowerShell)

1) Backend

- Copy environment variables and fill your values:

```powershell
# from project root
Copy-Item backend/.env.example backend/.env
```

- Install deps and start the API server:

```powershell
cd backend
npm install
npm run dev
```

By default the API listens on http://localhost:5000.

2) Frontend

In a new terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

### Important CORS note for local dev

In `backend/src/app.ts` the CORS origin is currently set to `https://ai-mern-chatbot.netlify.app`. For local development you should change it to your Vite URL (default `http://localhost:5173`) or to an array of allowed origins.

Example change in `app.ts`:

```ts
app.use(
  cors({ origin: "http://localhost:5173", credentials: true })
);
```

Alternatively, you can refactor it to read from an environment variable (e.g., `FRONTEND_ORIGIN`).

Also ensure the frontend sends cookies: in `frontend/src/main.tsx` we already set `axios.defaults.withCredentials = true`.

## Environment variables (backend)

Create `backend/.env` with:

```
# Server
PORT=5000
COOKIE_SECRET=replace-with-random-long-string
JWT_SECRET=replace-with-strong-secret

# Database
MONGODB_URL=mongodb+srv://<user>:<pass>@cluster0.xxx.mongodb.net/your-db

# OpenAI
OPEN_AI_SECRET=sk-...
# Optional, only if your account uses an organization
OPEN_AI_ORGANIZATION=org_...
```

Notes:
- `COOKIE_SECRET` signs cookies for tamper-proofing.
- `JWT_SECRET` signs your JWTs stored in the cookie named `auth_token`.
- `MONGODB_URL` must be reachable from your machine (IP allowlist if using Atlas).

## Running scripts

Backend (from `backend/`):
- `npm run dev` — TypeScript watch + nodemon on compiled JS
- `npm run build` — TypeScript build to `dist/`
- `npm start` — Run compiled server from `dist/index.js`

Frontend (from `frontend/`):
- `npm run dev` — Vite dev server
- `npm run build` — TypeScript check + Vite build
- `npm run preview` — Preview built files

## API overview

Base URL: `http://localhost:5000/api/v1`

Auth (cookie-based):
- POST `/user/signup` — body: `{ name, email, password }` → sets auth cookie; returns `{ name, email }`
- POST `/user/login` — body: `{ email, password }` → sets auth cookie; returns `{ name, email }`
- GET `/user/auth-status` — requires cookie → `{ name, email }`
- GET `/user/logout` — clears auth cookie

Chats (require cookie):
- POST `/chat/new` — body: `{ message }` → returns `{ chats }` (array of messages `{ id, role, content }`)
- GET `/chat/all-chats` — returns `{ message: "OK", chats }`
- DELETE `/chat/delete` — clears saved chats → `{ message: "OK" }`

## Configuration notes

- Frontend Axios base URL is set in `frontend/src/main.tsx`:
  - `axios.defaults.baseURL = 'http://localhost:5000/api/v1'`
  - Update this when deploying or proxying through a different domain.
- Cookies are set for domain `localhost` by the backend; adjust for production as needed.

## Troubleshooting

- CORS error / cookies not sent:
  - Update `origin` in `backend/src/app.ts` to match your frontend URL.
  - Keep `axios.defaults.withCredentials = true` on the frontend.
- 401 "Token not provided" or "token expired":
  - Ensure you logged in/signup first and cookies are present.
  - Verify `COOKIE_SECRET`/`JWT_SECRET` are set and consistent.
- MongoDB connection failures:
  - Check `MONGODB_URL`, network access/IP allowlist, and DNS.
- OpenAI errors (401/429):
  - Verify `OPEN_AI_SECRET`, organization (if required), and rate limits.

## License

ISC (see package.json files).

## Acknowledgements

- OpenAI API
- React + Vite
- Express + Mongoose
