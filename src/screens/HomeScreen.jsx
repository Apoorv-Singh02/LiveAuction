import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './HomeScreen.css'
import { ref, onValue } from "firebase/database";
import { db } from '../firebase';

function Card({image, title, price, Status, starttime, endtime, present}) {

    return (
        <div className='card'>
            <div className='card-img'>
                <img src={image} style={{width:'300px',height:'150px',borderRadius:'10%'}} />
            </div>
            <div className='card-title'>{title}</div>
            <span className='card-price'>${price}</span>
            {present && <span className='card-status'>Status: {Math.floor((endtime - Date.now())/1000)} seconds remaining</span>}
            {!present && <span className='card-status'>Status: To be started at{Math.floor(starttime/1000)}</span>}
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