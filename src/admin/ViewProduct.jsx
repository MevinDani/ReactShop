import React, { useEffect, useState } from 'react'
import Navbar from './AdminNav'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { publicRequest } from '../base_url/urls'
import { mobile, t600, tab } from '../responsive';


const Wrapper = styled.div`
    display:flex;
    justify-content:center;
`
const Container = styled.div`
    border:0.5px solid lightgray;
    background-color: #ADFAFF;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin-top:20px;
    width:80%;
    height:300px;
    display:flex;
    flex-direction:row;
    justify-content:space-evenly;
`
const ImgCont = styled.div``

const Title = styled.div`
    
`
const Desc = styled.div`
    
`
const Price = styled.div`
    
`
const Stock = styled.div`
    
`

const Product = styled.div`
    display:flex;
    justify-content:space-between;
    border:0.5px solid lightgray;
    position:relative;
    padding:8px;
    margin:10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    ${mobile && t600({flexDirection:"column"})};
    width:80%;
`;

const ProductDetail = styled.div`
    flex:2;
    display:flex;
`;

const Image = styled.img`
    width:200px;
    height:200px;
    ${mobile({width:"150px",height:"150px"})}
`;

const Details = styled.div`
    padding:20px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
`;

const ProductName = styled.span``;

const ProductID = styled.span``;

const ProductColor = styled.div`
    width:20px;
    height:20px;
    border-radius:50%;
    background-color:${props => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`;

const ProductAmountContainer = styled.div`
    display:flex;
    align-items:center;
    margin-bottom:20px; 
`;

const ProductAmount = styled.div`
    font-size:24px;
    margin:5px;
    ${mobile({margin:"5px 15px"})}
`;

const ProductPrice = styled.div`
    font-size:30px;
    font-weight:200;
    ${mobile && tab({marginBottom:"20px"})}
`;




const ViewProduct = () => {
    const {id} = useParams()
    const [product,setProduct] = useState()

    useEffect(() => {
        const getProduct = async() => {
            const res = await publicRequest.get(`/products/find/${id}`)
            setProduct(res.data)
        }
        getProduct()
    },[])

    console.log(product)

  return (
    <>
        <Navbar/>
        <Wrapper>
            {
                product ? 
                    <>
                    <Product>
                            <ProductDetail>
                                <Image src={product.img}/>
                                <Details>
                                    <ProductName><h4>{product.title}</h4></ProductName>
                                    <ProductID>{product.desc}</ProductID>
                                    <ProductColor color={product.color[0]}/>
                                    <ProductSize><b>Size:</b>{`${product.size}`}</ProductSize>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductPrice>
                                    $ {product.price}
                                </ProductPrice>
                            </PriceDetail>
                    </Product>
                    
                    </> : ""
            }
        </Wrapper>
       
    </>
  )
}

export default ViewProduct