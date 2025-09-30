# Exercise Tracker — MERN Stack

A production-ready full-stack MERN app for tracking workouts/exercises.
Built with MongoDB, Express, React, Node (Vite + React Router). Clean APIs, client-side routing, and an accessible UI.

--------------------------------------------------------------------------------

## Features
- Create, browse, edit, and delete exercises
- Inline actions with clear success/error feedback
- Client-side routing (Home, Create, Edit)
- Basic form validation (name, reps, weight, unit, date)

--------------------------------------------------------------------------------

## Tech
- Frontend: React, Vite, React Router, Fetch API, react-icons
- Backend: Node, Express, Mongoose, MongoDB (Atlas or Local)
- Tooling: ES Modules, dotenv

--------------------------------------------------------------------------------

## Data Model
{
  "name": "Bench Press",
  "reps": 8,
  "weight": 135,
  "unit": "lbs",        // "lbs" | "kgs"
  "date": "07-30-21",   // MM-DD-YY
  "_id": "64f6f7..."
}

--------------------------------------------------------------------------------

## REST API (concise)

Base URL (local): http://localhost:3000

Create an exercise
- POST /exercises
- Send a JSON body with all fields (name, reps, weight, unit, date).
- Returns the newly created record (including _id).
- On invalid input, responds with {"Error":"Invalid request"} and a 400 status.

Fetch exercises
- GET /exercises → returns an array of all exercises.
- GET /exercises/:id → returns a single exercise by its id; if not found, {"Error":"Not found"} with 404.

Update an exercise
- PUT /exercises/:id
- Provide the full, validated exercise payload.
- Responds with the updated document; invalid body → 400, unknown id → 404.

Remove an exercise
- DELETE /exercises/:id
- On success, replies with 204 No Content; unknown id → 404 with {"Error":"Not found"}.

--------------------------------------------------------------------------------

## Environment Variables

Server (/server/.env)
PORT=3000
MONGODB_CONNECT_STRING=<your_mongodb_connection_string>
CORS_ORIGIN=http://localhost:5173

Client (/client/.env)
VITE_API_BASE_URL=http://localhost:3000
(If using a Vite proxy instead, configure it to forward /exercises to the server.)

--------------------------------------------------------------------------------

## Local Setup

Prerequisites
- Node 18+ (or 20+)
- MongoDB (Atlas URI or local instance)

1) Backend
cd server
npm install
npm start        # or: npm run dev
# -> http://localhost:3000

2) Frontend
cd client
npm install
npm run dev
# -> http://localhost:5173

--------------------------------------------------------------------------------

## Design Notes
- Validation enforced on both client and server.
- HTTP semantics respected (201 create, 204 delete, 400/404 for errors).
- Clear separation of concerns: Mongoose model ↔ controller ↔ React views.
