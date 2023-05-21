import React from 'react'
import { createPortal } from 'react-dom'

function Modal({onClose,image, title, price, Status, starttime, endtime, present}) {
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

  return (
    <div className='modal' onClick={onClose}>
        <div className='layout'>
            <div className='modal-card' onClick={(e)=>{e.stopPropagation()}}>
                <h1 style={{textAlign:'center',height:'20%'}}>{title}</h1>
                <div style={{display:'flex',width:'100%',height:'80%'}}>
                    <div style={{display:'flex',width:'40%',height:'80%'}}>
                        <img src='image' style={{width:'433px', objectFit:'contain'}} />
                    </div>
                    <div style={{width:'60%',height:'80%',flexDirection:'column'}}>
                        <h2 style={{marginBottom:'20px'}}>Highest Bid : {price}</h2>
                        <h2 style={{marginBottom:'20px'}}>Current Status : {Status}</h2>
                        <h2 style={{marginBottom:'20px'}}>Time remaining : {msToTime(endtime - Date.now())} </h2>
                        <input type='number' placeholder='Enter your Bid' style={{height:'28px' , marginTop:'30%', width:'50%'}} />
                        <button className='place' onClick={onClose}>Place Bid</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Modal