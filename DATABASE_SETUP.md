# ClubHub Database Setup (Docker + pgAdmin)

This guide shows how to run PostgreSQL for ClubHub, initialize schema automatically, and manage data with pgAdmin.

## Prerequisites

- Docker Desktop running
- From project root: `C:/Projects/ClubHub`

## 1) Start the database stack

Run:

```bash
docker compose up -d db pgadmin
```

This starts:

- Postgres container: `clubhub-db` on `localhost:5432`
- pgAdmin container: `pgadmin4_container` on `http://localhost:5050`

## 2) How schema initialization works

In `docker-compose.yml`, this mount is configured:

- `./backend/src/database:/docker-entrypoint-initdb.d:ro`

On first startup of an empty Postgres volume, files in that folder are executed automatically.

### Important

- Initialization runs only when DB data is empty.
- If you already have data, schema files will **not** rerun.
- Current schema file: `backend/src/database/schema.sql`

To force a fresh database container:

```bash
docker compose down -v
docker compose up -d db pgadmin
```

## 3) Backend DB connection values (Docker)

Use these values in `backend/.env` for Docker runs:

```env
DB_HOST=db
DB_PORT=5432
DB_NAME=clubhub
DB_USER=postgres
DB_PASSWORD=postgres
```

## 4) Log into pgAdmin and connect to Postgres

Open: `http://localhost:5050`

pgAdmin login (container admin):

- Email: `admin@admin.com`
- Password: `postgres`

Create a server connection in pgAdmin:

- Name: `ClubHub Local` (any name)
- Host: `db`
- Port: `5432`
- Username: `postgres`
- Password: `postgres`
- Database: `clubhub` (optional in pgAdmin connection form)

After connecting, you can browse tables under:

- `Servers -> ClubHub Local -> Databases -> clubhub -> Schemas -> public -> Tables`

## 5) Useful commands

- Start all app services:
  ```bash
  docker compose up -d
  ```
- Stop services (keep data):
  ```bash
  docker compose down
  ```
- Stop and delete DB data:
  ```bash
  docker compose down -v
  ```
- View DB logs:
  ```bash
  docker compose logs -f db
  ```

## Notes

- Credentials in this file are for local development.
- If you change Postgres credentials in `docker-compose.yml`, update both `backend/.env` and pgAdmin server settings.
