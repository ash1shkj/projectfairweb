import React, { useContext } from 'react'

import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { tokenAuthContext } from '../contexts/Contextapi';



function Header() {

   const {setauthorised}=useContext(tokenAuthContext)
  const navigate=useNavigate()

  const logout=()=>{
    sessionStorage.clear
   setauthorised(false )
    navigate('/')
  }
  return (
    <>
    <div style={{width:'100%',backgroundColor:'black',height:'7vh'}}>
      <div style={{display:'flex', justifyContent:'space-between'}} className='container '>
        <div className='  text-white  '>Project Fair</div>
        <div className=' text-white  '><Button onClick={logout} style={{backgroundColor:'white', color:'black'}} variant="contained">Sign in</Button></div>
      </div>
    </div>
    </>
  )
}

export default Header