# AI Vibe Coding + 自動部署展示

WUC Open House 展示：用一個提示詞建立診所應用程式，再用另一個提示詞將它部署上線。

## 環境設定

```bash
npm install
```

### Dokploy MCP（用於部署）

1. 前往 https://deployment-portal.wuc.edu，點擊你的個人檔案
2. 點擊「API/CLI」→「Generate Token」
3. 開啟 `.vscode/mcp.json`，填入你的 API 金鑰
4. 在 VS Code 中開啟專案，確認 MCP 面板中出現 `dokploy-mcp`
5. 在 Copilot Chat 中，切換至 **Agent Mode** 並選擇 **Auto-Approve**

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

## 展示流程

**步驟一 — 建置（Copilot 提示詞）：**

> 幫我用這個專案建立一個診所掛號系統，要有病人掛號、今日看診列表、標記已看診功能，請產生完整的程式碼

**步驟二 — 部署（Copilot 提示詞）：**

> 請幫我把這個應用程式部署到 Dokploy 上，自動 commit、push，建立專案和應用程式，然後告訴我結果

Copilot 會自動 commit、push，在 Dokploy 中建立專案與應用程式，並觸發部署。

**步驟三 — 網域設定（手動）：**

Copilot 完成部署後，前往 Dokploy 控制台新增網域：

1. 開啟 https://deployment-portal.wuc.edu
2. 找到專案 `clinic-demo` → 應用程式 `clinic-app`
3. 點擊 **Domains** → **Add Domain**
4. 將 Port 設定為 `3000`，儲存

## 備援方案

如果 Copilot 在現場展示時產生程式碼失敗：

```bash
cp backup/app.js app.js
cp backup/public/index.html public/index.html
node app.js
```

接著透過 Dokploy 控制台手動部署。
