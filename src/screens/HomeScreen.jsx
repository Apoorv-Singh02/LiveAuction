import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './HomeScreen.css'
import { ref, onValue } from "firebase/database";
import { db } from '../firebase';

function Card({image, title, price, Status, starttime, endtime, present}) {
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
        <div className='card'>
            <div className='card-img'>
                <img src={image} style={{width:'300px',height:'150px',borderRadius:'10%'}} />
            </div>
            <div className='card-title'>{title}</div>
            <span className='card-price'>${price}</span>
            {present && <span className='card-status'>Status: {msToTime(endtime - Date.now())} remaining</span>}
            {!present && <span className='card-status'>Status: Starts in {msToTime((starttime - Date.now()))}</span>}
        </div>
    )
}

function HomeScreen() {
    const dbRef = ref(db, 'Products');
    const [data, setData] = useState([]);
    const [odata, setOdata] = useState([])

    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        setInterval(() => {
        onValue(dbRef, (snapshot) => {
            const newData = [];
            snapshot.forEach((childSnapshot) => {
                newData.push({
                    id: childSnapshot.key,
                    value: childSnapshot.val(),
                });
            });
            setData(newData.filter((prod)=>{
                return ((prod.value.Start<=Date.now()) && (prod.value.End>=Date.now()))
            }));
            setOdata(newData.filter((prod)=>prod.value.Start>Date.now()))
            console.log(data)
        })
        }, 1000);
    }, []);

    return (
        <div className='HomePage'>
            <h1>On Going Auctions</h1>
            <div className='grid-container'>
                {data.map((prod) => (
                    <Card image={prod.value.Image} title={prod.value.Title} price={prod.value.Price} Status={prod.value.Stats} endtime={prod.value.End} starttime={prod.value.Start} present={true} />
                ))}
            </div>
            {data.length===0 && <div style={{height:'300px',display:'block'}}></div>}
            <h1>Yet To Start</h1>
            <div className='grid-container'>
                {odata.map((prod) => (
                    <Card image={prod.value.Image} title={prod.value.Title} price={prod.value.Price} Status={prod.value.Stats} endtime={prod.value.End} starttime={prod.value.Start} present={false} />
                ))}
            </div>
        </div>
    );
}

export default HomeScreen;