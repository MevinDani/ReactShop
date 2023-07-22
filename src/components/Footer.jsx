import React from 'react'
import { Facebook, Instagram, Mail, Phone, Pinterest, Room, Twitter } from '@material-ui/icons';
import { styled } from 'styled-components'


const Container = styled.div`
    display:flex;
`;

const Left = styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    padding:20px;
`;

const Logo = styled.h1`

`;

const DESC = styled.p`
    margin:20px 0px;
`;

const SocialContainer = styled.div`
    display:flex;
`;

const SocialIcon = styled.div`
    width:40px;
    height:40px;
    border-radius:50%;
    color:white;
    background-color:#${props => props.color};
    display:flex;
    align-items:center;
    justify-content:center;
    margin-right:20px;
`;

const Center = styled.div`
    flex:1;
    padding:20px;
`;

const Title = styled.h3`
    margin-bottom:30px;
`;

const List = styled.ul`
    margin:0;
    padding:0;
    list-style:none;
    display:flex;
    flex-wrap:wrap;
`;

const ListItem = styled.li`
    width:50%;
    margin-bottom:10px;
`;

const Right = styled.div`
    flex:1;
    padding:20px;
`;

const ContactItem = styled.div`
    margin-bottom:20px;
    display:flex;
    align-items:center;
`;

const Payment = styled.div`
`;


const Footer = () => {
  return (
    <Container>
        <Left>
            <Logo>ESHOP.</Logo>
            <DESC>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quaerat, quam officia ut, expedita inventore voluptatibus 
                rerum quisquam est, ab beatae accusamus similique sint ducimus! 
                In reiciendis rem quibusdam pariatur et!
            </DESC>
            <SocialContainer>
                <SocialIcon color="3B5999">
                    <Facebook/>
                </SocialIcon>
                <SocialIcon color="E4405F">
                    <Instagram/>
                </SocialIcon>
                <SocialIcon color="55ACEE">
                    <Twitter/>
                </SocialIcon>
                <SocialIcon color="E60023">
                    <Pinterest/>
                </SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title>UseFull Links</Title>
            <List>
                <ListItem>Home</ListItem>
                <ListItem>Cart</ListItem>
                <ListItem>Men Fashion</ListItem>
                <ListItem>Women Fashion</ListItem>
                <ListItem>Accessories</ListItem>
                <ListItem>My Account</ListItem>
                <ListItem>Order Tracking</ListItem>
                <ListItem>WishList</ListItem>
                <ListItem>Terms</ListItem>
                <ListItem>Policy</ListItem>
            </List>
        </Center>
        <Right>
            <Title>Contact</Title>
            <ContactItem>
                <Room style={{marginRight:"10px"}}/>
                123 Baker Street, South London 88445
            </ContactItem>
            <ContactItem>
                <Phone style={{marginRight:"10px"}}/>
                +123 556 7741
            </ContactItem>
            <ContactItem>
                <Mail style={{marginRight:"10px"}}/>
                conatct@eshop.com
            </ContactItem>
            <Payment/>
        </Right>
    </Container>
  )
}

export default Footer