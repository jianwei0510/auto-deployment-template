const express = require('express');
const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_PATH = path.join(__dirname, 'data', 'clinic.db');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 確保 data 資料夾存在
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}

let db;

// 初始化資料庫
async function initDB() {
  const SQL = await initSqlJs();

  if (fs.existsSync(DB_PATH)) {
    const buffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  // 在這裡建立資料表
  // TODO: 用 Copilot 生成資料表結構

  saveDB();
  console.log('資料庫已初始化');
}

// 儲存資料庫到檔案
function saveDB() {
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

// 在這裡新增 API 路由
// TODO: 用 Copilot 生成 API

// 啟動伺服器
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`伺服器啟動：http://localhost:${PORT}`);
  });
});
