import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { publicRequest } from '../base_url/urls'

const container = {
    backgroundColor:"teal",
    height:"100vh",
    display:"flex",
    justifyContent:"center",
}

const wrapper = {
    backgroundColor:"white",
    width:"500px",
    height:"500px",
    marginTop:"30px",
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-evenly",
    padding:"8px"
}

const itemCont = {
    display:"flex",
    justifyContent:"space-evenly",
    padding:"5px",
    backgroundColor:"#fbeadd"
}

const addPhotoCont = {
    marginBottom:"10px"
}

const reviewCont = {
    
}

const img = {
    width:"100px",
    height:"100px",
    flex:"1"
}

const ReviewForm = () => {

    const params = useParams()
    const productId = params.id
    const [prod,setProd] = useState()
    
    useEffect(() => {
        const getProduct = async() => {
            const res = await publicRequest.get(`/products/find/${productId}`)
            setProd(res.data)
        }
        getProduct()
    },[])

    console.log(prod)

  return (
    <>
        <Navbar/>
        <div style={container}>
            <div style={wrapper}>
                <h3 style={{width:"100%",textAlign:"center"}}>Write a Review</h3>
                <div style={itemCont}>
                    <img style={img} src={prod?prod.img:""} alt="" />
                    <h6 style={{flex:"2"}}>{prod?prod.desc:""}</h6>
                </div>
                <div style={addPhotoCont}>
                    <h5 style={{width:"100%",textAlign:"center"}}>Add Photo</h5>
                    <div style={{width:"100%",textAlign:"center"}}>
                        <input type="file" />
                    </div>
                </div>
                <div style={reviewCont}>
                    <h5 style={{width:"100%",textAlign:"center"}}>Write your Review</h5>
                    <div style={{width:"100%",textAlign:"center"}}>
                        <textarea rows="5" cols="50"/>
                    </div>
                </div>
                <div style={{width:"100%",textAlign:"center"}}>
                    <button style={{width:"80%",backgroundColor:"teal",border:"none",color:"white"}}>Submit Review</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default ReviewForm