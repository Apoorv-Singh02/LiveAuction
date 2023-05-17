import React,{ useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

function DashBoard() {

  const navigate = useNavigate()

  const user = useSelector((state)=>state.user.user)

  useEffect(()=>{
    if(!user) {
        navigate('/login')
    }

},[user])

  return (
    <div>DashBoard</div>
  )
}

export default DashBoard