# Project Instructions

## Tech Stack (LOCKED — do not change)

- Runtime: Node.js
- Framework: Express
- Database: sql.js (NOT better-sqlite3, NOT sqlite3)
- Database file: ./data/clinic.db
- Server port: 3000

## File Structure

- Backend: `app.js` (single file, all routes here — extend the existing skeleton)
- Frontend: `public/index.html` (single HTML file with ALL CSS and JS inline)
- No additional files. No React, no TypeScript, no build tools.

## Database Schema (use these column names EXACTLY)

```sql
CREATE TABLE IF NOT EXISTS patients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  complaint TEXT NOT NULL,
  appointment_time TEXT NOT NULL,
  seen INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now','localtime'))
)
```

- Always use `CREATE TABLE IF NOT EXISTS` (never DROP TABLE)
- Call `saveDB()` after every write operation

## API Endpoints (use these paths EXACTLY)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/patients` | Register a new patient. Body: `{ name, complaint, appointment_time }` |
| GET | `/api/patients/today` | List today's patients: `WHERE date(appointment_time) = date('now','localtime')` |
| PATCH | `/api/patients/:id/seen` | Mark a patient as seen: `SET seen = 1` |
| DELETE | `/api/patients/:id` | Delete a patient record |

## Frontend Requirements

- **Language**: Traditional Chinese (繁體中文) for ALL user-visible text
- **Font size**: minimum 18px base, headings 28px+
- **Design**: modern, clean, card-based layout with soft shadows and rounded corners
- **Color**: medical blue (#2563eb primary, #f0f9ff background, #1e40af hover)
- **Layout**:
  1. Header: "診所掛號系統" with a subtle medical icon or emoji
  2. Registration form: 姓名、症狀、預約時間 (use `type="datetime-local"`)，送出按鈕
  3. Today's patient list: card layout, showing name/complaint/time/status
  4. Each card has: "標記已看診" toggle button + "刪除" button
  5. Seen patients should have a distinct visual style (green badge, muted card)
- **Behavior**: auto-refresh list after registration or status change, reset form after submit
- **API calls**: use `fetch()`, no external libraries
- **Responsive**: works on both desktop and mobile

## Code Quality

- Generate COMPLETE, WORKING files — no TODO comments, no placeholder code, no "..."
- Include try/catch error handling on all API calls
- Show user-friendly error/success messages in Traditional Chinese
- The app.js skeleton already has Express setup, sql.js init, and saveDB() — add your code to it

## After completing code changes

1. Run `npm install` to ensure dependencies are installed
2. Run `node app.js` to start the server
3. Verify the app is running at http://localhost:3000

---

## Deployment Instructions (Dokploy MCP)

When asked to deploy this application, follow these steps IN THIS EXACT ORDER.
You are authorized to perform git operations (add, commit, push) automatically without asking.

⚠️ CRITICAL RULES:
- For the repository URL, run `git remote get-url origin` to get the CURRENT repo URL — do NOT hardcode or guess
- NEVER use saveGithubProvider — ALWAYS use saveGitProvider
- NEVER use HTTPS or Let's Encrypt for the domain — use HTTP only
- MUST create domain BEFORE deploying

### Step 1: Git — Commit and Push

```bash
git add -A
git commit -m "feat: 建立診所掛號系統"
git push origin main
```

### Step 2: Create Project

- Use the `project-create` tool with name: `clinic-demo`
- If it already exists (check with `project-all`), reuse it — do NOT create a duplicate

### Step 3: Create Application

- Use the `application-create` tool
- name: `clinic-app`
- Use the projectId from Step 2

### Step 4: Connect Git Repository

- Use the `application-saveGitProvider` tool (NOT saveGithubProvider)
- applicationId: from Step 3
- customGitUrl: get from `git remote get-url origin` (append `.git` if not present)
- customGitBranch: `main`
- customGitBuildPath: `/`

### Step 5: Set Build Type

- Use the `application-saveBuildType` tool
- applicationId: from Step 3
- buildType: `nixpacks`

### Step 6: Set Domain (BEFORE deploying)

- Use the `domain-create` tool
- applicationId: from Step 3
- host: `clinic-demo.3-137-141-132.traefik.me`
- port: `3000`
- https: `false`
- certificateType: `none`

### Step 7: Deploy (AFTER domain is set)

- Use the `application-deploy` tool
- applicationId: from Step 3

### Step 8: Report URL

Tell the user:

> 部署完成！應用程式網址：http://clinic-demo.3-137-141-132.traefik.me
> （部署需要約 1-2 分鐘生效）

### Troubleshooting

- If `application-deploy` fails, try `application-redeploy`
- If domain already exists, skip Step 6
- If project already exists, skip Step 2 and use the existing projectId
