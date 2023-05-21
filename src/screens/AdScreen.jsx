import React,{ useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { db } from '../firebase'
import { ref, push, set} from "firebase/database";
import './AdScreen.css'

function AdScreen() {
  const [title,setTitle] = useState("")
  const [image,setImage] = useState("")
  const [price,setPrice] = useState("")
  const [stats,setStats] = useState("")
  const [date,setDate] = useState("")
  const [edate,setEdate] = useState("")

  const navigate = useNavigate()

  const user = useSelector((state)=>state.user.user)

  useEffect(()=>{
    if(!user) {
        navigate('/login')
    }

},[user])


  const handleSubmit = (e) => {
    e.preventDefault()
    writeData(title,image,price,stats,Date.parse(date),Date.parse(edate),"") 
    setImage("")
    setTitle("")
    setPrice("")
    setStats("")
    setDate("")
    setEdate("")
  }

  const writeData = (title,image,price,stats,start,end,highest) => {
    const postListRef = ref(db, 'Products');
    const newPostRef = push(postListRef);
    set(newPostRef, {
        Title : title,
        Image : image,
        Price : price,
        Stats : stats,
        Start : start,
        End : end,
        Highest : highest
    });
  }

  return (
    <div className='post-ad'>
      <div className='post-card'>
      <form onSubmit={handleSubmit}>
        <h2 style={{textAlign:'center', margin:'20px 0px'}}>Post An Ad</h2>
        <input value={title} type='text' placeholder='Name of the product' className='post-input' onChange={(e)=>{
          setTitle(e.target.value)
        }}/>
        <input value={image} type='text' placeholder='Image of the product' className='post-input' onChange={(e)=>{
          setImage(e.target.value)
        }}/>
        <input value={price} type='number' placeholder='Base Price' className='post-input' onChange={(e)=>{
          setPrice(e.target.value)
        }}/>
        <input value={stats} type='text' placeholder='Status' className='post-input' onChange={(e)=>{
          setStats(e.target.value)
        }}/>
        <h3 style={{fontWeight:'600',marginBottom:'5px'}}>Start Time & date:</h3>
        <input type="datetime-local" value={date} min="2022-01-01T00:00" max="2024-12-31T23:59" style={{height:'25px', width:'100%'}} onChange={(e)=>{
          setDate(e.target.value)
        }} />
        <h3 style={{fontWeight:'600', marginTop:'15px' , marginBottom:'5px'}}>End Time & date:</h3>
        <input type="datetime-local" value={edate} min="2022-01-01T00:00" max="2024-12-31T23:59" style={{height:'25px', width:'100%'}} onChange={(e)=>{
          setEdate(e.target.value)
        }} />
        <button type="submit" className='postad-btn' style={{width:'100%', backgroundColor:'blue', color:'white', fontWeight:'600', paddingTop:'15px', paddingBottom:'15px', marginTop:'35px'}}>Post</button>
      </form>
      </div>
    </div>
  )
}

export default AdScreen