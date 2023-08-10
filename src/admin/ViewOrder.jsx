import React, { useEffect, useState } from 'react'
import Navbar from './AdminNav'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { publicRequest } from '../base_url/urls'
import { mobile, t600, tab } from '../responsive';


const ViewOrder = () => {
    const {id} = useParams()
    const [order,setOrder] = useState()
    const [loading,setLoading] = useState(false)

    const token = JSON.parse(localStorage.getItem('token'))


    useEffect(() => {
        const getOrder = async() => {
            try {
                setLoading(true)
                const res = await publicRequest.get(`/orders/find/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setOrder(res.data)
                setLoading(false)
            } catch (error) {
                console.log("eo",error)
            }
        }
        getOrder()
    },[])


  return (
    <>
        <Navbar/>
        <StyledOrder>
            { !order ? (
                <p>Loading... </p>
            ): (
                <>
                    <OrdersContainer>
                        <h2>Order Details</h2>
                        <p>
                            {order.delivery_status === "pending" ? (
                                <Pending>Pending</Pending> )
                            : order.delivery_status === "dispatched" ? (
                                <Dispatched>Dispatched</Dispatched>)
                            : order. delivery_status === "delivered" ? (
                                <Delivered>Delivered</Delivered>) :
                            "error" }
                        </p>

                        <h2>Order Details</h2>
                        <p>
                            <Delivered>{order.payment_status}</Delivered>
                        </p>
        
                        <h3>Ordered Products</h3>
                            <Items>
                            {order.products.map((product, index) => (
                            <Item Key={index}>
                                <span>{product.description}</span>
                                <span>{product.quantity}</span>
                                <span>
                                    {"$" + (product.amount_total / 100).toLocaleString()}
                                </span>
                            </Item>
                            ))}
                            </Items>
                            <div>
                                <h3>Total Price</h3>
                                <p style={{marginLeft:"15px"}}>{"$" + (order.total / 100).toLocaleString()}</p>
                            </div>
                            <div>
                                <h3>Shipping Details</h3>
                                <p style={{marginLeft:"15px"}}>Customer: <b>{order.shipping?.name}</b></p>
                                <p style={{marginLeft:"15px"}}>City: <b>{order.shipping?.address.city}</b></p>
                                <p style={{marginLeft:"15px"}}>Country: <b>{order.shipping?.address.country}</b></p>
                                <p style={{marginLeft:"15px"}}>Postal Code: <b>{order.shipping?.address.postal_code}</b></p>
                                <p style={{marginLeft:"15px"}}>Email: <b>{order.shipping?.email}</b></p>
                            </div>
                        </OrdersContainer>
                </>
            )
         }
    </StyledOrder>
    </>
  )
}

export default ViewOrder

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
const StyledOrder = styled.div`
    margin: 3rem;
    display: flex;
    justify-content: center;
    h3 {
    margin: 1.5rem 00.5rem 0;
    }
`
const OrdersContainer = styled.div`    
    max-width: 500px;
    width: 100%;
    height: auto;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 5px;
    padding: 2rem;
`
const Items = styled.div`
    span {
    margin-right: 1.5rem;
    &:first-child {
    font-weight: bold;
    }
}   
`
const Item = styled.li`
    margin-left: 0.5rem;
    margin-bottom: 0.5rem;

`
const Wrapper = styled.div`
    display:flex;
    justify-content:center;
`
const Container = styled.div`
    border:0.5px solid lightgray;
    background-color: #ADFAFF;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin-top:20px;
    width:80%;
    height:300px;
    display:flex;
    flex-direction:row;
    justify-content:space-evenly;
`
const ImgCont = styled.div``

const Title = styled.div`
    
`
const Desc = styled.div`
    
`
const Price = styled.div`
    
`
const Stock = styled.div`
    
`

const Product = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    border:0.5px solid lightgray;
    position:relative;
    padding:8px;
    margin:10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    ${mobile && t600({flexDirection:"column"})};
    width:80%;
`;

const ProductDetail = styled.div`
    flex:2;
    display:flex;
`;

const Image = styled.img`
    width:200px;
    height:200px;
    ${mobile({width:"150px",height:"150px"})}
`;

const Details = styled.div`
    padding:20px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
`;

const ProductName = styled.span``;

const ProductID = styled.span``;

const ProductColor = styled.div`
    width:20px;
    height:20px;
    border-radius:50%;
    background-color:${props => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
    flex:1;
    display:flex;
    flex-direction:column-reverse;
    align-items:center;
    justify-content:center;
`;

const ProductAmountContainer = styled.div`
    display:flex;
    align-items:center;
    margin-bottom:20px; 
`;

const ProductAmount = styled.div`
    font-size:24px;
    margin:5px;
    ${mobile({margin:"5px 15px"})}
`;

const ProductPrice = styled.div`
    font-size:30px;
    font-weight:200;
    ${mobile && tab({marginBottom:"20px"})}
`;


