import React,{ useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { login,logout,addEmail } from '../app/userSlice'
import { onAuthStateChanged,signOut } from 'firebase/auth'
import { auth } from '../firebase'


function User() {
    const user = useSelector((state)=>state.user.user)
    return (
    <span className='nav-span nav-log' onClick={()=>{
        if(user){
            signOut(auth)
        }
    }}>{user ? "Logout" : "Login" }
    </span>
    )
}

function Navbar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        onAuthStateChanged(auth, (User)=>{
            if(User){
                dispatch(login(User))
                dispatch(addEmail(User.email))
                navigate('/')
            }
            else {
                dispatch(logout())
                navigate('/login')
            }
        })
    },[])


  return (
    <><div className='nav'>
          <div className='nav-left'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5xrFjseFrUChD7oOjdR9A9zrciLX_wkws7A&usqp=CAU" className='nav-img'/>
            <span className='nav-span'>
                LiveAuction
            </span>
            
            <Link to="/">
            <span className='nav-btn nav-span'>
                Home
            </span>
            </Link>
            
            <Link to="/DashBoard">
            <span className='nav-btn nav-span'>
                Dashboard
            </span>
            </Link>
            <Link to="/PostAd">
            <span className='nav-btn nav-span'>
                Post Ad
            </span>
            </Link>
          </div>
          <Link to="/Login">
          <User />
          </Link>

      </div>
      <Outlet />
      </>
  )
}

export default Navbar