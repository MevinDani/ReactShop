import React from 'react'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import Category from '../components/Category'
import Product from '../components/Product'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <div>
        <Navbar/>
        <Slider/>
        <Category/>
        <Product/>
        <NewsLetter/>
        <Footer/>
    </div>
  )
}

export default Home