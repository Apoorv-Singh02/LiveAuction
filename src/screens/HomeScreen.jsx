import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './HomeScreen.css'
import { useNavigate } from 'react-router'
import { ref, onValue } from "firebase/database";
import { db } from '../firebase';

function Card({image, title, price, Status}) {

    return (
        <div className='card'>
            <div className='card-img'>
                <img src={image} style={{width:'300px',height:'150px',borderRadius:'10%'}} />
            </div>
            <div className='card-title'>{title}</div>
            <span className='card-price'>${price}</span>
            <span className='card-status'>Status: {Status}</span>
        </div>
    )
}

function HomeScreen() {
    const dbRef = ref(db, 'Products');
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        setTimeout(()=>{
        onValue(dbRef, (snapshot) => {
            const newData = [];
            snapshot.forEach((childSnapshot) => {
                newData.push({
                    id: childSnapshot.key,
                    value: childSnapshot.val(),
                });
            });
            console.log(Date.now())
            setData(newData.filter((prod)=>{
                console.log(prod)
                console.log(prod.value.Start<Date.now && prod.value.End>Date.now)
                return ((prod.value.Start<Date.now()) && (prod.value.End>Date.now()))
            }));
        },[1000])
        });
    }, []);

    return (
        <div className='HomePage'>
            <div className='grid-container'>
                {data.map((prod) => (
                    <Card image={prod.value.Image} title={prod.value.Title} price={prod.value.Price} Status={prod.value.Stats} />
                ))}
            </div>
        </div>
    );
}

export default HomeScreen;