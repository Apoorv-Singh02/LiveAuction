import React,{ useEffect } from 'react'
import { Outlet } from 'react-router'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { login,logout } from '../app/userSlice'


function User({user}) {
    const dispatch = useDispatch()
    return (
    <span className='nav-span nav-log' onClick={(user)=>{
        if(user){
            dispatch(logout())
        }
    }}>{user ? "Logout" : "Login" }
    </span>
    )
}

function Navbar() {

    const user = useSelector((state)=>state.user.user)

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
          <User user={user} />
          </Link>

      </div>
      <Outlet />
      </>
  )
}

export default Navbar