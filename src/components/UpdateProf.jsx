import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { mobile } from '../responsive';
import { login } from '../redux/apicalls';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './Navbar';
import { userUpdate } from '../redux/userRedux';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Container = styled.div`
    width:100vw;
    height:80vh;
    background-color:teal;
    // background: linear-gradient(rgba(255,255,255,0.1),rgba(255,255,255,0.1)) ,url("https://i.postimg.cc/zDMHXmqz/piotr-szulawski-Xj-R-Y8-PKeww-unsplash.jpg") center;
    // background-repeat: no-repeat;
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
    flex-direction:column; 
`;

const Input = styled.input`
    flex:1;
    min-width:40%;
    margin:10px 0px;
    padding:10px;
`;

const Button = styled.button`
    width:100%;
    border:none;
    padding:15px 20px;
    background-color:teal;
    color:white;
    cursor:pointer;
    margin-bottom:10px;
    &:disabled {
        color:green;
        cursor:not-allowed;
    }
`;

const Link =  styled.a`
    margin:5px 0px;
    font-size:12px;
    text-decoration:underline;
    cursor:pointer;
`;

const Error = styled.span`
    color:red;
`;

const chooseC = {
    width:"100%",
    textAlign:"center"
}

const imgC = {
    width:"100%",
    textAlign:"center"
}

const img = {
    width:"80px",
    height:"80px"
}

const UpdateProf = () => {
    const user = useSelector(state => state.user.currentUser)
    // const [username,setUsername] = useState('')
    // const [email,setEmail] = useState('')
    const initSet = () => {
        setValues({
            username:user.username,
            email:user.email
        })
    }

    const token = JSON.parse(localStorage.getItem('token'))
    // console.log(token)

    const params = useParams()
    const userId = params['id']

    const [values,setValues] = useState({
        username:"",
        email:""
    })

    const [profilePic,setProfilePic] = useState('')
    const [preview, setPreview] = useState('')

    useEffect(() => {
        if (profilePic) {
          setPreview(profilePic)
        }
      }, [profilePic])

    useEffect(() => {
        initSet()
    },[])

    const setImage = (e) => {
        // console.log(e.target.files[0]);
        const file = e.target.files[0]
        TransformFile(file)
        // setProfilePic(e.target.files[0])
    }

    const TransformFile = (file) => {
        const reader = new FileReader()
        if(file) {
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setProfilePic(reader.result)
            }
        } else {
            setProfilePic('')
        }
    }


    const {isFetching,error} = useSelector(state => state.user)
    // console.log(isFetching,error)

    const dispatch = useDispatch()

    const handleChange = (e) => {
        e.preventDefault()
        // console.log(e.target);
        setValues({ ...values, [e.target.placeholder]: e.target.value })
        // console.log(values)
      }
    

    const handleFormSubmit = (e) => {
        e.preventDefault()
        // console.log(values,profilePic)
        dispatch(userUpdate({...values,userId,profilePic,token}))
    }

    // useEffect(() => {
    //     setUsername(user.username)
    //     setEmail(user.email)
    // },[])
  return (
    <>
        <Navbar/>
        <Container>
            <Wrapper>
                <Title>Update Profile</Title>
                {isFetching?<div class="spinner-border text-info" role="status"></div>:""}
                <Form>
                    <div style={imgC}>
                        <img 
                            style={img} 
                            src={preview || (user.profilePic ? user.profilePic : "https://i.postimg.cc/htWDLS6P/user-avatar.png")} 
                        />
                    </div>
                    <Input placeholder="username"
                        value={values['username']}
                        onChange={handleChange}
                    />
                    <Input placeholder="email"
                        value={values['email']}
                        onChange={handleChange}
                        type='email'
                    />
                    <div style={chooseC}>
                        <Input placeholder="choose a profile pic"
                            onChange={setImage}
                            type='file'/>
                    </div>
                    <Button onClick={handleFormSubmit} disabled={isFetching}>UPDATE</Button>
                    { error && <Error>Something went wrong</Error> }
                </Form>
          </Wrapper>
        </Container>
    </>
  )
}

export default UpdateProf