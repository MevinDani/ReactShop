import React from 'react'
import { styled } from 'styled-components'
import { products } from '../data';
import ProductItem from './ProductItem';

const Container = styled.div`
    padding:20px;
    display:flex;
    flex-wrap:wrap;
`;

const Product = () => {
  return (
    <Container>
        {
            products.map((item) => (
                <ProductItem item={item} key={item.id}/>
            ))
        }
    </Container>
  )
}

export default Product