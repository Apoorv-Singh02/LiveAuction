import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './LoginScreen.css'
import { login,logout } from '../app/userSlice'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router'

function LoginScreen() {
  const navigate = useNavigate()
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const user = useSelector((state)=>state.user.user)

  const dispatch = useDispatch()

  const handleSignIn = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log(userCredential)
    dispatch(login(userCredential.user))
  })
  .catch((error) => {
    console.log(error)
  });
    setEmail("")
    setPassword("")
  }

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log(userCredential)
    dispatch(login(userCredential.user))
  })
  .catch((error) => {
    console.log(error)
  });
  setEmail("")
  setPassword("")
  }
  
  useEffect(()=>{
    if(user) {
      navigate('/')
    }
  },[user])

  return (
    <div className='full-screen'>
      <div className='login-card'>
        <h1 style={{textAlign:'center'}}>Login</h1>
        <form onSubmit={handleSignIn} >
          <input value={email} type="email" placeholder='Email Address' className='login-input' onChange={(e)=>{
            setEmail(e.target.value)
          }}/>
          <input value={password} type="password" placeholder='Password' className='login-input' onChange={(e)=>{
            setPassword(e.target.value)
          }}/>
          <button type='submit' className='login-btn'>Sign In</button>
        </form>
        <h3>New to this platform, <span className='login-span' onClick={handleSignUp}>Sign Up</span></h3>
      </div>
    </div>
  )
}

export default LoginScreen