import React, { useState } from 'react';
import { styled } from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AddOutlined, Clear, Delete, RemoveOutlined } from '@material-ui/icons';
import { mobile, t600, tab } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseWish, deleteWish, increaseWish } from '../redux/wishListRedux';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Order from './Order';
import { Link } from 'react-router-dom';

// const UserProfile = () => {
//     const user = useSelector(state => state.user.currentUser)

//     const wrapper =  {
//         width:"100%",
//         display:"flex",
//         flexDirection:"column",
//         alignItems:"center",
//         justifyContent:"center",
//         marginTop:"20px"
//     }

//     const userProfile = {
//         width:"80%",
//         height:"auto",
//         display:"flex",
//         alignItems:"center",
//         justifyContent:"center",
//         border:"1px solid gray",
//         backgroundColor: "#f5fbfd",
//     }

//   const profilePictureStyle = {
//     width: '150px',
//     height: '150px',
//     borderRadius: '50%',
//     objectFit: 'cover',
//   };

//   const userDetailsStyle = {
//     marginLeft: '20px',
//   };

//   const update = {
//     padding:"10px",
//     fontWeight:"400",
//     cursor:"pointer",
//     border:"1px solid black",
//     color: "black",
//     marginTop:"10px",
//     margin:"10px 10px"
//   }

//   const userButtons = {
//     display:"flex",
//     justifyContent:"space-evenly",
//     width:"100%",
//     padding:"10px",
//     fontWeight:"400",
//     cursor:"pointer",
//     border:"1px solid black",
//     backgroundColor: "#f5fbfd",
//     color: "black",
//     marginTop:"10px"
//   }

//   return (
//     <>
//         <Navbar/>
//         <div style={wrapper}>
//             <div style={userProfile}>
//               <img
//                 src={user.profilePic ? user.profilePic : 'https://i.postimg.cc/htWDLS6P/user-avatar.png'}
//                 alt={user.username}
//                 style={profilePictureStyle}
//               />
//               <div style={userDetailsStyle}>
//                 <h2 className="username">{user.username}</h2>
//                 <p className="full-name">{user.email}</p>
//                 <p className="bio">{user.bio}</p>
//                 {/* Add more user details rendering here */}
//               </div>
//             </div>
//             <button style={update}>Update Profile</button>
//             <div style={userButtons}>
//                 <button style={update}>WishList</button>
//                 <button style={update}>Your Orders</button>
//             </div>
//         </div>
//         <NewsLetter/>
//         <Footer/>
//     </>
//   );
// };

// export default UserProfile;



//


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


// const Product = styled.div`
//     display:flex;
//     justify-content:space-between;
//     ${mobile && t600({flexDirection:"column"})}
// `;

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

const wrapper =  {
    width:"100%",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    marginTop:"20px"
}

const userProfile = {
    width:"50%",
    padding:"12px",
    height:"max-content",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    border:"0.5px solid lightgray",
    backgroundColor: "#f5fbfd",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
}

const profilePictureStyle = {
width: '150px',
height: '150px',
borderRadius: '50%',
objectFit: 'cover',
};

const userDetailsStyle = {
marginLeft: '20px',
};

const updateProfBtn = {
padding:"10px",
fontWeight:"400",
cursor:"pointer",
border:"0.5px solid black",
color: "white",
backgroundColor:"orange",
marginTop:"10px",
margin:"10px 10px"
}

const wishBtn = {
    padding:"10px",
    fontWeight:"400",
    cursor:"pointer",
    border:"0.5px solid black",
    backgroundColor:"red",
    color: "white",
    marginTop:"10px",
    margin:"10px 10px"
}

const orderBtn = {
    padding:"10px",
    fontWeight:"400",
    cursor:"pointer",
    border:"0.5px solid black",
    backgroundColor:"teal",
    color: "white",
    marginTop:"10px",
    margin:"10px 10px"
}

const userButtons = {
display:"flex",
justifyContent:"space-evenly",
width:"100%",
padding:"10px",
fontWeight:"400",
cursor:"pointer",
border:"1px solid black",
backgroundColor: "#f5fbfd",
color: "black",
marginTop:"10px",
border:"0.5px solid lightgray",
boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
}

const Cart = () => {
    const cart = useSelector(state => state.cart)
    const user = useSelector(state => state.user.currentUser)
    const wishlist = useSelector(state => state.wish)

    const [show,setShow] = useState(true)

    // console.log(wishlist)

    const dispatch = useDispatch()

    const handleAddWish = (id) => {
        dispatch(
            increaseWish({id})
        )
    }
    const handleRemoveWish = (id) => {
        dispatch(
            decreaseWish({id})
        )
    }
    const handleDeleteWish = (id,price) => {
        dispatch(
            deleteWish({id,price})
        )
    }

    const handleWishShow = () => {
        setShow(true)
    }

    const handleOrderShow = () => {
        setShow(false)
    }

  return (
    <Container>
        <Navbar/>
        <Wrapper>
            {/* <Title>YOUR BAG</Title> */}
            <Top>
            <div style={wrapper}>
                <div style={userProfile}>
                    <img
                        src={user.profilePic ? user.profilePic : 'https://i.postimg.cc/htWDLS6P/user-avatar.png'}
                        alt={user.username}
                        style={profilePictureStyle}
                    />
                    <div style={userDetailsStyle}>
                        <h2 className="username">{user.username}</h2>
                        <p className="full-name">{user.email}</p>
                        <p className="bio">{user.bio}</p>
                        {/* Add more user details rendering here */}
                    </div>
                </div>
                <Link to={`/update/${user._id}`}><button style={updateProfBtn}>Update Profile</button></Link>
                <div style={userButtons}>
                    <button style={wishBtn} onClick={handleWishShow}>WishList</button>
                    <button style={orderBtn} onClick={handleOrderShow}>Your Orders</button>
                </div>
            </div>
                {/* <TopButton>CONTINUE SHOPPING</TopButton>
                <TopTexts>
                    <TopText>Shopping Bag({cart.quantity})</TopText>
                    <TopText>Your WishList(0)</TopText>
                </TopTexts>
                <TopButton type="filled">CHECK OUT NOW</TopButton> */}
            </Top>
            {show?
            <Bottom>
                <Info>
                    {wishlist.products.map(product => (
                        <>
                            <Product>
                            <div style={{position:"absolute",right:"0",marginRight:"10px",cursor:"pointer"}}><DeleteIcon onClick={() => handleDeleteWish(product._id,product.price*product.quantity)}/></div>
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
                                        <AddIcon style={{cursor:"pointer"}} onClick={() => handleAddWish(product._id)}/>
                                        <ProductAmount>{product.quantity}</ProductAmount>
                                        <RemoveIcon style={{cursor:"pointer"}} onClick={()=>handleRemoveWish(product._id)}/>
                                    </ProductAmountContainer>
                                    <ProductPrice>
                                        $ {product.price*product.quantity}
                                    </ProductPrice>
                                </PriceDetail>
                            </Product>
                        </>
                        ))}     
                </Info>
                {wishlist.products.length > 0 ? 
                (<Summary>
                    <SummaryTitle>WISHLIST SUMMARY</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>Subtotal</SummaryItemText>
                        <SummaryItemPrice>$ {wishlist.total}</SummaryItemPrice>
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
                        <SummaryItemPrice>$ {wishlist.total}</SummaryItemPrice>
                    </SummaryItem>
                    <Button>ADD TO CART</Button>
                </Summary>) : 
                
                <>
                    <div style={{width:"100%",textAlign:"center",fontWeight:"600",margin:"20px"}}>
                        Nothing On wishlist, add items to your wishlist
                    </div>
                
                </>
               
                }
            </Bottom>: 
            <Order/>
            }
        </Wrapper>
        <Footer/>
    </Container>
  )
}

export default Cart