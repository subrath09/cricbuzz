import { getAuth, signOut } from '@firebase/auth'
import React from 'react'
import app from '../firebase'
import { useNavigate } from 'react-router'

function Dashboard() {
  const auth = getAuth(app)

  const navigate = useNavigate()
  return (
    <div>Dashboard


      <button className='bg-red-500 p-4 text-white rounded-full ' onClick={()=>{
        signOut(auth)
        navigate('/')
      }}>Logout</button>
    </div>
  )
}

export default Dashboard