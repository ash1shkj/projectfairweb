import React, { useContext, useEffect, useState } from 'react'
import Add from './Add'
import Edit from './Edit'
import { deleteprojectapi, userprojectapi } from '../../services/allApi'
import { addresponseContext, editResponseContext } from '../contexts/Contextapi'


function View() {

  const {addResponse}=useContext(addresponseContext)
  const {editResponse}=useContext(editResponseContext)
  

  const [userproject,setuserproject]=useState([])

  useEffect(() => {
    getuserproject()
  
  }, [addResponse,editResponse])

  const getuserproject=async()=> {
    const token=sessionStorage.getItem("token")
     if(token){

      const reqHeader={
        "content-type":"application/json",
        "authorization":`Bearer ${token}`
      }

      try{
           const result=await userprojectapi(reqHeader)
                  console.log(result);
                 
                    setuserproject(result.data)
      }
      catch(err){
        console.log(err);
        

      }
    
     }
  }
  const deleteproject=async(id)=>{
    const token=sessionStorage.getItem("token")
     if(token){

      const reqHeader={
        "content-type":"application/json",
        "authorization":`Bearer ${token}`
      }

    try{
      const result=await deleteprojectapi(id,reqHeader)
     if(result.status==200){
      setuserproject(result.data)

     }

    }

      catch(err){
        
          console.log(err);
          
      }

  }
  }

  return (
   <>
   <div className='conatiner me-5 ms-5'>
     <div style={{display:'flex', justifyContent:'space-between'}}>
      <div><h1>All Projects</h1></div>
      <div><Add/></div>
     </div> <hr/><br /> 


     {
      userproject?.length>0?
      userproject?.map(projects=>(<div style={{display:'flex', justifyContent:'space-between', border:'1px solid black', padding:'10px'}}>
        <div><h3>{projects.title}</h3></div>
        <div style={{display:'flex',gap:'10px'}}>
          <div><Edit project={projects}/></div>
          <div><a href={projects?.github}><i class="fa-brands fa-github"></i></a></div>
          <div><button onClick={() => deleteproject(projects._id)} style={{border:'none', backgroundColor:'transparent'}}><i class="fa-solid fa-trash"></i></button></div>
        </div>
       </div>)):
     <div>No project</div>
     }
   </div>
   </>
  )
}

export default View