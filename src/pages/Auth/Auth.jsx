import React, { useState ,useContext } from 'react'
import classes from './Signup.module.css'
import { Link,useNavigate ,useLocation} from 'react-router-dom';
import {auth} from '../../Utility/firebase'
import { signInWithEmailAndPassword,createUserWithEmailAndPassword } from 'firebase/auth';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import { Type } from '../../Utility/action.type';
import {ClipLoader } from 'react-spinners'

function Auth() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")
  const [Loading,setLoading] = useState({
    signIn : false,
    signUp : false
  })
  const [{user},dispatch]= useContext(DataContext);
  const navigate = useNavigate()
  const navStateData = useLocation()
  console.log(navStateData)


// console.log(user)
  // console.log(password,email);
  const  authHandler = async(e) => {
    e.preventDefault();
    // console.log(e.target.name);
    if(e.target.name == "signIn"){
      setLoading({...Loading,signIn:true})
      //firebase auth
      signInWithEmailAndPassword(auth,email,password).then((userInfo)=>{
        // console.log(userInfo);
        dispatch({
          type :Type?.SET_USER,
          user : userInfo.user,
        });
        console.log(user)
        setLoading({...Loading,signIn:false})
        navigate(navStateData?.state?.redirect || "/");
      }).catch((err) =>{
        // console.log(err.message)
        setError(err.message)
        setLoading({...Loading,signIn:false})
      })
    }else{
      setLoading({...Loading,signUp:true})
      createUserWithEmailAndPassword(auth,email,password).then((userInfo) => {
        dispatch({
          type :Type?.SET_USER,
          user : userInfo.user,
        });
        // console.log(userInfo);
      setLoading({...Loading,signUp:false})
      navigate(navStateData?.state?.redirect || "/");
      }).catch((err) => {
        setError(err.message)
        setLoading({...Loading,signUp:false})
        // console.log(err.message);
      })

    }
  }

  return (
  <section className={classes.login}>
      {/* logo */}
      <Link to="/">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" alt="" />
      </Link>
  <div className={classes.login_container}>
    <h1>Sign In</h1>
    {navStateData?.state?.msg && (
      <small style={{
        padding: "5px",
        textAlign:"center",
        color:"red",
        fontWeight:"bold",
      }}>
        {navStateData?.state?.msg}
      </small>
    )

    }
    <form action="">
      <div>
        <label htmlFor="email">Email</label>
        <input value={email} onChange={(e) => {setEmail(e.target.value)}} type="email" id='email' />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" id='password' />
      </div>
     <button name='signIn' type='submit' onClick={authHandler} className={classes.login_signInButton} >
      {
        Loading.signIn ? (<ClipLoader color='#000' size={15}/>):("Sign In")
      }
       </button>
     
    </form>
    {/* agreement */}
    <p>
      By signing-in you agree to the AMAZON FAKE CLONE terms of Use & Sale.
      Please see out Privacy Notice , our Cookies Notice and our Internet Based Ads Notice.
    </p>

    <button name='signUp' type='submit' onClick={authHandler} className={classes.login_registerButton}>
    {
        Loading.signUp ? (<ClipLoader color='#000' size={15}/>):("Create Your Amazon Account")
      }</button>
    {
      error && <small style={{padding:"5px",color:"red"}}>{error}</small>
    }
  </div>
  </section>


  )
}

export default Auth
