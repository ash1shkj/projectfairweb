import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import TextField from '@mui/material/TextField';
import { Password } from '@mui/icons-material';
import SERVER_URL from '../../services/serverurl';
import { updateprofileapi } from '../../services/allApi';





function Profile() {
  const [userDetails,setuserDetails]=useState({username:"",email:"",password:"",github:"",website:"",profilepic:""})

  const[preview,setpreview]=useState("")
  const [existingImage,setexistingImage]=useState("")
  const [open, setOpen] = useState(false); 

  useEffect(() => {
   if(sessionStorage.getItem("user")){
    let existinguser=JSON.parse(sessionStorage.getItem("user"))
    console.log(existinguser);
    
    setuserDetails({...userDetails,username:existinguser?.username,email:existinguser?.email,password:existinguser?.password,github:existinguser?.github,website:existinguser?.website})
    setexistingImage(existinguser?.profilepic)
   }
  }, [open])

  useEffect(() => {
    if(userDetails?.profilepic){
      setpreview(URL.createObjectURL(userDetails.profilepic))
    }

    else{
      setpreview("")
    }
  }, [userDetails.profilepic])
  


const handleUpdate=async()=>{
  const {username,email,password,github,website,profilepic}=userDetails

  if(github&&website){

    const reqBody=new FormData()
    reqBody.append("username",username)
    reqBody.append("email",email)
    reqBody.append("password",password)

    reqBody.append("github",github)
    reqBody.append("website",website)
   preview? reqBody.append("profilepic",profilepic): reqBody.append("profilepic",existingImage)

        const token =sessionStorage.getItem('token')
   
   
              if(token){
               const reqHeader={
                 "content-type":preview?"multipart?form-data":"application/json",
                 "authorization":`Bearer ${token}`
               }
   
             try{

                const result= await updateprofileapi(reqBody,reqHeader)
                console.log(result);
                if(result.status==200){
                  setOpen(!open)
                  sessionStorage.setItem("user",JSON.stringify(result.data))

                }

              
             }
             catch(err){
               console.log(err);
               
   
             }
               
              }

  }
  else{
    alert("enter the field completly")
  }
}


  

  return (
   <div >
      <div className='row' ><div className='col-6'>Profile</div>
      <div className='col-6'> <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
         click
         </Button>  </div>
         <Collapse in={open}>
        <div id="example-collapse-text">
         <div><center><label><input onChange={(e)=>setuserDetails({...userDetails,profilepic:e.target.files[0]})}  style={{display:'none'}} type="file" />
         {
          existingImage?
          <img style={{width:'100px',height:'100px'}}  src={preview?preview:`${SERVER_URL}/Uploads/${existingImage}`} alt="" />:
          <img className='w-100' src={preview?preview:`https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png`} alt="" />
         }
          
         </label></center></div><br />
<center>
           <TextField onChange={(e)=>setuserDetails({...userDetails,github:e.target.value})} id="outlined-basic" value={userDetails?.github} label="gitHub Link" variant="outlined" /> 
           <TextField onChange={(e)=>setuserDetails({...userDetails,website:e.target.value})} className='mt-2' id="outlined-basic"  value={userDetails?.website} label="Linkedin link " variant="outlined" />
           <div><Button onClick={handleUpdate}>update</Button></div>
</center>
        </div>
      </Collapse>
    
       </div>
      


   </div>
  )
}

export default Profile