import { Route,Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import { Layout } from './layout/layout'
import { Products } from './pages/Products'
import { Orders } from './pages/Orders'
import { Users } from './pages/Users'
import { Data } from './pages/Data'
import { PrivateRoute } from './components/PrivateRoute'

function App() {


  return (
    <Routes>
      <Route index element={<Login />}/>
      <Route path='/admin' element={
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      }>
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="data" element={<Data />} />
      </Route>
      <Route />
    </Routes>
  )
}

export default App
