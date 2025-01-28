import React , {useContext} from 'react'
import classes from './Payment.module.css'
import Layout from '../../Components/Layout/Layout'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import  ProductCard from '../../Components/Product/ProductCard'
function Payment() {
  const [{user, basket}] = useContext(DataContext);
  const totalItem = basket?.reduce((amount,item) =>{
    return item.amount + amount
},0)
console.log(user)
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
            basket?.map((item)=> <ProductCard product={item} flex={true}/>)
          }
        </div>
      </div>
      <hr />
      <div>
        <div>
          <div>
            <form action="">
              
            </form>
          </div>
        </div>
      </div>
    </section>

  </Layout>
  )
}

export default Payment
