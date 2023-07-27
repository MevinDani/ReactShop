import React from 'react'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import SingleProduct from './pages/SingleProduct'
import Register from './pages/Register'
import Login from './pages/Login'
import Cart from './pages/Cart'
import { Route, Routes, redirect } from 'react-router-dom';
import Pay from './pages/Pay'
import Success from './pages/Success'
import Product from './components/Product'
import { useSelector } from 'react-redux'




const App = () => {
  const user = useSelector(state => state.user.currentUser)
  console.log(user)
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/products/:category' element={<ProductList />}></Route>
      <Route path='/product' element={<SingleProduct />}></Route>
      <Route path='/product/:id' element={<SingleProduct />}></Route>
      <Route path='/cart' element={<Cart />}></Route>
      <Route path='/login' element={user ? <Home /> : <Login />}></Route>

      {/* <Route path={user ? '/' : '/login'} element={<Login />}></Route> */}
      <Route path='/register' element={<Register />}></Route>

      <Route path='/pay' element={<Pay />}></Route>
      <Route path='/success' element={<Success />}></Route>
    </Routes>
  )
}

export default App