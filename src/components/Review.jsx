import React, { useEffect, useState } from 'react'
import Rating from 'material-ui-rating'
import { useParams } from 'react-router-dom'
import { publicRequest } from '../base_url/urls'
import { useSelector } from 'react-redux'

const container = {
    backgroundColor:"teal",
    padding:"50px"
}

const wrapper = {
    border:"1px solid black",
    padding:"10px",
    margin:"15px",
    backgroundColor:"white",
    position:"relative"

}

const topC = {
    display:"flex",
    alignItems:"center",
}

const nameC = {
    // display:"flex",
    // flexDirection:"column",
    // justifyContent:"center"
}

const imgC = {

}

const img = {
    width:"50px",
    height:"50px",
    borderRadius:"100%"
}

const star = {
    
}

const day = {
    position:"absolute",
    right:"0",
    top:"0",
    padding:"5px",
    fontSize:"14px"
}

const text = {
    
}

const Review = () => {

    const user = useSelector(state => state.user.currentUser)

    // console.log(user)

    const [rating,setRating] = useState(5)
    const [reviews,setReviews] = useState()
    const [userProfPic, setUserProfPic] = useState({});
    const params = useParams()

    const token = JSON.parse(localStorage.getItem('token'))

    useEffect(() => {
        const getProdRev = async() => {
            const res = await publicRequest.get(`/products/${params.id}/reviews`)
            setReviews(res.data)
        }
        getProdRev()
    },[])

    useEffect(() => {
        const getUserProfPic = async () => {
            const newProfPicData = {};
    
            if (reviews && reviews.length > 0) {
                try {
                    await Promise.all(reviews.map(async (review) => {
                        const res = await publicRequest.get(`/users/profilePic/${review.userId}/${user._id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                        newProfPicData[review.userId] = res.data;
                    }));
                } catch (error) {
                    console.error('Error fetching user profile picture:', error);
                }
            }
    
            setUserProfPic(newProfPicData);
        };
    
        getUserProfPic();
    }, [reviews, token]);
    

    // useEffect(() => {
    //     const getUserProfPic = async() => {
    //         if(reviews) {
    //             reviews.map(async(i) => {
    //                 const res = await publicRequest.get(`/users/profilePic/${i.userId}/${user._id}`, {
    //                     headers: {
    //                         Authorization: `Bearer ${token}`,
    //                     }, 
    //                 })
    //                 userProfPic[i.userId] = res.data
    //                 console.log(res.data)
    //             })
    //         }
            
    //     }
    //     getUserProfPic()
    // },[reviews])

    console.log(reviews)
    console.log("profObj",userProfPic)

    const getTimeElapsed3 = (createdAt) => {
        const commentDate = new Date(createdAt);
        const now = new Date();
        const diff = Math.floor((now.getTime() - commentDate.getTime()) / 1000);  // Calculate the time difference in seconds
    
        if (diff < 60) {
          return `Just now`;
        } else if (diff < 3600) {
          const minutes = Math.floor(diff / 60);
          return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
        } else if (diff < 86400) {
          const hours = Math.floor(diff / 3600);
          return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
        } else {
          const days = Math.floor(diff / 86400);
          return `${days} ${days === 1 ? 'day' : 'days'} ago`;
        }
      }

  return (
    <div style={container}>
        {
            reviews ? reviews.map((review) => (
                <div style={wrapper}>
                    <div style={topC}>
                        
                        <div style={imgC}>
                            <img style={img} src={userProfPic[review.userId] ? userProfPic[review.userId]: "https://i.postimg.cc/htWDLS6P/user-avatar.png" } alt="" />
                        </div>
            
                        <div style={nameC}>
                            <div style={{marginLeft:"12px"}}>
                                <h5>{review.name}</h5>
                            </div>
                            <div style={star}>
                                <Rating value={review.rating} max={5} readOnly={true} />
                            </div>
                        </div>
            
                        <div style={day}>{getTimeElapsed3(review.createdAt)}</div>
                    </div>
                    <div style={text}>
                        <p> 
                            { review.content}
                        </p>
                    </div>
                </div>
            )) : ""
        }
    </div>
  )
}

export default Review