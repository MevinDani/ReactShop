import React from 'react';
import { styled } from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AddOutlined, Clear, Delete, RemoveOutlined } from '@material-ui/icons';
import { mobile, t600, tab } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseProduct, deleteProduct, increaseProduct } from '../redux/cartRedux';


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
    background-color:${props => props.color}
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
    const dispatch = useDispatch()
    // console.log(cart)
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
  return (
    <Container>
        <Navbar/>
        <Wrapper>
            <Title>YOUR BAG</Title>
            <Top>
                <TopButton>CONTINUE SHOPPING</TopButton>
                <TopTexts>
                    <TopText>Shopping Bag({cart.quantity})</TopText>
                    <TopText>Your WishList(0)</TopText>
                </TopTexts>
                <TopButton type="filled">CHECK OUT NOW</TopButton>
            </Top>
            <Bottom>
                <Info>
                    {cart.products.map(product => (
                        <>
                            <div style={{display:"flex",justifyContent:"flex-end",marginRight:"10px"}}><Clear onClick={() => handleDelete(product._id,product.price*product.quantity)}/></div>
                            <Product>
                                <ProductDetail>
                                    <Image src={product.img}/>
                                    <Details>
                                        <ProductName><b>Product:</b>{product.title}</ProductName>
                                        <ProductID><b>ProductID:</b>{product._id}</ProductID>
                                        <ProductColor color={product.color}/>
                                        <ProductSize><b>Size:</b>{product.size}</ProductSize>
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <ProductAmountContainer>
                                        <AddOutlined onClick={() => handleAdd(product._id)}/>
                                        <ProductAmount>{product.quantity}</ProductAmount>
                                        <RemoveOutlined onClick={()=>handleRemove(product._id)}/>
                                    </ProductAmountContainer>
                                    <ProductPrice>
                                        $ {product.price*product.quantity}
                                    </ProductPrice>
                                </PriceDetail>
                            </Product>
                            <Hr />
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
                    <Button>CHECKOUT NOW</Button>
                </Summary>
            </Bottom>
        </Wrapper>
        <Footer/>
    </Container>
  )
}

export default Cart