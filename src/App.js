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
import ReviewForm from './components/ReviewForm'
import AdminLogin from './admin/AdminLogin'
import AdminStore from './admin/AdminStore'
import AdminUser from './admin/AdminUser'
import AdminHome from './admin/AdminHome'
import ViewProduct from './admin/ViewProduct'
import EditProduct from './admin/EditProduct'
import CreateProduct from './admin/CreateProduct'
import OrderList from './admin/OrderList'
import ViewOrder from './admin/ViewOrder'
import AdminUsers from './admin/AdminUser'


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

      <Route path='/review/:id' element={<ReviewForm />}></Route>

      {
        user && user.isAdmin == false ?
          <>
            <Route path='/admin/login' element={<Home />}></Route>
          </>
          : ""
      }

      {
        !user ?
          <>
            <Route path='/admin/login' element={<AdminLogin />}></Route>
          </>
          : ""
      }

      {
        user ?
          <>
            <Route path='/admin/login' element={user.isAdmin ? <AdminHome /> : <AdminLogin />}></Route>
            <Route path='/admin/home' element={user.isAdmin ? <AdminHome /> : <Home />}></Route>
            <Route path='/admin/products' element={user.isAdmin ? <AdminStore /> : <Home />}></Route>
            <Route path='/admin/user' element={user.isAdmin ? <AdminUsers /> : <Home />}></Route>
            <Route path='/admin/product/:id' element={user.isAdmin ? <ViewProduct /> : <Home />}></Route>
            <Route path='/admin/product/edit/:id' element={user.isAdmin ? <EditProduct /> : <Home />}></Route>
            <Route path='/admin/product/create' element={user.isAdmin ? <CreateProduct /> : <Home />}></Route>
            <Route path='/admin/orders' element={user.isAdmin ? <OrderList /> : <Home />}></Route>
            <Route path='/admin/orders/:id' element={user.isAdmin ? <ViewOrder /> : <Home />}></Route>
          </> : ""
      }


      <Route path='/pay' element={<Pay />}></Route>
      <Route path='/checkout_success' element={<Success />}></Route>
    </Routes>
  )
}

export default App