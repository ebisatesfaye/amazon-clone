import React,{useContext} from 'react'
import classes from './Header.module.css';
import {Link} from 'react-router-dom'
import { SlLocationPin } from 'react-icons/sl';
import { BsSearch } from 'react-icons/bs';
import { BiCart } from 'react-icons/bi';
import LowerHeader from './LowerHeader';
import { DataContext } from '../DataProvider/DataProvider';
import { auth } from '../../Utility/firebase';

function Header() {
    const [{user,basket},dispatch] = useContext(DataContext)
    const totalItem = basket?.reduce((amount,item) =>{
        return item.amount + amount
    },0)
    return (
        <section className={classes.fixed}>
            <section >
                <div className={classes.header_container}>
                    <div className={classes.logo_container}>
                        <Link to="/">
                            <img src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png" alt="amazon logo" />
                        </Link>

                        {/* delivery */}
                        <div className={classes.delivery}>
                            <span>
                                <SlLocationPin />
                            </span>
                            <div>
                                <p>Delivered to</p>
                                <span>Ethiopia</span>
                            </div>
                        </div>

                    </div>

                    <div className={classes.search}>
                        <select name="" id="">
                            <option value="">All</option>
                        </select>
                        <input type="text" id='' placeholder='search products' />
                        <BsSearch size={25} />
                    </div>
                    {/* right side link  */}
                    <div className={classes.order_container}>
                        <Link to='#' className={classes.language}>
                            <img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" alt="" />
                            <select>
                                <option value="">EN</option>
                            </select>
                        </Link>
                        <Link to={!user && "/auth"}>
                        <div>
                            {
                                user?(
                                    <>
                                       <p>Hello {user?.email?.split("@")[0]}</p>
                                       <span onClick={()=>auth.signOut()}>Sign Out</span>
                                    </>
                                 
                                ):
                                (
                                    <>
                                    <p>Hello , Sign In</p>
                                    <span>Account & Lists</span>
                                    </>
                                )
                            }

                        </div>
                               
                        </Link>
                        <Link to="/orders">
                            <p>returns</p>
                            <span>& Orders</span>
                        </Link>
                        <Link to="/cart" className={classes.cart}>
                            <BiCart size={35}/>
                            <span>{totalItem}</span>
                        </Link>
                    </div>

                </div>
            </section>
            <LowerHeader/>
        </section>
    )
}
export default Header;