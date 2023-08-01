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
import Userprofile from './components/Userprofile'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import ScrolltoTop from './components/ScrolltoTop'
import UpdateProf from './components/UpdateProf'


const App = () => {
  const user = useSelector(state => state.user.currentUser)
  // console.log(user)
  return (
    <Routes>
      <Route element={<ScrolltoTop />} />
      <Route path='/' element={<Home />}></Route>
      <Route path='/products/:category' element={<ProductList />}></Route>
      <Route path='/product' element={<SingleProduct />}></Route>
      <Route path='/product/:id' element={<SingleProduct />}></Route>
      <Route path='/cart' element={<Cart />}></Route>

      <Route path='/userProfile' element={user ? <Userprofile /> : <Login />}></Route>
      <Route path='/update/:id' element={user ? <UpdateProf /> : <Login />}></Route>
      <Route path='/login' element={user ? <Home /> : <Login />}></Route>
      <Route path='/register' element={user ? <Home /> : <Register />}></Route>

      <Route path='/pay' element={<Pay />}></Route>
      <Route path='/success' element={<Success />}></Route>
    </Routes>
  )
}

export default App