# XR Project

本仓库已按以下结构重建，包含 WebXR 前端与 Node.js 后端的最小可运行模板。

## 目录结构

```text
.
├── client/
│   ├── public/
│   ├── src/
│   │   ├── core/
│   │   ├── systems/
│   │   ├── objects/
│   │   ├── api/
│   │   ├── network/
│   │   └── main.js
│   ├── index.html
│   └── package.json
├── server/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── websocket/
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
├── shared/
│   └── types.js
├── .env
├── package.json
└── README.md
```

## 快速开始

1. 安装依赖

```bash
npm install
npm --workspace client install
npm --workspace server install
```

1. 启动后端

```bash
npm run dev:server
```

1. 启动前端

```bash
npm run dev:client
```

默认地址：

- 前端: <http://localhost:5173>
- 后端: <http://localhost:3000>

## 说明

- 前端基于 Three.js + WebXR（已包含 XRButton 入口）。
- 后端基于 Express，预置 scene/user/interaction API。
- `shared/types.js` 用于前后端共享类型与常量。
