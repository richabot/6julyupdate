import React from 'react'
import { Link } from 'react-router-dom'

const Navbarnav = () => {
  return (
    <div className='flex gap-4' style={{display:'flex'}} >
        <Link to="/profile">Personal Information</Link>
        <Link to="/profile/account">Account Information</Link>
        <Link to="/profile/security">Security Information</Link>
        
    </div>
  )
}

export default Navbarnav