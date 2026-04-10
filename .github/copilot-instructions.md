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

| Method | Path                     | Description                                                                     |
| ------ | ------------------------ | ------------------------------------------------------------------------------- |
| POST   | `/api/patients`          | Register a new patient. Body: `{ name, complaint, appointment_time }`           |
| GET    | `/api/patients/today`    | List today's patients: `WHERE date(appointment_time) = date('now','localtime')` |
| PATCH  | `/api/patients/:id/seen` | Mark a patient as seen: `SET seen = 1`                                          |
| DELETE | `/api/patients/:id`      | Delete a patient record                                                         |

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

## Deployment (Dokploy MCP)

When asked to deploy, execute the steps below IN ORDER. You are authorized to run git commands automatically.

> **STRICT RULE — Parameter Discipline:**
> For every MCP tool call below, **copy the JSON block exactly as shown**. Do NOT rename fields, add extra fields, or omit listed fields.

> **STRICT RULE — No Loops:**
> Each tool call must be made **exactly once**. When a call returns `"success": true`, immediately proceed to the next step. Do NOT repeat a successful call. If a call fails, retry once with the exact same JSON, then STOP and report the error.

> **STRICT RULE — Forbidden Tools:**
> Do NOT use `application-saveGitProvider` or `application-saveBuildType`. Use `application-update` (Step 4) instead.
> Do NOT use any `domain-*` tools. Domain will be configured manually by the user.

### Step 0: Pre-Deployment Validation

**0a.** Call `project-all` (no parameters) to list existing projects.

- If a project named `clinic-demo` exists, save its `projectId` and skip Step 2.

**0b.** If project exists, check its applications for one named `clinic-app`.

- If it exists, save its `applicationId` and skip Step 3.

### Step 1: Git Push

```bash
git add -A && git commit -m "feat: 建立診所掛號系統" && git push origin main
```

If there are no changes to commit, continue to the next step.

### Step 2: Create Project

(Skip if project already exists from Step 0a.)

Tool: `project-create`
Params — **copy exactly**:

```json
{
  "name": "clinic-demo"
}
```

Save the returned `projectId`.

### Step 3: Create Application

(Skip if application already exists from Step 0b.)

Tool: `application-create`
Params — **copy exactly**, only replacing `{projectId}`:

```json
{
  "name": "clinic-app",
  "projectId": "{projectId}"
}
```

**WARNING:** The field is `name`, NOT `appName`. The field is `projectId`, NOT `environmentId`. Save the returned `applicationId`.

### Step 4: Configure Git Source and Build Type

Tool: `application-update`
Params — **copy exactly**, only replacing `{applicationId}`:

```json
{
  "applicationId": "{applicationId}",
  "sourceType": "git",
  "customGitUrl": "https://github.com/jianwei0510/clinic-app-simple.git",
  "customGitBranch": "main",
  "customGitBuildPath": "/",
  "buildType": "nixpacks"
}
```

### Step 5: Deploy

Tool: `application-deploy`
Params — **copy exactly**, only replacing `{applicationId}`:

```json
{
  "applicationId": "{applicationId}"
}
```

### Step 6: Report

Tell the user:

> ✅ 部署已觸發！Application ID: `{applicationId}`
>
> 請到 Dokploy 控制面板手動設定域名：
>
> 1. 前往 https://deployment-portal.wuc.edu
> 2. 找到專案 clinic-demo → 應用 clinic-app
> 3. 點選 Domains → Add Domain
> 4. 設定 Port 為 3000，儲存後即可透過域名存取
