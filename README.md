# Admin Dashboard

一个基于 React + Vite 开发的后台管理系统，包含商品管理、用户管理、订单管理、数据统计、操作日志等功能。

## 🌐 在线预览

- **在线 Demo：** https://admin-dashboard-flame-one-40.vercel.app/
- **API：** https://admin-dashboard-api-i82z.onrender.com/

> Demo 使用 JSON Server 提供模拟 REST API。

---

## ✨ 项目功能

### 🔐 登录与权限

- 用户登录
- Token 模拟认证
- 路由守卫
- 基于角色的权限控制
- 管理员 / 超级管理员权限区分
- Axios 请求拦截器自动携带 Token
- 统一错误处理

### 📦 商品管理

- 商品列表展示
- 商品搜索
- 新增商品
- 删除商品
- 修改商品库存
- 修改商品价格
- 商品库存状态提示
- 商品表单验证

### 👤 用户管理

- 用户列表
- 用户搜索
- 新增用户
- 修改用户信息
- 用户角色管理
- 用户状态管理

### 🛒 订单管理

- 订单列表
- 订单详情
- 商品信息关联
- 修改订单状态
- 处理商品删除后的异常情况

### 📊 数据统计

- 销售额统计
- 商品销量统计
- 销售趋势展示
- 数据汇总
- 使用 Recharts 实现数据可视化

### 📝 操作日志

- 记录管理员操作
- 动态获取当前操作用户
- 操作时间记录
- 操作类型记录

### ⚙️ 其他

- Loading 加载状态
- Error 错误处理
- Toast 操作提示
- Axios 请求封装
- 环境变量配置
- React Router SPA 路由
- Vercel + Render 云端部署

---

## 🛠️ 技术栈

### Frontend

- React 19
- React Router
- Vite
- Axios
- Recharts
- dayjs
- CSS

### Backend

- JSON Server
- REST API

### Development & Deployment

- Git
- GitHub
- Vercel
- Render

---

## 📁 项目结构

```text
admin-dashboard/
├── public/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── layout/
│   ├── pages/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│
├── db.json
├── vercel.json
├── package.json
└── README.md
````

---

## 🚀 本地运行

### 1. 克隆项目

```bash
git clone https://github.com/R1Kka1/admin-dashboard.git
cd admin-dashboard
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动 JSON Server

```bash
npm run server
```

默认 API 地址：

```text
http://localhost:3001
```

### 4. 启动前端

新开一个终端：

```bash
npm run dev
```

访问：

```text
http://localhost:5173
```

---

## 🔧 环境变量

项目使用 Vite 环境变量区分本地开发环境和生产环境。

本地创建 `.env`：

```env
VITE_API_BASE_URL=http://localhost:3001
```

线上环境在 Vercel 中配置：

```env
VITE_API_BASE_URL=https://admin-dashboard-api-i82z.onrender.com
```

`.env` 已加入 `.gitignore`，不会提交到 GitHub。

---

## 🌐 项目部署

### Frontend

使用 Vercel 部署 React + Vite。

GitHub `main` 分支更新后，Vercel 会自动重新构建并部署。

### Backend

使用 Render 部署 JSON Server。

Render 使用以下命令启动：

```bash
npm start
```

线上 API：

```text
https://admin-dashboard-api-i82z.onrender.com
```

---

## 🔄 部署流程

```text
                 GitHub
                /      \
               ↓        ↓
           Vercel      Render
              ↓          ↓
         React 前端   JSON Server
              │          │
              └─ Axios ──┘
                    ↓
                 REST API
```

修改项目后：

```bash
git add .
git commit -m "your commit message"
git push
```

Vercel 和 Render 会自动触发新的部署。

---

## 📌 项目亮点

* 使用 React Router 构建后台管理系统 SPA
* 使用 Axios 封装统一 API 请求
* 使用 Axios 请求拦截器自动携带 Token
* 使用自定义 Hooks 抽离数据请求逻辑
* 使用 Recharts 实现数据可视化
* 使用角色权限控制不同后台功能访问
* 使用环境变量区分开发环境和生产环境 API
* 实现商品、用户、订单等模块 CRUD
* 使用 JSON Server 模拟 REST API
* 完成 Vercel + Render 云端部署
* 解决 React Router 部署后的 SPA 路由刷新 404 问题

---

## 📚 项目实践

通过本项目实践了：

* React Hooks
* React Router
* Axios
* REST API
* CRUD
* 权限控制
* 表单验证
* 异步请求
* Loading / Error 状态处理
* 数据可视化
* Git / GitHub
* 前后端分离
* Vercel / Render 部署

