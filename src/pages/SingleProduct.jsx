import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewsLetter from '../components/NewsLetter';
import { AddOutlined, RemoveOutlined } from '@material-ui/icons';
import { mobile,tab } from '../responsive';
import { useLocation, useNavigate } from 'react-router-dom';
import { publicRequest } from '../base_url/urls';
import { useDispatch } from 'react-redux'
import { addProduct } from '../redux/cartRedux';
import Review from '../components/Review';


const Container = styled.div``;

const Wrapper = styled.div`
    padding:50px;
    display:flex;
    ${mobile && tab({padding:"10px",flexDirection:"column"})}
`;
const ImgContainer = styled.div`
    flex:1;
`;

const Image = styled.img`
    width:100%;
    height:90vh;
    object-fit:cover;
    ${mobile({height:"40vh"})};
    ${tab({height:"80vh"})};
`;

const InfoContainer = styled.div`
    flex:1;
    padding:0px 50px;
    ${mobile && tab({padding:"10px"})}
`;

const Title = styled.h1`
    font-weight:200;
`;

const Desc = styled.p`
    margin:20px 0;
`;

const Price = styled.span`
    font-weight:100;
    font-size:40px;
`;

const FilterContainer = styled.div`
    width:50%;
    margin:30px 0px;
    display:flex;
    justify-content:space-between;
    ${mobile && tab({width:"100%"})};
`

const Filter = styled.div`
    display:flex;
    align-items:center;
`

const FilterTitle = styled.span`
    font-size:20px;
    font-weight:200;
`

const FilterColor = styled.div`
    width:20px;
    height:20px;
    border-radius:50%;
    background-color: ${props => props.color};
    margin:0 5px;
    cursor:pointer;
`

const FilterSize = styled.select`
    margin-left:10px;
    padding:5px; 
`

const FilterSizeOptions = styled.option``

const AddContainer = styled.div`
    width:50%;
    display:flex;
    align-items:center;
    justify-content:space-between;
    ${mobile && tab({width:"100%"})}
`

const AmountContainer = styled.div`
    display:flex;
    align-items:center;
    font-weight:700;
`;

const Amount = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    width:30px;
    height:30px;
    border-radius:10px;
    border:1px solid teal;
    margin:0px 5px; 
`

const Button = styled.button`
    padding:15px;
    border:2px solid teal;
    background-color:white;
    cursor:pointer;
    font-weight:500;

    &:hover {
        background-color:#f8f4f4;
    }
`

const SingleProduct = () => {
    
    const location = useLocation()
    const id = location.pathname.split("/")[2]
    const [product,setProduct] = useState({})
    const [quantity,setQuantity] = useState(1)
    const [color,setColor] = useState("")
    const [size,setSize] = useState("")
    const dispatch = useDispatch()

    const handleClick = (inp) => {
        if(inp === "rem") {
           quantity > 1 && setQuantity(quantity - 1)
        } else {
            setQuantity(quantity + 1)
        }
    }

    const handleCart = () => {
        // update cart
        dispatch(
            addProduct({...product,quantity,color,size,id:product._id})
        )

    }
    const ScrollToTop = () => {
        const navigate = useNavigate();
      
        useEffect(() => {
          const onNavigation = () => {
            window.scrollTo(0, 0);
          };
      
          // Listen for navigation events
          navigate(onNavigation);
      
          // Cleanup the listener on component unmount
          return () => {
            navigate((location) => null);
          };
        }, [navigate]);
      
        return null;
    }

    // console.log(product)
    // console.log(color,size)

    useEffect(() => {
        try {
            const getProduct = async() => {
                const res = await publicRequest.get(`/products/find/${id}`)
                // console.log(res)
                setProduct(res.data)
                setColor(res.data.color[0])
                setSize(res.data.size[0])
            }
            getProduct()
        } catch (error) {
            console.log(error)
        }
    },[id])

    // useEffect(() => {
    //     ScrollToTop()
    // },[])

  return (
    <Container>
        <Navbar />
        <Wrapper>
            <ImgContainer>
                <Image src={product.img}/>
            </ImgContainer>
            <InfoContainer>
                <Title>{product.title}</Title>
                <Desc>
                    {product.desc}
                </Desc>
                <Price>$ {product.price}</Price>
                <FilterContainer>
                    <Filter>
                        <FilterTitle>Color</FilterTitle>
                        {product.color?.map((c) => (
                            <FilterColor color={c} key={c} onClick={()=>setColor(c)}/>
                            ))
                        }
                    </Filter>
                    <Filter>
                        <FilterTitle>Size</FilterTitle>
                        <FilterSize onChange={(e)=>setSize(e.target.value)}>
                            {product.size?.map((s) => (
                                <FilterSizeOptions key={s}>{s}</FilterSizeOptions>
                                ))
                            }
                        </FilterSize>
                    </Filter>
                </FilterContainer>
                <AddContainer>
                    <AmountContainer>
                        <RemoveOutlined onClick={() => handleClick('rem')}/>
                        <Amount>{quantity}</Amount>
                        <AddOutlined onClick={() => handleClick('add')}/>
                    </AmountContainer>
                    <Button onClick={handleCart}>ADD TO CART</Button>
                </AddContainer>
            </InfoContainer>
        </Wrapper>
        <div style={{textAlign:"center",margin:"20px"}}>
            <span style={{fontWeight:"500",fontSize:"30px",border:"1px solid teal",padding:"10px"}}>Customer Reviews</span>
        </div>
        <Review/>
        <NewsLetter />
        <Footer />
    </Container>
  )
}

export default SingleProduct