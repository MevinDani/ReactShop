import React from 'react'
import { styled } from 'styled-components'
import {FavoriteBorderOutlined, LocalMallOutlined, SearchOutlined} from '@material-ui/icons'


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
  return (
    <Container>
        <Circle/>
        <Image src={item.img}/>
        <Info>
            <Icon>
                <LocalMallOutlined/>
            </Icon>
            <Icon>
                <SearchOutlined/>
            </Icon>
            <Icon>
                <FavoriteBorderOutlined/>
            </Icon>
        </Info>
       
    </Container>
  )
}

export default ProductItem