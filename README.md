# AI Vibe Coding + Auto Deployment Demo

WUC Open House demo: use one prompt to build a clinic app, another prompt to deploy it live.

## Setup

```bash
npm install
```

### Dokploy MCP (for deployment)

1. Go to https://deployment-portal.wuc.edu, click on your Profile
2. Click "API/CLI" → "Generate Token"
3. Open `.vscode/mcp.json` and fill in your API key
4. Open project in VS Code, verify `dokploy-mcp` appears in MCP panel
5. In Copilot Chat, switch to **Agent Mode** and select **Auto-Approve**

```json
{
  "servers": {
    "dokploy-mcp": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@ahdev/dokploy-mcp@latest"],
      "env": {
        "DOKPLOY_URL": "https://deployment-portal.wuc.edu/api",
        "DOKPLOY_API_KEY": "<YOUR_API_KEY>"
      }
    }
  }
}
```

## Demo Flow

**Step 1 — Build (Copilot Prompt):**

> 幫我用這個專案建立一個診所掛號系統，要有病人掛號、今日看診列表、標記已看診功能，請產生完整的程式碼

**Step 2 — Deploy (Copilot Prompt):**

> 請幫我把這個應用程式部署到 Dokploy 上，自動 commit、push，建立專案和應用程式，然後告訴我結果

Copilot will auto commit, push, create project/app in Dokploy, and trigger deployment.

**Step 3 — Domain (Manual):**

After Copilot finishes, go to Dokploy dashboard to add domain:

1. Open https://deployment-portal.wuc.edu
2. Find project `clinic-demo` → app `clinic-app`
3. Click **Domains** → **Add Domain**
4. Set Port to `3000`, save

## Fallback

If Copilot generation fails on stage:

```bash
cp backup/app.js app.js
cp backup/public/index.html public/index.html
node app.js
```

Then deploy manually via Dokploy dashboard.
