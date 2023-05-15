import React from 'react'
import { Outlet } from 'react-router'
import './Navbar.css'
import { Link } from 'react-router-dom'

function Navbar() {
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
          <span className='nav-log nav-span'>
              Login
          </span>
          </Link>

      </div>
      <Outlet />
      </>
  )
}

export default Navbar