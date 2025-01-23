import React, { useState,useEffect } from 'react'
import classes from './Result.module.css'
import Layout from '../../Components/Layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/endPoints'
import ProductCard from '../../Components/Product/ProductCard'
import Loader from '../../Components/Loader/Loader'
function Results() {
  const [results,setResults] = useState()
  const [isloading,setIsloading] = useState(false)

const {categoryName} = useParams()
useEffect(() => {
  setIsloading(true)
 axios.get(`${productUrl}/products/category/${categoryName}`)
  .then((res)=>{
    setResults(res.data)
    setIsloading(false)
  }).catch((err) =>{
    console.log(err)
    setIsloading(false)
  })

}, [])



  return (
   <Layout>
    <>
    {
      isloading? (<Loader/>) : (    
      <section>
        <h1 style={{padding:"30px"}}>Results</h1>
        <p style={{padding:"30px"}}>Category/{categoryName}</p>
        <hr/>
          <div className={classes.products_container}>
            {results?.map((product) => (
              <ProductCard
              key={product.id}
              product={product}
              />
            ))}
  
          </div>
       
      </section>)
    } 
    </>

   </Layout>
  )
}

export default Results
