# 📁 ClubHub - Project Structure

*Generated on: 3/21/2026, 12:54:08 PM*

## 📋 Quick Overview

| Metric | Value |
|--------|-------|
| 📄 Total Files | 70 |
| 📁 Total Folders | 21 |
| 🌳 Max Depth | 4 levels |
| 🛠️ Tech Stack | React, CSS, Tailwind CSS, Node.js, Docker |

## ⭐ Important Files

- 🟡 🚫 **.gitignore** - Git ignore rules
- 🟡 🚫 **.gitignore** - Git ignore rules
- 🟡 🐳 **Dockerfile** - Docker container
- 🟡 🔒 **package-lock.json** - Dependency lock
- 🔴 📦 **package.json** - Package configuration
- 🟡 🐳 **docker-compose.yml** - Docker compose
- 🟡 🚫 **.gitignore** - Git ignore rules
- 🟡 🐳 **Dockerfile** - Docker container
- 🟡 🔒 **package-lock.json** - Dependency lock
- 🔴 📦 **package.json** - Package configuration
- 🔴 📖 **README.md** - Project documentation
- 🟡 🎨 **tailwind.config.js** - Tailwind config

## 📊 File Statistics

### By File Type

- 📜 **.js** (JavaScript files): 29 files (41.4%)
- ⚛️ **.jsx** (React JSX files): 12 files (17.1%)
- ⚙️ **.json** (JSON files): 5 files (7.1%)
- 📖 **.md** (Markdown files): 4 files (5.7%)
- 📄 **.cjs** (Other files): 4 files (5.7%)
- 🐳 **.dockerignore** (Docker ignore): 3 files (4.3%)
- 🚫 **.gitignore** (Git ignore): 3 files (4.3%)
- 📄 **.example** (Other files): 2 files (2.9%)
- 🐳 **.dockerfile** (Docker files): 2 files (2.9%)
- 📄 **.sql** (Other files): 2 files (2.9%)
- 🎨 **.css** (Stylesheets): 2 files (2.9%)
- ⚙️ **.yml** (YAML files): 1 files (1.4%)
- 🌐 **.html** (HTML files): 1 files (1.4%)

### By Category

- **JavaScript**: 29 files (41.4%)
- **React**: 12 files (17.1%)
- **DevOps**: 8 files (11.4%)
- **Other**: 8 files (11.4%)
- **Config**: 6 files (8.6%)
- **Docs**: 4 files (5.7%)
- **Styles**: 2 files (2.9%)
- **Web**: 1 files (1.4%)

### 📁 Largest Directories

- **root**: 70 files
- **frontend**: 35 files
- **backend**: 29 files
- **frontend\src**: 15 files
- **backend\src**: 14 files

## 🌳 Directory Structure

```
ClubHub/
├── 🐳 .dockerignore
├── 🟡 🚫 **.gitignore**
├── 📂 backend/
│   ├── 🐳 .dockerignore
│   ├── 📄 .env.example
│   ├── 🟡 🚫 **.gitignore**
│   ├── 🟡 🐳 **Dockerfile**
│   ├── 📜 jest.config.js
│   ├── 📜 jest.integration.config.js
│   ├── 📜 jest.unit.config.js
│   ├── ⚙️ nodemon.json
│   ├── 🟡 🔒 **package-lock.json**
│   ├── 🔴 📦 **package.json**
│   ├── 📁 src/
│   │   ├── 📂 controllers/
│   │   │   ├── 📜 authController.js
│   │   │   ├── 📜 clubController.js
│   │   │   ├── 📜 joinRequestController.js
│   │   │   └── 📜 membershipController.js
│   │   ├── 📂 database/
│   │   │   ├── 📄 schema.sql
│   │   │   └── 📂 seeds/
│   │   │   │   └── 📄 sample_data.sql
│   │   ├── 📜 db.js
│   │   ├── 📂 middleware/
│   │   │   └── 📜 authMiddleware.js
│   │   ├── 📂 routes/
│   │   │   ├── 📜 auth.js
│   │   │   ├── 📜 clubs.js
│   │   │   ├── 📜 joinRequests.js
│   │   │   └── 📜 memberships.js
│   │   ├── 📜 server.js
│   │   └── 📂 services/
│   │   │   └── 📜 api.js
│   └── 🧪 tests/
│   │   ├── 📂 integration/
│   │   │   └── 📜 auth.integration.test.js
│   │   ├── 📜 jest.env.js
│   │   ├── 📜 jest.setup-db.js
│   │   ├── 📜 jest.teardown-db.js
│   │   └── 📂 unit/
│   │   │   └── 📜 auth.unit.test.js
├── 📖 DATABASE_SETUP.md
├── 📖 DOCKER_SETUP.md
├── 🟡 🐳 **docker-compose.yml**
├── 📂 frontend/
│   ├── 🐳 .dockerignore
│   ├── 📄 .env.example
│   ├── 🟡 🚫 **.gitignore**
│   ├── 📄 babel.config.cjs
│   ├── 🟡 🐳 **Dockerfile**
│   ├── 📜 eslint.config.js
│   ├── 🌐 index.html
│   ├── 📄 jest.config.cjs
│   ├── 📄 jest.integration.config.cjs
│   ├── 📄 jest.unit.config.cjs
│   ├── 🟡 🔒 **package-lock.json**
│   ├── 🔴 📦 **package.json**
│   ├── 📜 postcss.config.js
│   ├── 🔴 📖 **README.md**
│   ├── 📁 src/
│   │   ├── 🎨 App.css
│   │   ├── ⚛️ App.jsx
│   │   ├── 🧩 components/
│   │   │   └── ⚛️ ProtectedRoute.jsx
│   │   ├── 📂 context/
│   │   │   ├── 📜 auth-context.js
│   │   │   └── ⚛️ AuthContext.jsx
│   │   ├── 🎣 hooks/
│   │   │   └── 📜 useAuth.js
│   │   ├── 🎨 index.css
│   │   ├── ⚛️ main.jsx
│   │   ├── 📄 pages/
│   │   │   ├── ⚛️ BrowseClubsPage.jsx
│   │   │   ├── ⚛️ ClubDetailPage.jsx
│   │   │   ├── ⚛️ DashboardPage.jsx
│   │   │   ├── ⚛️ HomePage.jsx
│   │   │   ├── ⚛️ LoginPage.jsx
│   │   │   └── ⚛️ RegisterPage.jsx
│   │   └── 📂 services/
│   │   │   └── 📜 api.js
│   ├── 🟡 🎨 **tailwind.config.js**
│   ├── 🧪 tests/
│   │   ├── 📜 fileMock.js
│   │   ├── 📂 integration/
│   │   │   └── ⚛️ auth.integration.test.jsx
│   │   ├── 📜 jest.setup.js
│   │   └── 📂 unit/
│   │   │   └── ⚛️ auth.unit.test.jsx
│   └── 📜 vite.config.js
└── 📖 README.MD
```

## 📖 Legend

### File Types
- 🐳 DevOps: Docker ignore
- 🚫 DevOps: Git ignore
- 📄 Other: Other files
- 🐳 DevOps: Docker files
- 📜 JavaScript: JavaScript files
- ⚙️ Config: JSON files
- 📖 Docs: Markdown files
- ⚙️ Config: YAML files
- 🌐 Web: HTML files
- 🎨 Styles: Stylesheets
- ⚛️ React: React JSX files

### Importance Levels
- 🔴 Critical: Essential project files
- 🟡 High: Important configuration files
- 🔵 Medium: Helpful but not essential files
