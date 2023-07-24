import React from 'react'
import { styled } from 'styled-components'
import { mobile } from '../responsive';

const Container = styled.div`
    width:100vw;
    height:100vh;
    background: linear-gradient(rgba(255,255,255,0.1),rgba(255,255,255,0.1)) ,url("https://i.postimg.cc/W36h8G8Y/keagan-henman-x-PJYL0l5-Ii8-unsplash.jpg") center;
    background-size: cover;
    display:flex;
    justify-content:center;
    align-items:center;
`;

const Wrapper = styled.div`
    padding:20px;
    width:50%;
    background-color:white;
    ${mobile({width:"80%"})}
`;

const Title = styled.h1`
    font-size:24px;
    font-weight:300;
`;

const Form = styled.form`
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
`;

const Input = styled.input`
    flex:1;
    min-width:40%;
    margin:20px 10px 0 0;
    padding:10px;
`;

const Agreement = styled.span`
    font-size:12px;
    margin:20px 0px;
`;

const Button = styled.button`
    width:40%;
    border:none;
    padding:15px 20px;
    background-color:teal;
    color:white;
    cursor:pointer;
`;

const Register = () => {
  return (
    <Container>
        <Wrapper>
            <Title>CREATE AN ACCOUNT</Title>
            <Form>
                <Input placeholder="name" />
                <Input placeholder="last name" />
                <Input placeholder="username" />
                <Input placeholder="email" />
                <Input placeholder="password" />
                <Input placeholder="confirm password" />
                <Agreement>
                    By Creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
                </Agreement>
                <Button>CREATE</Button>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Register