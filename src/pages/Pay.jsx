import React, { useState,useEffect } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import {loadStripe} from '@stripe/stripe-js'

const KEY = "pk_test_51IyD83SAAbSbcDjO7DhMravrBUQt8fkZAKhnmtCrqE1vS2OTvVFxZvjViyw0Jnj6K9QWyoqcwes0N6cHqvzsFfHX00A9HEGkVk"
const Pay = () => {
    const [stripeToken,setStripeToken] = useState(null)
    const [stripePromise,setstripePromise] = useState(null)
    const [clientSecret,setClientsecret] = useState("")

    // const onToken = (token) => {
    //     setStripeToken(token)
    // }

console.log(stripeToken)

    useEffect(() => {
      fetch('http://localhost:5000/api/checkout/config').then(async(r)=>{
        const {publishableKey} = await r.json()
        console.log(publishableKey)
        setstripePromise(loadStripe(publishableKey))
      })
    },[])

    useEffect(() => {
      const mkreq = async() => {
        try {
          const response = await axios.post('http://localhost:5000/api/checkout/create-payment-intent')
          const {clientSecret} = response.data
          console.log(clientSecret)
          setClientsecret(clientSecret)
        } catch (error) {
          console.log(error)
        }
      }
      mkreq()
    },[])

    // useEffect(()=>{
    //     const makeReq = async() => {
    //         try {
    //           const res =  await axios.post("http://localhost:5000/api/checkout/payment", 
    //           {
    //             tokenId:stripeToken.id,
    //             amount:2000,
    //           },
    //           {
    //             headers:{
    //                 Authorization: 'Bearer sk_test_51IyD83SAAbSbcDjO9LRXeSCcc0QI9ctgV1EH0wDFbSnE30IG58KZIeXd3Vk2obOYkkwjQfMj7h8W1GhqfyrALBgT00f2QwSiNS'
    //             }
    //           }
    //         );
    //           console.log(res.data)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     stripeToken && makeReq()
    // },[stripeToken])

  return (
    <div style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }}>
    <StripeCheckout name="RSHOP."
        image='https://avatars.githubusercontent.com/u/1486366?v=4'
        billingAddress
        shippingAddress
        description='Your total is $20'
        amount={2000} 
        stripeKey={KEY}
    >
        <button style={{
            border: "none",
            width: 120,
            borderRadius: 5,
            padding: "20px",
            backgroundColor: "black",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
        }}>
            Pay Now
        </button>
    </StripeCheckout>
    </div>
  )
}

export default Pay