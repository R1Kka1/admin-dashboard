import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import { Layout } from './layout/Layout'
import { Products } from './pages/Products'
import { Orders } from './pages/Orders'
import { Users } from './pages/Users'
import { Data } from './pages/Data'
import { PrivateRoute } from './components/PrivateRoute'
import { OperationLog } from './pages/OperationLog'
import { RoleRoute } from './components/RoleRoute'
import { HomePage } from './pages/HomePage'

function App() {


  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path='/homepage' element={
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      }>
        <Route index element={<HomePage />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="users" element={
          <RoleRoute roles="超级管理员">
            <Users />
          </RoleRoute>
        }
        />
        <Route path="data" element={
          <RoleRoute roles={["管理员", "超级管理员"]} >
            <Data />
          </RoleRoute>
        }
        />
        <Route path="log" element={
          <RoleRoute roles="超级管理员">
            <OperationLog />
          </RoleRoute>
        }
        />
      </Route>

    </Routes>
  )
}

export default App
