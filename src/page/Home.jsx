import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';

import Projectcard from '../component/Projectcard';
import { Link, useNavigate } from 'react-router-dom';

import {Homeprojectapi} from '../../services/allApi';




function Home() {
  const [homeprojects,sethomeprojects]=useState([])
useEffect(() => {
  getHomeprojetcs()
}, [])

const navigate=useNavigate()


const getHomeprojetcs=async()=>{
  try{
    const result = await Homeprojectapi()
    console.log(result);
    if(result.status==200){
      sethomeprojects(result.data)
    }
    
  }
  catch(err){
    console.log(err);
    
  }
}
const handleprojects=()=>{
  if(sessionStorage.getItem("token")){
    navigate('/project')
  }
  else{
    alert("please Log in")
  }
}

  return (
    <>
    <div className='row container mt-5'>
        <div className='col-md-6 mt-5  flex-column align-items-center justify-content-center'>
            <div className='ms-4 mt-5'>
                <h1  style={{fontFamily:'Yatra One'}}> Project Fair</h1>
                <p  style={{fontFamily:'Yatra One'}}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio dolorum error pariatur et est minus ipsa? Vitae, quaerat eum et inventore ducimus libero ea recusandae, deleniti sit dicta dolore voluptatem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum reprehenderit placeat, esse est aperiam quas quidem ab vel, ad veniam nihil. At corrupti officia repudiandae voluptatibus dolore natus fugit saepe?</p>
                <Link to={'/register'}><Button style={{backgroundColor:'black'}} variant="contained" >Start To explore</Button></Link>
                
            </div>
        </div>
            <div className='col-md-6'>
               <div > <img  src="https://img.freepik.com/premium-vector/black-white-drawing-stack-cubes_1209112-912.jpg" alt="" /></div>
            </div>
    </div>
    <div className='mt-4'>
       <center> <h1 style={{fontFamily:'Yatra One'}}>Explore Our Projects</h1></center>
       <marquee behavior="" direction="">
        <div className='d-flex'>

    { 
    homeprojects?.length>0 ?
    homeprojects?.map(projects=>( <div className='me-5'><Projectcard displaydata={projects}/></div>))
     
      :
      <div>
        <h1>Project Not Fpund</h1>
      </div>
    }


        </div>
        
       </marquee>
       <center><Link onClick={handleprojects} style={{fontFamily:'Yatra One',textDecoration:'none'}} to={'/project'}> View More projects</Link></center>
    </div>
    <div className='mt-4'>
        <center> <h1 style={{fontFamily:'Yatra One'}}>Our Textmonials</h1></center>

    </div>
    </>
  )
}

export default Home