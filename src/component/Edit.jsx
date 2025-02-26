import React, { useContext, useEffect } from 'react'
import Button from '@mui/material/Button';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Modal from 'react-bootstrap/Modal';
import SERVER_URL from '../../services/serverurl';
import { updateprojectapi } from '../../services/allApi';
import { editResponseContext } from '../contexts/Contextapi';

function Edit({project}) {


  const {seteditResponse}=useContext(editResponseContext)

   useEffect(() => {
      handleUpdate()
    
    }, [seteditResponse])



  console.log(project);
   const [projectdetails,setprojectdetails]=useState({id: project?._id,title:project?.title,languages:project?.languages,github:project?.github,website:project?.website,overview:project?.overview,projecimg:""})
   const [imgfilestatus,setimgfilestatus]=useState(false)
     const [preview,setpreview]=useState("")

   const [show, setShow] = useState(false);
  
    const handleClose = () =>{ setShow(false);
      setprojectdetails({id: project?._id ,title:project?.title,languages:project?.languages,github:project?.github,website:project?.website,overview:project?.overview,projecimg:""})
    }
    const handleShow = () => 
      {
        setprojectdetails({id: project?._id ,title:project?.title,languages:project?.languages,github:project?.github,website:project?.website,overview:project?.overview,projecimg:""})

        
        setShow(true)};
    

     useEffect(() => {
       
        if(projectdetails.projecimg.type=="image/png" || projectdetails.projecimg.type=="image/jpg"|| projectdetails.projecimg.type=="image/jpeg" ){
          setimgfilestatus(true)
          setpreview(URL.createObjectURL(projectdetails.projecimg))
        }
        else{
          setimgfilestatus(false)
          setprojectdetails({...projectdetails,projecimg:""})
          setpreview("")
        }
    
      }, [projectdetails.projecimg])

        const handleUpdate=async()=>{

          const{id,title,languages,github,website,overview,projecimg}=projectdetails

          if(title && languages && github && website && overview ){

            const reqBody= new FormData()
            reqBody.append("title",title)
            reqBody.append("languages",languages)
            reqBody.append("github",github)
            reqBody.append("website",website)
            reqBody.append("overview",overview)
           preview? reqBody.append("projecimg",projectdetails.projecimg): reqBody.append("projecimg",project.projecimg)

           const token =sessionStorage.getItem('token')


           if(token){
            const reqHeader={
              "content-type":preview?"multipart?form-data":"application/json",
              "authorization":`Bearer ${token}`
            }

          try{
            const result= await updateprojectapi(id,reqBody,reqHeader)
            console.log(result);
            
            if(result.status==200){
              seteditResponse(result.data)
              handleClose()
            }
          }
          catch(err){
            console.log(err);
            

          }
            
           }
    

          }
          else{
            alert("please complete the form")
          }

        }


  return (
    <>
      <Button onClick={handleShow} variant="outlined"><i class="fa-solid fa-pen-to-square"></i></Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>New project details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className='row'>
          <div className='col-md-6'>
            <label><img className='w-100' src={preview?preview:`${SERVER_URL}/Uploads/${project.projecimg}`} alt="" /><input  onChange={e=>setprojectdetails({...projectdetails,projecimg:e.target.files[0]})} style={{display:'none'}} type="file" /></label>
            {
              !imgfilestatus &&
              <div><p>Upload only following file type(jpeg,jpg,png)</p></div>
            }
          </div>
          
          <div className='col-md-6'>
          <TextField  onChange={e=>setprojectdetails({...projectdetails,title:e.target.value})}
          label="Project Title"
          id="outlined-size-small"
          defaultValue=""
          size="small"
          value={projectdetails?.title}
        /> 
         
          <TextField  onChange={e=>setprojectdetails({...projectdetails,languages:e.target.value})} className='mt-2'
          label="Languages Used"
          id="outlined-size-small"
          defaultValue=""
          size="small"
          value={projectdetails?.languages}
        />
          <TextField  onChange={e=>setprojectdetails({...projectdetails,github:e.target.value})} className='mt-2'
          label="Project Github link"
          id="outlined-size-small"
          defaultValue=""
          size="small"
          value={projectdetails?.github}
        />
         <TextField  onChange={e=>setprojectdetails({...projectdetails,website:e.target.value})} className='mt-2'
          label="Project Website link"
          id="outlined-size-small"
          defaultValue=""
          size="small"
          value={projectdetails?.website}
        />
          </div>
         </div>
 <div><TextField onChange={e=>setprojectdetails({...projectdetails,overview:e.target.value})} fullWidth label="Project overview" id="fullWidth"value={projectdetails?.overview} /></div>

        </Modal.Body>
        <Modal.Footer>
          <Button className='me-2' style={{backgroundColor:'black',color:'white'}} variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdate}  style={{backgroundColor:'black',color:'white'}} variant="contained ">Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit