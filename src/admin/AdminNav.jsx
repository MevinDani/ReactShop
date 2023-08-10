import React from 'react'
import styled from 'styled-components'
import {AccountCircleOutlined, LocalMallOutlined, Search} from '@material-ui/icons'
import {Badge} from '@material-ui/core'
import { mobile, t600 } from '../responsive'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../redux/userRedux'
import { removeAllCart } from '../redux/cartRedux'
import { removeAllWish } from '../redux/wishListRedux'


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
    padding:5px;
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
    // const cart = useSelector(state => state.cart)
    const quantity = useSelector(state => state.cart.quantity)
    const user = useSelector(state => state.user.currentUser)
    // console.log(user)
    // console.log(cart)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(
            logout()
        )
        dispatch(
            removeAllCart()
        )
        dispatch(
            removeAllWish()
        )
    }

  return (
    <Container>
        <Wrapper>
            <Left onClick={()=>navigate('/admin/home')}>
                <Language>Admin Panel</Language>
            </Left>
            <Center>
                <Link style={{textDecoration:"none"}} to='/'><Logo>ESHOP.</Logo></Link>
            </Center>
            <Right>
                {user ? 
                <>
                    <Link to='/' style={{textDecoration:"none"}} onClick={handleLogout}><MenuItem>LOGOUT</MenuItem></Link>
                    <Link to='/userProfile'>
                        <MenuItem>
                            <img style={{width:"40px",height:"40px",borderRadius:"40px"}} src={user.profilePic?user.profilePic:'https://i.postimg.cc/htWDLS6P/user-avatar.png'} alt="" />
                        </MenuItem>
                    </Link>
                </> :
                <>
                   <Link style={{textDecoration:"none"}} to='/register' hrefLang='/regiter'><MenuItem>REGISTER</MenuItem></Link>
                    <Link style={{textDecoration:"none"}} to='/login'><MenuItem>LOGIN</MenuItem></Link>
                </>
                }
                <Link style={{textDecoration:"none"}} to='/cart'>
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