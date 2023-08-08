import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import { publicRequest } from '../base_url/urls'
import Rating from 'material-ui-rating'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const container = {
    backgroundColor:"teal",
    display:"flex",
    justifyContent:"center",
}

const wrapper = {
    backgroundColor:"white",
    width:"600px",
    height:"min-content",
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
    backgroundColor:"#fbeadd",
    marginBottom:"10px",
    height:"150px"
}

const star = {
    textAlign:"center",
    marginBottom:"10px"
}

const addPhotoCont = {
    marginBottom:"10px",
    display:"flex",
    justifyContent:"space-evenly"
}


const reviewCont = {
    
}

const img = {
    width:"150px",
    height:"150px",
    flex:"1"
}

const ReviewForm = () => {

    const user = useSelector(state => state.user.currentUser)

    const navigate = useNavigate()

    const params = useParams()
    const productId = params.id
    const [prod,setProd] = useState()

    const [rating,setRating] = useState(0)
    const [revText,setRevText] = useState('')
    const [rateImg,setRateImg] = useState('')

    const token = JSON.parse(localStorage.getItem('token'))

    
    useEffect(() => {
        const getProduct = async() => {
            const res = await publicRequest.get(`/products/find/${productId}`)
            setProd(res.data)
        }
        getProduct()
    },[])

    const setImage = (e) => {
        // console.log(e.target.files[0]);
        const file = e.target.files[0]
        TransformFile(file)
        // setProfilePic(e.target.files[0])
    }

    const TransformFile = (file) => {
        const reader = new FileReader()
        if(file) {
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setRateImg(reader.result)
            }
        } else {
            setRateImg('')
        }
    }

    const reqBody = {
        content:revText,
        rating,
        userId:user._id,
        name:user.username
    }

    const addReview = async() => {
        try {
            const res = await publicRequest.post(`/products/${productId}/review/${user._id}`, reqBody, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }, 
            })
            if(res.status === 200) {
                console.log(res)
                toast.success('Review added successfully', {
                    position:'top-center'
                })
                setRating(0)
                setRevText('')
                navigate(`/product/${productId}`)
            } else {
                console.log("some error occured")
            }
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <>
        <Navbar/>
        <div style={container}>
            <div style={wrapper}>
                <h3 style={{width:"100%",textAlign:"center"}}>Write a Review</h3>
                <div style={itemCont}>
                    <img style={img} src={prod?prod.img:""} alt="" />
                    <h5 style={{flex:"2"}}>{prod?prod.desc:""}</h5>
                </div>
                <div style={star}>
                    <h5>Choose a Rating</h5>
                    <Rating max={5} value={rating} onChange={(value) => setRating(value)} />
                </div>
                <hr />
                {/* <h5 style={{width:"100%",textAlign:"center"}}>Add Photo</h5>
                <div style={addPhotoCont}>
                    <div>
                        <input type="file" onChange={setImage} />
                    </div>
                    {
                        rateImg ? 
                        <div style={itemCont}>
                            <img style={img} src={rateImg?rateImg:""} alt="" />
                        </div>
                        : ""
                    }
                </div> */}
                <div style={reviewCont}>
                    <h5 style={{width:"100%",textAlign:"center"}}>Write your Review</h5>
                    <div style={{width:"100%",textAlign:"center"}}>
                        <textarea rows="5" cols="50" value={revText} onChange={(e) => setRevText(e.target.value)}/>
                    </div>
                </div>
                <div style={{width:"100%",textAlign:"center"}}>
                    <button onClick={addReview} style={{width:"70%",backgroundColor:"teal",border:"none",color:"white",borderRadius:"12px"}}>Submit Review</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default ReviewForm