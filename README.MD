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

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Update .env with your local database credentials
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Database Setup

See database setup documentation in the database branch.

## Project Structure

```
ClubHub/
├── frontend/          # React frontend application
├── backend/           # Node.js Express API
├── docker-compose.yml # Docker orchestration
└── README.md
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api` - Welcome message

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT
