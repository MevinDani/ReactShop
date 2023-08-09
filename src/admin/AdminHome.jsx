import React, { useEffect, useState } from 'react'
import Navbar from './AdminNav'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import GroupIcon from '@mui/icons-material/Group';
import PaidIcon from '@mui/icons-material/Paid';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { publicRequest } from '../base_url/urls';


const wrapper =  {
    width:"100%",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    marginTop:"20px"
}

const userProfile = {
    width:"50%",
    padding:"12px",
    height:"max-content",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    border:"0.5px solid lightgray",
    backgroundColor: "#f5fbfd",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
}

const overProfile = {
    width:"80%",
    padding:"12px",
    height:"max-content",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    border:"0.5px solid lightgray",
    backgroundColor: "#f5fbfd",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    marginBottom:"10px"
}

const profilePictureStyle = {
width: '150px',
height: '150px',
borderRadius: '50%',
objectFit: 'cover',
};

const userDetailsStyle = {
marginLeft: '20px',
};

const updateProfBtn = {
padding:"10px",
fontWeight:"400",
cursor:"pointer",
border:"0.5px solid black",
color: "white",
backgroundColor:"orange",
marginTop:"10px",
margin:"10px 10px"
}

const userBtn = {
    padding:"10px",
    fontWeight:"400",
    cursor:"pointer",
    border:"0.5px solid black",
    backgroundColor:"#FF6A00",
    color: "white",
    marginTop:"10px",
    margin:"10px 10px"
}

const productBtn = {
    padding:"10px",
    fontWeight:"400",
    cursor:"pointer",
    border:"0.5px solid black",
    backgroundColor:"#FF478B",
    color: "white",
    marginTop:"10px",
    margin:"10px 10px"
}

const orderBtn = {
    padding:"10px",
    fontWeight:"400",
    cursor:"pointer",
    border:"0.5px solid black",
    backgroundColor:"#4066FF",
    color: "white",
    marginTop:"10px",
    margin:"10px 10px"
}

const userButtons = {
display:"flex",
justifyContent:"space-evenly",
width:"100%",
padding:"10px",
fontWeight:"400",
cursor:"pointer",
border:"1px solid black",
backgroundColor: "#f5fbfd",
color: "black",
marginTop:"10px",
border:"0.5px solid lightgray",
boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
}

const overCont = {
    display:"flex",
    justifyContent:"space-evenly",
    width:"100%"
}

const overItem = {
    width:"20%",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    border:"0.5px solid lightgray",
    backgroundColor: "#ADFAFF",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
}

const AdminHome = () => {

    const user = useSelector(state => state.user.currentUser)

    const [userNo,setUserNo] = useState(0)
    const [orderNo, setOrderNo] = useState(0)
    const [total,setTotal] = useState(0)

    const navigate = useNavigate()

    const token = JSON.parse(localStorage.getItem('token'))

    useEffect(() => {
        const getUsers = async() => {
            const res = await publicRequest.get('/users/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setUserNo(res.data.length)
        }
        getUsers()
    },[])

    useEffect(() => {
        const getOrders = async() => {
            const res = await publicRequest.get('/orders', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setOrderNo(res.data.length)
        }
        getOrders()
    },[])

    useEffect(() => {
        const getTotalIncome = async() => {
            const res = await publicRequest.get('/orders/totalIncome', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setTotal(res.data.totalIncome/100)
        }
        getTotalIncome()
    },[])

    const handleUserClick = () => {
        navigate('/admin/user')
    }

  return (
    <>
        <Navbar/>
            <div style={wrapper}>
                <div style={userProfile}>
                    <img
                        src={user.profilePic ? user.profilePic : 'https://i.postimg.cc/htWDLS6P/user-avatar.png'}
                        alt={user.username}
                        style={profilePictureStyle}
                    />
                    <div style={userDetailsStyle}>
                        <h2 className="username">{user.username}</h2>
                        <p className="full-name">{user.email}</p>
                        <p className="bio">{user.bio}</p>
                        {/* Add more user details rendering here */}
                    </div>
                </div>
                <Link to={`/update/${user._id}`}><button style={updateProfBtn}>Update Profile</button></Link>
                <div style={overProfile}>
                    <div><h3>Overview</h3></div>
                    <div style={overCont}>
                        <div style={overItem}>
                            <GroupIcon/>Users
                            <div><h5>{userNo}</h5></div>
                        </div>
                        <div style={overItem}>
                            <ListAltIcon/>Orders
                            <div><h5>{orderNo}</h5></div>
                        </div>
                        <div style={overItem}>
                            <PaidIcon/>Earnings
                            <div><h5>$ {total}</h5></div>
                        </div>
                    </div>
                </div>
                <div style={userButtons}>
                    <button style={userBtn} onClick={() => navigate('/admin/user')}>Users</button>
                    <button style={productBtn} onClick={() => navigate('/admin/products')}>Products</button>
                    <button style={orderBtn} onClick={() => navigate('/admin/orders')}>Orders</button>
                </div>
            </div>
    </>
  )
}

export default AdminHome