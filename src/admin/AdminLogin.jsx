import React, { useState } from 'react'
import { styled } from 'styled-components'
import { mobile } from '../responsive';
import { login } from '../redux/apicalls';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../redux/userRedux';

const Container = styled.div`
    width:100vw;
    height:100vh;
    background: linear-gradient(rgba(255,255,255,0.1),rgba(255,255,255,0.1)) ,url("https://i.postimg.cc/zDMHXmqz/piotr-szulawski-Xj-R-Y8-PKeww-unsplash.jpg") center;
    // background-repeat: no-repeat;
    background-size: cover;
    display:flex;
    justify-content:center;
    align-items:center;
`;

const Wrapper = styled.div`
    padding:20px;
    width:40%;
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
    width:40%;
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

const AdminLogin = () => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    const {isFetching,error} = useSelector(state => state.user)
    const userObj = useSelector(state => state.user)
    // console.log(userObj)

    const dispatch = useDispatch()

    const handleClick = (e) => {
        e.preventDefault()
        // login(dispatch,{username,password})
        dispatch(userLogin({username,password}))
            .then((res) => {
                console.log(res)
            })
    }
    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input placeholder="username"
                     onChange={(e)=>setUsername(e.target.value)}
                     />
                    <Input placeholder="password"
                        onChange={(e)=>setPassword(e.target.value)}
                        type='password'/>
                    <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
                    { (error && userObj.currentUser) ? <Error>Something went wrong</Error> : "" }
                <Link>FORGOT PASSWORD?</Link>
                <Link>CREATE NEW ACCOUNT</Link>
                </Form>
          </Wrapper>
        </Container>
      )
}

export default AdminLogin




// const Login = () => {
//     const [username,setUsername] = useState('')
//     const [password,setPassword] = useState('')

//     const {isFetching,error} = useSelector(state => state.user)
//     const userObj = useSelector(state => state.user)
//     // console.log(userObj)

//     const dispatch = useDispatch()

//     const handleClick = (e) => {
//         e.preventDefault()
//         // login(dispatch,{username,password})
//         dispatch(userLogin({username,password}))
//             .then((res) => {
//                 console.log(res)
//             })
//     }
//   return (
//     <Container>
//         <Wrapper>
//             <Title>SIGN IN</Title>
//             <Form>
//                 <Input placeholder="username"
//                  onChange={(e)=>setUsername(e.target.value)}
//                  />
//                 <Input placeholder="password"
//                     onChange={(e)=>setPassword(e.target.value)}
//                     type='password'/>
//                 <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
//                 { (error && userObj.currentUser) ? <Error>Something went wrong</Error> : "" }
//             <Link>FORGOT PASSWORD?</Link>
//             <Link>CREATE NEW ACCOUNT</Link>
//             </Form>
//       </Wrapper>
//     </Container>
//   )
// }

// export default Login