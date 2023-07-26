import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { products } from '../data';
import ProductItem from './ProductItem';
import axios from 'axios';
import { publicRequest } from '../base_url/urls';

const Container = styled.div`
    padding:20px;
    display:flex;
    flex-wrap:wrap;
`;

const Product = ({cat,filters,sort}) => {
  // console.log(filters)
  console.log(sort)
  const [product,setProduct] = useState([])
  const [filterproduct,setfilterProduct] = useState([])

  useEffect(()=>{
    const getProducts = async() => {
      try {
        const res = await publicRequest.get(cat ? `/products?category=${cat}` : `/products`)
        setProduct(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getProducts()
  },[cat])

  useEffect(()=> {
    cat && setfilterProduct(
      product.filter(item=> Object.entries(filters).every(([key,value]) => 
      item[key].includes(value)
    )))
  },[product,cat,filters])
  // console.log(filterproduct,"filter")
  useEffect(() => {
    if(sort === 'Newest') {
      setfilterProduct((prev)=>
        [...prev].sort((a,b)=> a.createdAt - b.createdAt)
      )
    } else if(sort === 'Price (high)') {
      setfilterProduct((prev)=>
        [...prev].sort((a,b)=> a.price - b.price)
      )
    } else {
      setfilterProduct((prev)=>
        [...prev].sort((a,b)=> b.price - a.price)
      )
    }
  },[sort])
  console.log(filterproduct,"filter")
  return (
    <Container>
        { cat ?
            filterproduct.map((item) => (
                <ProductItem item={item} key={item.id}/>
            )) : product.slice(0,6).map((item) => (
              <ProductItem item={item} key={item.id}/>
          ))
        }
    </Container>
  )
}

export default Product