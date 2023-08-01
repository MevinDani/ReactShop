import React from 'react'

const Container = {

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
  marginTop:"40%",
  backgroundColor:"teal",
  color:"white",
  border:"none",
  padding:"8px",
  cursor:"pointer"
}


const Order = () => {
  return (
    <div style={Container}>
      <div style={Wrapper}>
          <div style={imgC}>
            <img style={img} src="https://i.postimg.cc/JzyRRkJG/pngwing-com-18.png" alt="" />
          </div>
          <div style={infoC}>
            <div style={prodName}>
              <h3>T-Shirt</h3>
            </div>
            <div style={price}>
              <p>$100</p>
            </div>
            <div style={quantity}>
              <p>Quantity: 2</p>
            </div>
          </div>
          <div style={statusC}>
            <p>Delivered on Date</p>
            <button style={rateBtn}>Rate this Product</button>
          </div>
      </div>
    </div>
  )
}

export default Order