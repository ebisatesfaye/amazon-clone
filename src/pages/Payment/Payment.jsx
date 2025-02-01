import React , {useContext, useState} from 'react'
import classes from './Payment.module.css'
import Layout from '../../Components/Layout/Layout'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import  ProductCard from '../../Components/Product/ProductCard'
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { Card } from '@mui/material';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat'
import {axiosinstance} from '../../Api/axios';
import {ClipLoader } from 'react-spinners';
import {db} from '../../Utility/firebase';
import {useNavigate} from 'react-router-dom';
import { Type } from '../../Utility/action.type'



function Payment() {
  const [{user, basket},dispatch] = useContext(DataContext);
  const total = basket?.reduce((amount,item)=>{
    return item.price * item.amount + amount 
  },0)

  const totalItem = basket?.reduce((amount,item) =>{
    return item.amount + amount
},0);

const stripe = useStripe();
const elements = useElements();
const navigate = useNavigate();

const [processing,setProcessing] = useState(false);
const [cardError,setCardError] = useState(null);


const handlechange = (e) => {
  // console.log(e);
  e?.error?.message? setCardError( e?.error?.message) : setCardError(" ")
}

const handlePayment = async (e) => {
  e.preventDefault();

  try {
    setProcessing(true);
    const response = await axiosinstance({
      method: "POST",
      url:`/payment/create?total=${total}`,
    });
    // console.log(response.data)
    const clientSecret = response.data?.clientSecret;

    const {paymentIntent}= await stripe.confirmCardPayment(
      clientSecret,{
        payment_method : {
          card : elements.getElement(CardElement),
        }
      });
console.log(paymentIntent);
console.log(user)
      // await db.collection("users").doc(user.uid)
      // .collection("orders").doc(paymentIntent.id)
      // .set({
      //   basket: basket,
      //   amount: paymentIntent.amount,
      //   created:paymentIntent.created,
      // })
      // empty the basket 
      dispatch({type:Type.EMPTY_BASKET})
      // console.log(paymentIntent)  
      setProcessing(false);
      navigate("/orders" ,{state:{msg:"You have placed new orders"}})
  } catch (error) {
    console.log(error);
    setProcessing(false);
  }
}
// console.log(user)
  return (
  <Layout>
    
    <div className={classes.payment_header}>Checkout ({totalItem}) items.</div>
    <section className={classes.payment}>
      <div className={classes.flex}>
        <h3>Delivery address</h3>
        <div>
        <div>{user?.email}</div>
        <div>asfjao safjao</div>
        <div>ajfoj fj0pruj</div>
        </div>
      </div>
      <hr />
      <div className={classes.flex}>
        <h3>Review items and delivery</h3>
        <div>
          {
            basket?.map((item,index)=> <ProductCard product={item} flex={true} key={index}/>)
          }
        </div>
      </div>
      <hr />
      <div className={classes.flex}>
        <h3>Payment methods</h3>
        <div className={classes.payment_card_container}>
          <div className={classes.payment_details}>
            <form action="" onSubmit={handlePayment}>
              {cardError &&  (
                <small style={{color:"red"}}>{cardError}</small>)}
              <CardElement onChange={handlechange}/>

              {/* price */}
              <div className={classes.payment_price}>
                <div><span style={{display:"flex",gap:"10px"}}> <p>Total Order |</p>  <CurrencyFormat amount={total}/></span></div>
                <button type="submit">
                  {
                    processing? (
                      <div className={classes.loading}>
                        <ClipLoader color='gray' size={12}/>
                        <p>Please Wait ...</p>
                      </div>
                    ):("Pay Now")
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

  </Layout>
  )
}

export default Payment
