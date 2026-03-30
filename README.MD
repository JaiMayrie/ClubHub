# ClubHub

A full-stack club management platform for student organizations.

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Containerization**: Docker

## Quick Start with Docker

### Prerequisites

- Docker Desktop installed
- Git

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/JaiMayrie/ClubHub.git
   cd ClubHub
   ```

2. **Start all services:**

   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - Database: localhost:5432

4. **Stop services:**
   ```bash
   docker-compose down
   ```

## Development

### View logs:

```bash
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

### Restart a service:

```bash
docker-compose restart backend
docker-compose restart frontend
```

### Reset database:

```bash
docker-compose down -v
docker-compose up --build
```

### Run commands in containers:

```bash
# Backend shell
docker exec -it clubhub-backend sh

# Frontend shell
docker exec -it clubhub-frontend sh

# Database shell
docker exec -it clubhub-db psql -U postgres -d clubhub
```

## Local Development (without Docker)

===============================================

## Backend Setup (Local Development)

### 1️⃣ Navigate to backend

````bash
cd backend

### 2️⃣ Install dependencies

npm install

### 3️⃣ Setup environment variables

cp .env.example .env

Update .env with your local database credentials and JWT secret.

Example:

PORT=5000
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_secret_key

### 4️⃣ Start backend in development mode

npm run dev

Server runs at:

http://localhost:5000

## 🧪 Running Backend Tests (Jest + Supertest)

We use Jest and Supertest for API testing.

Run all tests:
npm test

Tests cover:
1. User Registration
2. Input validation
3. Login
4. Error handling

Jest automatically prevents the server from starting during tests.

## 📮 Testing with Postman

You can manually test the API using Postman.

🔹 Health Check
GET http://localhost:5000/api/health

🔹 Register User
POST http://localhost:5000/api/auth/register

Body (JSON):

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}

🔹 Login User
POST http://localhost:5000/api/auth/login

Body (JSON):

{
  "email": "test@example.com",
  "password": "password123"
}

## 📂 Backend Structure

backend/
├── src/
│   ├── server.js
│   ├── routes/
│   │   └── auth.js
│   └── ...
├── tests/
│   └── auth.test.js
├── jest.config.js
└── package.json

===============================================

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
````

### Database Setup

See `DATABASE_SETUP.md`

## Project Structure

```
ClubHub/
├── frontend/          # React frontend application
├── backend/           # Node.js Express API
├── docker-compose.yml # Docker orchestration
└── README.md
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Clubs (NEW - Sprint 2)

- `GET /api/clubs` - Get all clubs
  - Query params:
    - `category` (optional) - Filter by category
    - `search` (optional) - Search by name/description
  - Example: `GET /api/clubs?category=Academic&search=data`
- `GET /api/clubs/:id` - Get club by ID (coming soon)
- `POST /api/clubs` - Create club (admin only, coming soon)
- `GET /api/clubs/my-clubs` - Get current user's clubs (coming soon)

### System

- `GET /api/health` - Health check
- `GET /api` - Welcome message

## Testing Club Endpoints

### Get All Clubs

```bash
curl http://localhost:5000/api/clubs
```

### Filter by Category

```bash
curl "http://localhost:5000/api/clubs?category=Academic"
```

### Search Clubs

```bash
curl "http://localhost:5000/api/clubs?search=chess"
```

### Combined Filters

```bash
curl "http://localhost:5000/api/clubs?category=Sports&search=basketball"
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

### User Profile
- `GET /api/auth/profile` - Get current user profile (name, email, role, join date)
- `PATCH /api/auth/profile` - Update profile name
- `PATCH /api/auth/password` - Change password (requires current password)

### Club Members 
- `GET /api/clubs/:id/members` - Get all members of a club (admin only)
- `DELETE /api/clubs/:id/members/:userId` - Remove a member from club (admin only)

### Memberships
- `GET /api/memberships/my-memberships` - Get current user's club memberships
- `DELETE /api/memberships/:clubId` - Leave a club

### Join Requests
- `POST /api/join-requests` - Submit a join request
- `GET /api/join-requests/my-requests` - Get current user's requests
- `PATCH /api/join-requests/:id` - Approve or reject a request (admin only)
