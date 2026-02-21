# ClubHub Database Setup

## Prerequisites

- PostgreSQL 14+ installed
- Command line access (Terminal/PowerShell)

## Quick Setup

### 1. Create Database

```bash
psql -U postgres
CREATE DATABASE clubhub;
\q
```

### 2. Copy Environment File

```bash
cd backend
cp .env.example .env
```

### 3. Update `.env`

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=clubhub
DB_USER=postgres
DB_PASSWORD=your_password_here
```

### 4. Run Schema

```bash
psql -U postgres -d clubhub -f database/schema.sql
```

### 5. (Optional) Add Test Data

```bash
psql -U postgres -d clubhub -f database/seeds/sample_data.sql
```

## Verify Setup

```bash
psql -U postgres -d clubhub
\dt  -- List all tables
```

You should see:

- users
- clubs
- memberships
- join_requests

## Tables Overview

### users

- Stores student and admin accounts
- Password must be bcrypt hashed

### clubs

- Club information and details
- Linked to admin user

### memberships

- Many-to-many relationship between users and clubs
- Tracks when user joined

### join_requests

- Pending requests to join clubs
- Status: pending, approved, rejected

## Common Queries

### Get all clubs for a user

```sql
SELECT clubs.*
FROM clubs
JOIN memberships ON clubs.id = memberships.club_id
WHERE memberships.user_id = $1;
```

### Get all members of a club

```sql
SELECT users.id, users.name, users.email, memberships.joined_at
FROM users
JOIN memberships ON users.id = memberships.user_id
WHERE memberships.club_id = $1
ORDER BY memberships.joined_at DESC;
```

### Get pending join requests for a club

```sql
SELECT jr.*, u.name, u.email
FROM join_requests jr
JOIN users u ON jr.user_id = u.id
WHERE jr.club_id = $1 AND jr.status = 'pending'
ORDER BY jr.created_at DESC;
```
