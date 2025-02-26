import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Projectcard from '../component/Projectcard';
import { allprojectapi } from '../../services/allApi';



function Project() {

  const [Searchkey,setSearchkey]=useState("")
  const [allprojects,setallprojects]=useState([])

useEffect(() => {
  getAllprojects()
}, [Searchkey])
  

   const getAllprojects=async()=>{


    const token=sessionStorage.getItem("token")
     if(token){

      const reqHeader={
        "content-type":"application/json",
        "authorization":`Bearer ${token}`
      }
      try{
          
        const result=await allprojectapi(Searchkey,reqHeader)
        console.log(result);
       
          setallprojects(result.data)
        
        
          }
          catch(err){
            console.log(err);
            
          }
     }

    
      

    }

  return (
    <>
        <div className='container mt-5'>
          <div className='  row '>
            <div className='col-sm-6'>
              <h1>All projects</h1>
            </div>
            <div  className='col-sm-6'> 
            <TextField onChange={(e)=>setSearchkey(e.target.value)} id="outlined-search" label="Search products" type="search" />
  
            </div>
          </div >
         <div className='row'>
            { 
      allprojects?.length>0 ?
      allprojects?.map(projects=>( <div  className='col-3 me-5 '><Projectcard displaydata={projects}/></div>))
       
        :
        <div>
          <h1>Project Not Fpund</h1>
        </div>
      }
  
         </div>
        </div>
    </>  
    )
}

export default Project