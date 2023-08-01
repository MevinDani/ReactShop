import React, { useState } from 'react'
import Rating from 'material-ui-rating'

const container = {
    backgroundColor:"teal",
    padding:"5px"
}

const wrapper = {
    border:"1px solid black",
    padding:"10px",
    backgroundColor:"white"

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
    
}

const text = {
    
}

const Review = () => {

    const [rating,setRating] = useState(5)

  return (
    <div style={container}>
        <div style={wrapper}>
            <div style={topC}>
    
                <div style={imgC}>
                    <img style={img} src="https://i.postimg.cc/htWDLS6P/user-avatar.png" alt="" />
                </div>
    
                <div style={nameC}>
                    <div style={{marginLeft:"12px"}}>
                        <h3>admin</h3>
                    </div>
                    <div style={star}>
                        <Rating value={rating} max={5} readOnly={true} />
                    </div>
                </div>
    
                <div style={day}>1 day ago</div>
            </div>
            <div style={text}>
                <p>  Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Quasi similique maxime quo, laborum a modi porro maiores
                    reiciendis at suscipit. Culpa vitae blanditiis inventore
                    consectetur ratione consequuntur impedit qui amet.
                </p>
            </div>
        </div>
    </div>
  )
}

export default Review