import React from 'react';
import { styled } from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { mobile, t600, tab } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseProduct, deleteProduct, increaseProduct } from '../redux/cartRedux';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { publicRequest } from '../base_url/urls';


const Container = styled.div``;

const Wrapper = styled.div`
    padding:20px;
    ${mobile({padding:"10px"})}
`;

const Title = styled.h1`
    font-weight:300;
    text-align:center;
`;

const Top = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:20px;
`;

const TopButton = styled.button`
    padding:10px;
    font-weight:600;
    cursor:pointer;
    border: ${props => props.type === "filled" && "none"};
    background-color: ${props => props.type === "filled" ? "black" : "transparent"};
    color: ${props => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
    ${mobile && tab({display:"none"})}
`;

const TopText = styled.span`
    text-decoration:underline;
    cursor:pointer;
    margin:0px 10px;
`;

const Bottom = styled.div`
    display:flex;
    justify-content:space-between;
    ${mobile && tab({flexDirection:"column"})}
`;

const Info = styled.div`
    flex:3;
`;


const Product = styled.div`
    display:flex;
    justify-content:space-between;
    border:0.5px solid lightgray;
    position:relative;
    padding:8px;
    margin:10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    ${mobile && t600({flexDirection:"column"})}
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
    flex-direction:column;
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

const Hr = styled.hr`
    height:1px;
    margin-bottom:10px;
`;

const Summary = styled.div`
    flex:1;
    border:0.5px solid lightgray;
    border-radius:10px;
    padding:20px;
    height:max-content;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const SummaryTitle = styled.h1`
    font-weight:200;
`;

const SummaryItem = styled.div`
    margin:30px 0;
    display:flex;
    justify-content:space-between;
    font-weight:${props => props.type === 'total' && '500'};
    font-size:${props => props.type === 'total' && '24px'};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
    width:100%;
    padding:10px;
    background-color:black;
    color:white;
    font-weight:600;
    cursor:pointer;
`;

const Cart = () => {
    const cart = useSelector(state => state.cart)
    const wishlist = useSelector(state => state.wish)
    const user = useSelector(state => state.user)
    // console.log(user,cart)
    
    const cartItems = useSelector(state => state.cart.products)
    if(user.currentUser) {
        const userId = user.currentUser._id
    }
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleRemove = (id) => {
       dispatch(
        decreaseProduct({id})
       )
    }

    const handleAdd = (id) => {
        dispatch(
            increaseProduct({id})
        )
    }

    const handleDelete = (id,price) => {
        dispatch(
            deleteProduct({id,price})
        )
    }

    const checkOut = async() => {
        if(!user.currentUser) {
            navigate('/login')
        } else {
            try {
                await publicRequest.post('/stripe/create-checkout-session', {
                    cartItems,
                    userId:user.currentUser._id
                }).then((res) => {
                    if(res.data.url) {
                        window.location.href = res.data.url
                    }
                }).catch((err) => {
                    console.log(err)
                })
            } catch (error) {
                console.log(error)
            }
        }
    }
  return (
    <Container>
        <Navbar/>
        <Wrapper>
            <Title>YOUR BAG</Title>
            <Top>
               <Link to='/'>
                    <TopButton>CONTINUE SHOPPING</TopButton>
                </Link>
                <TopTexts>
                    <TopText>Shopping Bag({cart.quantity})</TopText>
                   <Link to='/userProfile'><TopText>Your WishList(0)</TopText></Link>
                </TopTexts>
                <TopButton type="filled">CHECK OUT NOW</TopButton>
            </Top>
            <Bottom>
                <Info>
                    {cart.products.map(product => (
                        <>
                            <Product>
                            <div style={{position:"absolute",right:"0",marginRight:"10px",cursor:"pointer"}}><DeleteIcon onClick={() => handleDelete(product._id,product.price*product.quantity)}/></div>
                                <ProductDetail>
                                    <Image src={product.img}/>
                                    <Details>
                                        <ProductName><h4>{product.title}</h4></ProductName>
                                        <ProductID>{product.desc}</ProductID>
                                        <ProductColor color={product.color}/>
                                        <ProductSize><b>Size:</b>{product.size}</ProductSize>
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <ProductAmountContainer>
                                        <AddIcon style={{cursor:"pointer"}} onClick={() => handleAdd(product._id)}/>
                                        <ProductAmount>{product.quantity}</ProductAmount>
                                        <RemoveIcon style={{cursor:"pointer"}} onClick={()=>handleRemove(product._id)}/>
                                    </ProductAmountContainer>
                                    <ProductPrice>
                                        $ {product.price*product.quantity}
                                    </ProductPrice>
                                </PriceDetail>
                            </Product>
                            {/* <Hr /> */}
                        </>
                    ))}      
                </Info>
                <Summary>
                    <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>Subtotal</SummaryItemText>
                        <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Estimated Shipping</SummaryItemText>
                        <SummaryItemPrice>$ 5.9</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Shipping Discount</SummaryItemText>
                        <SummaryItemPrice>-$ 5.9</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem type="total">
                        <SummaryItemText>Total</SummaryItemText>
                        <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                    </SummaryItem>
                    <Button onClick={checkOut}>CHECKOUT NOW</Button>
                </Summary>
            </Bottom>
        </Wrapper>
        <Footer/>
    </Container>
  )
}

export default Cart