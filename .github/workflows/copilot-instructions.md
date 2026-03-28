# Project Instructions

- This is a Node.js + Express project
- Use sql.js (NOT better-sqlite3) for SQLite database
- Database file path: ./data/clinic.db
- Server port: 3000
- Backend code goes in app.js
- Frontend code goes in public/index.html (single HTML file with inline CSS and JavaScript)
- All UI text must be in Traditional Chinese
- Use large fonts and modern, clean design
- Include proper error handling
- Save database to disk after every write operation
- Database table must use exactly this schema:
  CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    complaint TEXT NOT NULL,
    appointment_time TEXT NOT NULL,
    seen INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now','localtime'))
  )
- Always use CREATE TABLE IF NOT EXISTS (never DROP TABLE)

## After completing code changes
- Run `npm install` to install any new dependencies
- Run `node app.js` to start the server
- Verify the app is running at http://localhost:3000