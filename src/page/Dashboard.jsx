import React, { useState } from 'react'
import Header from '../component/Header'
import Profile from '../component/Profile'
import View from '../component/View'
import { useEffect } from 'react'

function Dashboard() {
  const [username,setusername]=useState("")
  useEffect(()=>{
    if(sessionStorage.getItem("user")){
      setusername(JSON.parse(sessionStorage.getItem("user")).username)

    }
    else{
      setusername("")
    }
  },[])
  return (
<>   <Header/>

    <div className='container mt-5 '>
        <div className='row '>
          <div className='col-8'>
            <h1>Welcome {username}</h1>
            <div>
              <View/>
            </div>
  
  
          </div>
          <div className='col-4'>
            <h1><Profile/> </h1>
            
          </div>
           
        </div>
  
    </div>


</>
   


  )
}

export default Dashboard