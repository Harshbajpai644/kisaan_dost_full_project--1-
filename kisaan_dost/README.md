KisaanDost - Fullstack Starter

Structure:
- frontend/  (React + Vite + Tailwind)
- backend/   (Node.js + Express + MongoDB)

Quickstart (backend):
1. cd backend
2. npm install
3. create .env with MONGO_URI and JWT_SECRET (see .env.example)
4. npm run dev

Quickstart (frontend):
1. cd frontend
2. npm install
3. npm run dev

Notes:
- The backend currently includes a DEV OTP stub in routes/auth.js (code '1234').
- Replace auth stub with Twilio Verify or MSG91 for production.
