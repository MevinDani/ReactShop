import React, { useState } from 'react'
import { styled } from 'styled-components'
import Navbar from '../components/Navbar';
import Product from '../components/Product';
import NewsLetter from '../components/NewsLetter';
import Footer from '../components/Footer';
import { mobile } from '../responsive';
import { useLocation } from 'react-router-dom';



const Container = styled.div``;
const Title = styled.h1`
    margin:20px;
`;

const FilterContainer = styled.div`
    display:flex;
    justify-content:space-between;
`;

const Filter = styled.div`
    margin:20px;
    ${mobile({margin:"0px 20px",display:"flex",flexDirection:"column"})}
`;


const FilterText = styled.span`
    font-size:20px;
    font-weight:600;
    margin-right:20px;
    ${mobile({marginRight:"0px"})}
`;

const Select = styled.select`
    padding:10px;
    margin-right:20px; 
    ${mobile({margin:"10px 0px"})}
`;

const Option = styled.option``;
// 
const ProductList = () => {

    const location = useLocation()
    const cat = location.pathname.split('/')[2]
    const [filters,setFilter] = useState({})
    const [sort,setSort] = useState("Newest")

    const handleFilters = (e) => {
        const value = e.target.value
        setFilter({
            ...filters, 
            [e.target.name]:value
        })
    }

  return (
    <Container>
        <Navbar />
        <Title>{cat}</Title>
        <FilterContainer>
            <Filter>
                <FilterText>Filter Products:</FilterText>
                <Select name="color" onChange={handleFilters}>
                    <Option disabled>
                        Color
                    </Option>
                    <Option>white</Option>
                    <Option>black</Option>
                    <Option>red</Option>
                    <Option>blue</Option>
                    <Option>orange</Option>
                    <Option>yellow</Option>
                </Select>
                <Select name="size" onChange={handleFilters}>
                    <Option disabled>
                        Size
                    </Option>
                    <Option>XS</Option>
                    <Option>S</Option>
                    <Option>M</Option>
                    <Option>L</Option>
                    <Option>XL</Option>
                    <Option>XXL</Option>
                </Select>
            </Filter>
            <Filter>
                <FilterText>Sort Products:</FilterText>
                <Select onChange={(e)=>setSort(e.target.value)}>
                    <Option>Newest</Option>
                    <Option>Price (high)</Option>
                    <Option>Price (Low)</Option>
                </Select>
            </Filter>
        </FilterContainer>
        <Product cat={cat} filters={filters} sort={sort}/>
        <NewsLetter />
        <Footer />
    </Container>
   
  )
}

export default ProductList