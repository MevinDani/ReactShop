import React, { useEffect, useState } from 'react'
import { publicRequest } from '../base_url/urls'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'


const Order = () => {

  const user = useSelector(state => state.user.currentUser)
  const orders = useSelector(state => state.orders)

  // console.log(orders)

  const token = JSON.parse(localStorage.getItem('token'))
  const [strData, setStrData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [fullOrder, setFullOrder] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const strImg = {}
  const strDstat = {}
  const strId = {}
  const ordProd = {}

  const getOrders = async() => {
    try {
      const orders = await publicRequest.get(`/users/orders/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (orders.data && orders.data.stripeData) {
        // Update the state with the fetched data
        setStrData(orders.data.stripeData);
        setFullData(orders.data.fullData)
        setFullOrder(orders.data.fullOrder)
        setIsFetching(false);
        // console.log("orders",orders.data)
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }
  useEffect(() => {
    getOrders()
  },[])


 if(strData) {
  strData.map((i) => {
    strImg[i.id] = i.images[0]
    strId[i.id] = i.metadata.id
  })
 }

 if(fullOrder) {
  fullOrder.map((i) => {
    i.products.map((p) => {
      strDstat[p.price.product] = i.delivery_status
      // ordProd[i._id] = p.price.product
    })
  })
 }

 if(fullOrder) {
  fullOrder.map((i) => {
    ordProd[i._id] = i.products
  })
 }

 console.log("ordProd",ordProd)

 const handleRecive = async(id,fd) => {
  console.log(id,fd.id)
  const data = {
    delivery_status:"delivered"
  }
  const res = await publicRequest.put(`/users/order/${id}/recieved/${fd.id}`,data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  getOrders()
  // console.log(res.data)
 }

//  console.log("strObj",strImg)
//  console.log("strSt",strDstat)
//  console.log("strID",strId)
  
// console.log("strData",strData)
// console.log("fullD",fullData)
// console.log("fullO",fullOrder)
  
  return (
   <>
   {
      isFetching?<div style={spinner}><div class="spinner-border text-info" role="status"></div></div>: (

        fullData ? fullData.map((fd) => (
          <>
            <div style={Container}>
                <div style={Wrapper}>
                    <div style={imgC}>
                      <img style={img} src={strImg[fd.price.product]} alt="" />
                    </div>
                    <div style={infoC}>
                      <div style={prodName}>
                        <h3>{fd.description}</h3>
                      </div>
                      <div style={price}>
                        <p>$ {fd.amount_total / 100}</p>
                      </div>
                      <div style={quantity}>
                        <p>Quantity: {fd.quantity}</p>
                      </div>
                    </div>
                    <div style={statusC}>
                        {  
                            strDstat[fd.price.product] === 'pending' ? <Pending>Pending</Pending> :
                            strDstat[fd.price.product] === 'dispatched' ? <Dispatched>Dispatched</Dispatched> :
                            strDstat[fd.price.product] === 'delivered' ? <Delivered>Delivered</Delivered> : "error"
                        }
                        {
                           strDstat[fd.price.product] === 'dispatched' ? <DeliveryBtn onClick={()=>handleRecive(user._id,fd)}>Recieve Item</DeliveryBtn> : ""
                        }
                      <Link to={`/review/${strId[fd.price.product]}`}>
                        <button style={rateBtn}>Rate this Product</button>
                      </Link>
                    </div>
                </div>
              </div>
          </>
        )) : ""
      )
   }
   </>
  )
}

// onClick={addRev(strId[fd.price.product])}

export default Order

const Pending = styled.div`
    color: rgb(253, 181, 40);
    background: rgb(253, 181, 40, 0.12);
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 14px;
`
const Dispatched = styled.div`
    color: rgb(38, 198, 249);
    background-color: rgb(38, 198, 249, 0.12);
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 14px;
`
const Delivered = styled.div`
    color: rgb(102, 108, 255);
    background-color: rgba(102, 108, 255, 0.12);
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 14px;
    
`
const DeliveryBtn = styled.button`
    background-color: rgb(102, 108, 255);
    border:none;
    color:white;
    margin-top:8px;
    &:hover {
      background-color: rgb(161, 164, 255);
      color:black
    }
`
const Container = {
  margin:"10px"
}

const Wrapper = {
  border:"0.5px solid lightgray",
  padding:"10px",
  display:"flex",
  position:"relative",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
}

const imgC = {
  
}

const img = {
  width:"100px",
  height:"100px"
}

const infoC = {
  display:"flex",
  flexDirection:"column",
  marginLeft:"5px"
  // justifyContent:"space-evenly"
}

const prodName = {
  marginBottom:"5px"
}

const price = {
  marginBottom:"5px"
}

const quantity = {
}

const statusC = {
  position:"absolute",
  right:"0",
  marginRight:"10px",
  display:"flex",
  flexDirection:"column",
  alignItems:"center"
}

const rateBtn = {
  marginTop:"20%",
  backgroundColor:"teal",
  color:"white",
  border:"none",
  padding:"8px",
  cursor:"pointer"
}

const spinner = {
  width:"100%",
  textAlign:"center"
}