import React, { useState } from 'react'
import './HomeScreen.css'

function Card({image, title, price, status}) {
    return (
        <div className='card'>
            <div className='card-img'>
                <img src={image} style={{width:'300px',height:'150px',borderRadius:'5%'}}/>
            </div>
            <div className='card-title'>{title}</div>
            <span className='card-price'>${price}</span>
            <span className='card-status'>Status: {status}</span>
        </div>
    )
}

function HomeScreen() {
    const [data,setData] = useState([])
  return (
    <div className='HomePage'>
        <div class="grid-container">
            
        </div>
    </div>
  )
}

export default HomeScreen