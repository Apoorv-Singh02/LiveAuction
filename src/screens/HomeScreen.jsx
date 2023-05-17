import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './HomeScreen.css'
import { useNavigate } from 'react-router'

function Card({image, title, price, status}) {

    return (
        <div className='card'>
            <div className='card-img'>
                {image}
            </div>
            <div className='card-title'>{title}</div>
            <span className='card-price'>${price}</span>
            <span className='card-status'>Status: {status}</span>
        </div>
    )
}

function HomeScreen() {
    const [data,setData] = useState([])
    const navigate = useNavigate()

    const user = useSelector((state)=>state.user.user)
    useEffect(()=>{
        if(!user) {
            navigate('/login')
        }
    },[user])
  return (
    <div className='HomePage'>
        <div class="grid-container">
            Hello, Welcome
        </div>
    </div>
  )
}

export default HomeScreen