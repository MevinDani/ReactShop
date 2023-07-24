import React from 'react'
import { styled } from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewsLetter from '../components/NewsLetter';
import { AddOutlined, RemoveOutlined } from '@material-ui/icons';
import { mobile } from '../responsive';

const Container = styled.div``;

const Wrapper = styled.div`
    padding:50px;
    display:flex;
    ${mobile({padding:"10px",flexDirection:"column"})}
`;
const ImgContainer = styled.div`
    flex:1;
`;

const Image = styled.img`
    width:100%;
    height:90vh;
    object-fit:cover;
    ${mobile({height:"40vh"})}
`;

const InfoContainer = styled.div`
    flex:1;
    padding:0px 50px;
    ${mobile({padding:"10px"})}
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
    ${mobile({width:"100%"})};
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
    ${mobile({width:"100%"})}
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
  return (
    <Container>
        <Navbar />
        <Wrapper>
            <ImgContainer>
                <Image src="https://i.postimg.cc/VkRb2bGM/creaslim-SUUGUg7-RXYY-unsplash.jpg"/>
            </ImgContainer>
            <InfoContainer>
                <Title>Denim Jeans</Title>
                <Desc>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Nisi, dignissimos! Recusandae velit deleniti quidem possimus
                    reiciendis, provident porro repellendus dolorum labore corporis consequuntur cum voluptatem ullam molestias qui, culpa rerum.
                </Desc>
                <Price>$ 20</Price>
                <FilterContainer>
                    <Filter>
                        <FilterTitle>Color</FilterTitle>
                        <FilterColor color="black"/>
                        <FilterColor color="darkblue"/>
                        <FilterColor color="gray"/>
                    </Filter>
                    <Filter>
                        <FilterTitle>Size</FilterTitle>
                        <FilterSize>
                            <FilterSizeOptions>XS</FilterSizeOptions>
                            <FilterSizeOptions>S</FilterSizeOptions>
                            <FilterSizeOptions>M</FilterSizeOptions>
                            <FilterSizeOptions>L</FilterSizeOptions>
                            <FilterSizeOptions>XL</FilterSizeOptions>
                            <FilterSizeOptions>XXL</FilterSizeOptions>
                        </FilterSize>
                    </Filter>
                </FilterContainer>
                <AddContainer>
                    <AmountContainer>
                        <RemoveOutlined />
                        <Amount>1</Amount>
                        <AddOutlined />
                    </AmountContainer>
                    <Button>ADD TO CART</Button>
                </AddContainer>
            </InfoContainer>
        </Wrapper>
        <NewsLetter />
        <Footer />
    </Container>
  )
}

export default SingleProduct