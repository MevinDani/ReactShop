import React, { useEffect, useState } from 'react'
import { publicRequest } from '../base_url/urls'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

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
  marginRight:"10px"
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


const Order = () => {

  const user = useSelector(state => state.user.currentUser)


  const token = JSON.parse(localStorage.getItem('token'))
  const [strData, setStrData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [fullOrder, setFullOrder] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const strImg = {}
  const strDstat = {}
  const strId = {}


  useEffect(() => {
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
    })
  })
 }

//  console.log("strObj",strImg)
//  console.log("strStObj",strDstat)
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
                      <p>Status: {strDstat[fd.price.product]}</p>
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