import React, {useState,useEffect,useContext} from 'react'
import classes from './Orders.module.css'
import Layout from '../../Components/Layout/Layout'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import ProductCard from '../../Components/Product/ProductCard';
import { db } from '../../Utility/firebase';

function Orders() {
  const [{user},dispatch] = useContext(DataContext);
  const [orders,setOrders] = useState([]);

  useEffect(() => {
    if(user) {
      console.log("welcome to the orders page here you will be able to see your orders")
      // db.collection("user").doc(user.uid).collection("orders").orderBy("created","desc").onSnapshot((snapshot)=>{
      //   console.log(snapshot);
      //   setOrders(
      //     snapshot.docs.map((doc) =>({
      //       id:doc.id,
      //       data:doc.data(),
      //     }))
      //   );
      // });
    }else{
      console.log("no user")
      // setOrders([]);
    }
  },[])
  return (
<Layout>
    <section className={classes.container}>
      <h2>hi</h2>
      {/* <div className={classes.orders_container}>
        <h2>Your Orders</h2>
        {orders?.length == 0 && <div style={{padding:"20px"}}>you don't have orders yet.</div>}
        <div>
          {orders?.map((eachOrder,i) => {
            return (
              <div>
                <hr />
                <p>Order ID:{eachOrder?.id}</p>
                {eachOrder?.data?.basket?.map((order) => {
                  <ProductCard flex={true} product={order} key={order.id}/>
                })}
              </div>
            )
          })}
        </div>
      </div> */}
    </section>
</Layout>
  )
}
export default Orders
