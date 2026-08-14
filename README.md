# Admin Dashboard

一个基于 React + Vite 开发的后台管理系统，包含商品管理、用户管理、订单管理、数据统计、操作日志等功能。

## 🌐 在线预览

- 前端：https://admin-dashboard-flame-one-40.vercel.app/
- API：https://admin-dashboard-api-i82z.onrender.com/

> Demo 使用 JSON Server 提供模拟后端 API。

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
  - 正常
  - 库存不足
  - 缺货
- 表单数据校验

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

## 🛠️ 技术栈

### Frontend

- React 19
- React Router
- Vite
- Axios
- Recharts
- dayjs
- CSS

### Backend / API

- JSON Server
- REST API

### Development & Deployment

- Git
- GitHub
- Vercel
- Render

## 📁 项目结构

```text
admin-dashboard/
├── public/
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── Sidebar/
│   │   └── ...
│   │
│   ├── hooks/
│   │   ├── useUsers.js
│   │   ├── useOrders.js
│   │   └── ...
│   │
│   ├── layout/
│   │   ├── Layout.jsx
│   │   └── Layout.css
│   │
│   ├── pages/
│   │   ├── Products/
│   │   ├── Users/
│   │   ├── Orders/
│   │   ├── Data/
│   │   └── ...
│   │
│   ├── utils/
│   │   ├── api.js
│   │   ├── statistics.js
│   │   ├── money.js
│   │   └── ...
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── db.json
├── vercel.json
├── package.json
└── README.md