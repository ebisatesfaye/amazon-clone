import React from 'react'
import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import Landing from "./pages/Landing/Landing"
import SighIn from "./pages/Auth/Signup"
import Payment from './pages/Payment/Payment'
import Orders from './pages/orders/Orders'
import Cart from './pages/Cart/Cart'
import Results from './pages/Results/Results'
import ProductDetail from './pages/ProductDetail/ProductDetail'
function Routering() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='/auth' element={<SighIn/>}/>
          <Route path='/payments' element={<Payment/>}/>
          <Route path='/orders' element={<Orders/>}/>
          <Route path='/category/:categoryName' element={<Results/>} />
          <Route path='/products/:productId' element={<ProductDetail/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
    </Router>
  )
}

export default Routering
