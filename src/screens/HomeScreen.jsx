import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './HomeScreen.css'
import { ref, onValue } from "firebase/database";
import { db } from '../firebase';
import Card from './Card';


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
                setData(newData.filter((prod) => {
                    return ((prod.value.Start <= Date.now()) && (prod.value.End >= Date.now()))
                }));
                setOdata(newData.filter((prod) => prod.value.Start > Date.now()))
               })
        }, 1000);
    }, []);

    return (
        <div className='HomePage'>
            <h1>On Going Auctions</h1>
            <div className='grid-container'>
                {data.map((prod) => (
                    <Card index={prod.id} image={prod.value.Image} title={prod.value.Title} price={prod.value.Price} Status={prod.value.Stats} endtime={prod.value.End} starttime={prod.value.Start} present={true} highest={prod.value.Highest} />
                ))}
            </div>
            {data.length === 0 && <div style={{ height: '300px', display: 'block' }}></div>}
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