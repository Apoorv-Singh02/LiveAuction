import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { db } from '../firebase'
import { ref, set } from 'firebase/database'

function Modal({ onClose, index, image, title, price, Status, starttime, endtime, present, highest }) {
    const [num, setNum] = useState("")
    const email = useSelector((state) => state.user.userEmail)

    function writeUserData(title, image, num, Status, starttime, endtime, email, index) {
        console.log({ num });
        set(ref(db, 'Products/' + index), {
            Title: title,
            Image: image,
            Price: num,
            Stats: Status,
            Start: starttime,
            End: endtime,
            Highest: email
        }).then((data) => {
            console.log("run");
            console.log(data)
        }).catch((err) => {
            console.log("Err");
            console.log(err)
        });
    }

    const handleSubmit = () => {
        setNum(Number(num))
        console.log(Number(num), Number(price), Number(num) > Number(price));
        if (Number(num) > Number(price)) {
            writeUserData(title, image, Number(num), Status, starttime, endtime, email, index)
            onClose()
        }
        else {
            alert("New Bid cannot be lesser than highest bid")
        }
        setNum("")
  
    }

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
                <div className='modal-card' onClick={(e) => { e.stopPropagation() }}>
                    <h1 style={{ textAlign: 'center', height: '20%' }}>{title}</h1>
                    <div style={{ display: 'flex', width: '100%', height: '80%' }}>
                        <div style={{ display: 'flex', width: '40%', height: '80%' }}>
                            <img src={image} style={{ width: '433px', objectFit: 'contain' }} />
                        </div>
                        <div style={{ width: '60%', height: '80%', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                                <h2 style={{ marginBottom: '20px' }}>Highest Bid : $ {price}</h2>
                                <h2 style={{ marginBottom: '20px' }}>Time remaining : {msToTime(endtime - Date.now())} </h2>
                                <h2 style={{ marginBottom: '20px' }}>Highest Bidder : {highest}</h2>
                            </div>
                            $ <input type='number' value={num} placeholder='Enter your Bid' style={{ height: '28px', marginTop: '20%', width: '50%' }} onChange={(e) => setNum(e.target.value)} />
                            <button className='place' onClick={handleSubmit}>Place Bid</button>
                            {email===highest && <div style={{color:'red'}}>*You are the highest bidder</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal