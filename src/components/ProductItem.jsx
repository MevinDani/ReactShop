import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import {Favorite, FavoriteBorder, FavoriteBorderOutlined, LocalMallOutlined, SearchOutlined} from '@material-ui/icons'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../redux/cartRedux';
import { addRemWish } from '../redux/wishListRedux';


const Info = styled.div`
    opacity:0;
    width:100%;
    height:100%;
    position:absolute;
    background-color:rgba(0,0,0,0.2);
    top:0; 
    left:0;
    display:flex;
    align-items:center;
    justify-content:center;
    z-index:3;
    transition:all 0.5s ease;
`;

const Container = styled.div`
    flex:1;
    margin:5px;
    min-width:280px;
    height:350px;
    display:flex;
    align-items:center;
    justify-content:center;
    background-color:#f5fbfd;
    position:relative;

    &:hover ${Info} {
        opacity:1;
    }
`;

const Circle = styled.div``;

const Image = styled.img`
    height:80%;
    width:80%;
    object-fit:cover;
    z-index:2;
`;

const Icon = styled.div`
    width:40px;
    height:40px;
    border-radius:50%;
    background-color:white;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    margin:10px;
    transition:all 0.5s ease;

    &:hover {
        background-color:#e9f5f5;
        transform:scale(1.1);
    }
`;

const ProductItem = ({item}) => {
    // console.log(item)

    const wish = useSelector(state => state.wish.products)
    const wishmap = {}
    wish.map((i) => {
        wishmap[i._id]=true
    })

    const [quantity,setQuantity] = useState(1)
    const [color,setColor] = useState("")
    const [size,setSize] = useState("")

    const dispatch = useDispatch()

    const handleCart = (item) => {
        // update cart
        dispatch(
            addProduct({...item,quantity,color,size,id:item._id})
        )
    }

    const handleWish = (item) => {
        dispatch(
            addRemWish({...item,quantity,color,size,id:item._id})
        )
    }

    useEffect(() => {
        setColor(item.color[0])
        setSize(item.size[0])
    },[item])


  return (
    <Container>
        <Circle/>
        <Image src={item.img}/>
        <Info>
            <Icon>
                <LocalMallOutlined onClick={() => handleCart(item)}/>
            </Icon>
            <Icon>
                <Link to={`/product/${item._id}`}>
                    <SearchOutlined/>
                </Link>
            </Icon>
            <Icon>
                {   wishmap[item._id] ?
                    <Favorite onClick={() => handleWish(item)}/> :
                    <FavoriteBorderOutlined onClick={() => handleWish(item)}/>  
                }
            </Icon>
        </Info>
       
    </Container>
  )
}

export default ProductItem