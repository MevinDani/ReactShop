import React, { useState } from 'react'
import { styled } from 'styled-components'
import { mobile } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../redux/userRedux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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

const errorMsg = {
    color:"red"
}

const Link =  styled.a`
    margin:5px 0px;
    font-size:12px;
    text-decoration:underline;
    cursor:pointer;
`;

const Register = () => {

    const user = useSelector(state => state.user)
    console.log(user)

    const [values,setValues] = useState({
        username:"",
        email:"",
        password:"",
        cpass:""
    })

    const [err,setErr] = useState('')

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()
        if(values.username === "") {
           return setErr('Username cannot be empty') 
        } else if (values.email === "") {
            return setErr('Email cannot be empty')
        } else if (values.password === "") {
            return setErr('Password cannot be empty')
        } else if (values.cpass === "") {
            return setErr('Confirm Password cant be empty')
        } else if(values.password !== values.cpass) {
            return setErr('Password and Confirm password are not equal')
        }
        setErr('')
        dispatch(userRegister({...values}))
            .then((res) => {
                console.log(res)
                if(res.type === 'userRegister/rejected') {
                    toast.error(`${res.payload.response.data.message}`, {
                        position:"top-center"
                    })
                } else if (res.type === 'userRegister/fulfilled') {
                    navigate('/login')
                    toast.success('User Successfully registered, now login', {
                        position:"top-center"
                    })
                }
            })
            setValues({
                username:"",
                email:"",
                password:"",
                cpass:""
            })
    }

  return (
    <Container>
        <Wrapper>
            <Title>CREATE AN ACCOUNT</Title>
                {user.isFetching?<div style={{width:"100%",textAlign:"center"}}><div class="spinner-border text-info" role="status"></div></div>:""}
            <Form>
                <Input placeholder="username" value={values.username}
                    onChange={(e) => setValues({...values,username:e.target.value})}
                />
                <Input placeholder="email" value={values.email}  
                    onChange={(e) => setValues({...values,email:e.target.value})}
                />
                <Input placeholder="password" type='password' value={values.password} 
                    onChange={(e) => setValues({...values,password:e.target.value})}
                />
                <Input placeholder="confirm password" id='cpass' type='password' value={values.cpass} 
                    onChange={(e) => setValues({...values,cpass:e.target.value})}
                />
                <div>
                    <Input type='file' id='file' placeholder='Set Profile Pic'/>
                    <div style={errorMsg}>{err}</div>  
                </div> 
                <Agreement>
                    By Creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
                </Agreement>
                <Button onClick={handleRegister} disabled={user.isFetching}>CREATE</Button>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Register