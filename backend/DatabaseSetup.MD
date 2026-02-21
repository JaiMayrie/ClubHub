# Database Setup Instructions

## Prerequisites

1. Install PostgreSQL from https://www.postgresql.org/download/
2. Note your postgres user password during installation

## Setup Steps

1. **Create the database:**

   ```bash
   psql -U postgres
   CREATE DATABASE clubhub;
   \q
   ```

2. **Copy environment file:**

   ```bash
   cp .env.example .env
   ```

3. **Update `.env` with your credentials:**
   - Set `DB_PASSWORD` to your postgres password
   - Adjust other settings if needed

4. **Run the schema:**
   ```bash
   psql -U postgres -d clubhub -f schema.sql
   ```

## Verify Setup

```bash
psql -U postgres -d clubhub
\dt  -- List all tables
```

You should see: users, clubs, club_members, events, event_attendance
