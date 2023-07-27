import React from 'react'
import styled from 'styled-components'
import {LocalMallOutlined, Search} from '@material-ui/icons'
import {Badge} from '@material-ui/core'
import { mobile, t600 } from '../responsive'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Container = styled.div`
    height:60px;
    ${mobile && t600({height:"50px"})};
`;
const Wrapper = styled.div`
    padding:10px 20px;
    display:flex;
    justify-content:space-between;
    ${mobile && t600({padding:"10px 0px"})}
`;
const Left = styled.div`
    flex:1;
    display:flex;
    align-items:center;
`;
const SearchContainer = styled.div`
    border:0.5px solid lightgray;
    display:flex;
    align-items:center;
    margin-left:25px;
    padding:5px
`;
const Input = styled.input`
    border:none;
    ${mobile && t600({width:"50px"})}
`;
const Language = styled.div`
    font-size:14px;
    cursor:pointer;
    ${mobile && t600({display:"none"})}
`;
const Center = styled.div`
    flex:1;
    text-align:center;
`;

const Logo = styled.h1`
    font-weight:bold;
    ${mobile && t600({fontSize:"24px"})}
`;
const Right = styled.div`
    flex:1;
    display:flex;
    align-items:center;
    justify-content:flex-end;
    ${mobile && t600({justifyContent:"center",flex:2})}
`;
const MenuItem = styled.div`
    font-size:14px;
    cursor:pointer;
    margin-left:25px;
    ${mobile && t600({fontSize:"12px", marginLeft:"10px"})}
`;

const Navbar = () => {
    const cart = useSelector(state => state.cart)
    const quantity = useSelector(state => state.cart.quantity)
    console.log(cart)

  return (
    <Container>
        <Wrapper>
            <Left>
                <Language>EN</Language>
                <SearchContainer>
                    <Input placeholder='Search'/>
                    <Search style={{ color:"grey", fontSize:"16px"}}/>
                </SearchContainer>
            </Left>
            <Center>
                <Link to='/'><Logo>ESHOP.</Logo></Link>
            </Center>
            <Right>
                <Link to='/register'><MenuItem>REGISTER</MenuItem></Link>
                <Link to='/login'><MenuItem>LOGIN</MenuItem></Link>
                <Link to='/cart'>
                    <MenuItem>
                        <Badge badgeContent={quantity} color="primary">
                            <LocalMallOutlined/>
                        </Badge>
                    </MenuItem>
                </Link>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar