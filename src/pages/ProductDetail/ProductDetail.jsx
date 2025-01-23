import React, { useEffect, useState } from 'react'
import classes from './Product.module.css'
import Layout from '../../Components/Layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { productUrl } from '../../Api/endPoints';
import ProductCard from '../../Components/Product/ProductCard';
import Loader from '../../Components/Loader/Loader';
function ProductDetail() {
  const {productId} = useParams();
  const [product,setProduct] = useState({});
  const [isLoading,setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    axios.get(`${productUrl}/products/${productId}`)
    .then((res) => {
      console.log(res.data)
     setProduct(res.data)
     setIsLoading(false)
    }).catch((err) => {
      console.log(err)
      setIsLoading(false)
    })
  },[])
  // console.log(`${productUrl}/${productId}`)
  return (
   <Layout>
    {isLoading? (<Loader/>) : (   <ProductCard 
    product={product}
    />)}
 
   </Layout>
  )
}

export default ProductDetail
