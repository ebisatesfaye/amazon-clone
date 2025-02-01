import React from 'react'
import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import Landing from "./pages/Landing/Landing"
import SighIn from "./pages/Auth/Auth"
import Payment from './pages/Payment/Payment'
import Orders from './pages/orders/Orders'
import Cart from './pages/Cart/Cart'
import Results from './pages/Results/Results'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import {Elements } from '@stripe/react-stripe-js'
import {loadStripe } from "@stripe/stripe-js"
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"

const stripePromise = loadStripe('pk_test_51QllitGaz1kA0RSbn1kmpRyR6ZQi4RAfmrWG1Rkhzpi0kOTK8dFrx7Kpo9jv4UOkLcFmose14aIXA8o0nozvpJyD00YGA6lt6X');

function Routering() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='/auth' element={<SighIn/>}/>
          <Route path='/payments' element={
            <ProtectedRoute 
            msg={"you must log in to pay"}
            redirect={"/payments"}>
              <Elements stripe={stripePromise}>
            <Payment/>
              </Elements> 
            </ProtectedRoute>
            
              }/>
          <Route path='/orders' element={
            // <ProtectedRoute 
            //   msg={"you must log in to access your orders"}
            //   redirect={"/orders"}>
              <Orders/>
            // {/* </ProtectedRoute> */}
      }/>
          <Route path='/category/:categoryName' element={<Results/>} />
          <Route path='/products/:productId' element={<ProductDetail/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
    </Router>
  )
}

export default Routering
