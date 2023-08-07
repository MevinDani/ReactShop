import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

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
  cursor:"pointer"
}


const Success = () => {
  return (
    <>
    <Navbar/>
      <div style={wrapper}>
        <div style={container}>
          <p style={{color:"blue"}}>Successfull Transaction!</p>
          <span style={{color:"blue"}}>Thank you for buying!</span>
          <Link to={'/userProfile'} style={{textDecoration:"none",marginTop:"10px"}}><span style={go}>Go to User Profile</span></Link>
        </div>
      </div>
    </>
  )
}

export default Success