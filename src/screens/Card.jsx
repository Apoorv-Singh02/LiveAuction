import React, { useState } from 'react'
import Modal from './Modal';
import { useSelector } from 'react-redux';

function Card({index, image, title, price, Status, starttime, endtime, present, highest}) {
    const email = useSelector((state) => state.user.userEmail)
    function msToTime(ms) {
        let seconds = (ms / 1000).toFixed(0);
        let minutes = (ms / (1000 * 60)).toFixed(0);
        let hours = (ms / (1000 * 60 * 60)).toFixed(0);
        let days = (ms / (1000 * 60 * 60 * 24)).toFixed(0);
        if (seconds < 60) return seconds + " Sec";
        else if (minutes < 60) return minutes + " Min";
        else if (hours < 24) return hours + " Hrs";
        else return days + " Days"
      }
      
      const [showmodal, setShowmodal] = useState(false)

    return (
        <div className='card'>
            {showmodal && <Modal onClose={()=>{setShowmodal(false)}} index={index} image={image} title={title} price={price} Status={Status} starttime={starttime} endtime={endtime} present={present} highest={highest} />}
            <div className='card-img'>
                <img src={image} style={{width:'300px',height:'150px',borderRadius:'10%'}} />
            </div>
            <div className='card-title'>{title}</div>
            <span className='card-price'>${price}</span>
            {present && <span className='card-status'>Status: {msToTime(endtime - Date.now())} remaining</span>}
            {!present && <span className='card-status'>Status: Starts in {msToTime((starttime - Date.now()))}</span>}
            {present && <button className='place' onClick={()=>{setShowmodal(true)}}>Place Bid</button>}
            {email===highest && <span style={{color:'red'}}>*You are the highest bidder</span>}
        </div>
    )
}

export default Card