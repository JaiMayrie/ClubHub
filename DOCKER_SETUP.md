# ClubHub Docker Setup Guide

## First Time Setup

### 1. Install Docker Desktop

- Download from https://www.docker.com/products/docker-desktop
- Install and start Docker Desktop
- Verify installation: `docker --version`

### 2. Clone and Start

```bash
git clone https://github.com/JaiMayrie/ClubHub.git
cd ClubHub
docker-compose up --build
```

### 3. Access the Application

- Frontend: http://localhost:5173
- Backend: http://localhost:5000/api/health
- Database: localhost:5432

## Common Commands

### Start services

```bash
docker-compose up
```

### Start in background

```bash
docker-compose up -d
```

### Stop services

```bash
docker-compose down
```

### Rebuild after changes

```bash
docker-compose up --build
```

### View logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

### Restart a service

```bash
docker-compose restart backend
```

### Reset everything (including database)

```bash
docker-compose down -v
docker-compose up --build
```

### Execute commands in containers

```bash
# Backend shell
docker exec -it clubhub-backend sh

# Frontend shell
docker exec -it clubhub-frontend sh

# Database shell
docker exec -it clubhub-db psql -U postgres -d clubhub

# Run npm commands in backend
docker exec -it clubhub-backend npm install express

# Run npm commands in frontend
docker exec -it clubhub-frontend npm install axios
```

## Development Workflow

### Making Backend Changes

1. Edit files in `backend/` folder
2. Changes auto-reload (volume mounted)
3. If you add new dependencies:
   ```bash
   docker-compose restart backend
   ```

### Making Frontend Changes

1. Edit files in `frontend/src/` folder
2. Vite hot-reload will update automatically
3. If you add new dependencies:
   ```bash
   docker-compose restart frontend
   ```

### Database Changes

1. Connect to database:
   ```bash
   docker exec -it clubhub-db psql -U postgres -d clubhub
   ```
2. Run SQL commands or load schema files

## Troubleshooting

### Port already in use

```bash
# Find process using port
netstat -ano | findstr :5173  # Windows
lsof -i :5173                 # Mac/Linux

# Change port in docker-compose.yml
ports:
  - "3000:5173"  # Use port 3000 instead
```

### Container won't start

```bash
# Check logs
docker-compose logs backend

# Remove old containers/volumes
docker-compose down -v
docker system prune -a
docker-compose up --build
```

### Database connection error

```bash
# Verify database is running
docker-compose ps

# Check database logs
docker-compose logs db

# Restart database
docker-compose restart db
```

### Can't connect to frontend

- Make sure http://localhost:5173 (not 127.0.0.1)
- Check if firewall is blocking
- Try `docker-compose restart frontend`

### Changes not reflecting

```bash
# Rebuild containers
docker-compose down
docker-compose up --build

# Clear Docker cache
docker builder prune
docker-compose up --build
```

## Tips

- Use `docker-compose up -d` to run in background
- Use `docker-compose logs -f service_name` to follow logs
- Volume mounts allow live code updates without rebuilding
- Database data persists in Docker volume (survives restarts)
- Use `docker-compose down -v` to completely reset (including DB data)

## Environment Variables

Backend uses `.env` file (copy from `.env.example`):

```bash
cd backend
cp .env.example .env
# Edit .env if needed (defaults work with Docker)
```

For Docker, these are set in `docker-compose.yml`:

- `DB_HOST=db` (Docker service name)
- `DB_PORT=5432`
- `DB_NAME=clubhub`
- `DB_USER=postgres`
- `DB_PASSWORD=postgres`
