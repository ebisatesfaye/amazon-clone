import React, {useEffect,useState} from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import classes from './Product.module.css'
import Loader from '../Loader/Loader'
function Product() {
    const [products,setProducts] = useState()
    const [isloading,setIsloading] = useState(false)

    useEffect(() => {
        setIsloading(true)
        axios.get('https://fakestoreapi.com/products')
        .then()
        .then((res) =>{
            setProducts(res.data)
            setIsloading(false)
        }).catch((err) => {
            console.log("err",err)
            setIsloading(false)

     
        })
    },[])

    // useEffect(() => {
    //     isloading(true)
    //     (async () => {
    //         try {
    //             const request = await   axios.get('https://fakestoreapi.com/products')
    //             setProducts(request.data);
    //             isloading(false)

    //         }catch (error){
    //             console.log("error",error);
    //             isloading(false)
    //         }
    //     })()
    // },[]);
  return (
    <>
    {
        isloading? (<Loader/>):(  <section className={classes.products_container}>
            {
                products?.map((singleProducts)=>{
                    return <ProductCard renderAdd={true} product={singleProducts} key={singleProducts.id}/>
                })
            }
        </section>)
    }
    </>
  
  )
}

export default Product
