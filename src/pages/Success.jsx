import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeAllCart } from '../redux/cartRedux'

const wrapper = {
  display:"flex",
  justifyContent:"center",
  alignItems:"center"
}

const container = {
  display:"flex",
  flexDirection:"column",
  justifyContent:"center",
  alignItems:"center",
  width:"300px",
  height:"300px",
  marginTop:"15px",
  border:"0.5px solid lightgrey",
  backgroundColor:"#bbefc4",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
}

const go = {
  padding:"5px",
  backgroundColor:"#ff95b4",
  borderRadius:"4px",
  cursor:"pointer",
  color:"black"
}


const Success = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      removeAllCart()
    )
  },[dispatch])
  return (
    <>
    <Navbar/>
      <div style={wrapper}>
        <div style={container}>
          <p style={{color:"blue",fontSize:"24px"}}>Successfull Transaction!</p>
          <span style={{color:"blue",fontSize:"20px"}}>Thank you for buying!</span>
          <Link to={'/userProfile'} style={{textDecoration:"none",marginTop:"10px"}}><span style={go}>Go to User Profile</span></Link>
        </div>
      </div>
    </>
  )
}

export default Success