import React, { useContext } from 'react'
import Button from '@mui/material/Button';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import {addApi} from '../../services/allApi'
import { addresponseContext } from '../contexts/Contextapi';


function Add() {


  const {setaddResponse}=useContext(addresponseContext)

  const [projectdetails,setprojectdetails]=useState({title:"",languages:"",github:"",website:"",overview:"",projecimg:""})
  console.log(projectdetails);
  const [imgfilestatus,setimgfilestatus]=useState(false)
  const [preview,setpreview]=useState("")
  
  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false);
    setprojectdetails({title:"",languages:"",github:"",website:"",overview:"",projecimg:""})
  }
  const handleShow = () => setShow(true);

  useEffect(() => {
   
    if(projectdetails.projecimg.type=="image/png" || projectdetails.projecimg.type=="image/jpg"|| projectdetails.projecimg.type=="image/jpeg" ){
      setimgfilestatus(true)
      setpreview(URL.createObjectURL(projectdetails.projecimg))
    }
    else{
      setimgfilestatus(false)
      setprojectdetails({...projectdetails,projecimg:""})
      setpreview("https://www.svgrepo.com/show/309453/collections-add.svg")
    }

  }, [projectdetails.projecimg])

  const handleAddproject=async ()=>{
    const {title,languages,github,website,overview,projecimg}=projectdetails

    if(title && languages && github && website && overview && projecimg){

      
        const reqBody= new FormData();
        reqBody.append("title",title)
        reqBody.append("languages",languages)
        reqBody.append("github",github)
        reqBody.append("website",website)
        reqBody.append("overview",overview)
        reqBody.append("projecimg",projecimg)

        //request header

        const token = sessionStorage.getItem("token")
        console.log(token);
        
        if(token){
          const reqHeader={
            "content-type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
          }

        //apicall
      try{
        const result=await addApi(reqBody,reqHeader)
        console.log(result);
        if(result.status==200){
          setaddResponse(result.data)
          alert("project added succesfully")
          handleClose()
        }
        else{
          alert(result.response.data)
        }
        
      }

      catch(err){
        console.log(err);
        
      }

        }


    }
    else{
      alert("enter the form completely")
    }
  }
  
  return (
    <div><Button onClick={handleShow} variant="contained">+ new Projects</Button>
    
    
    
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
            <label><img className='w-100' src={preview} alt="" /><input  onChange={e=>setprojectdetails({...projectdetails,projecimg:e.target.files[0]})} style={{display:'none'}} type="file" /></label>
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
        /> 
         
          <TextField  onChange={e=>setprojectdetails({...projectdetails,languages:e.target.value})} className='mt-2'
          label="Languages Used"
          id="outlined-size-small"
          defaultValue=""
          size="small"
        />
          <TextField  onChange={e=>setprojectdetails({...projectdetails,github:e.target.value})} className='mt-2'
          label="Project Github link"
          id="outlined-size-small"
          defaultValue=""
          size="small"
        />
         <TextField  onChange={e=>setprojectdetails({...projectdetails,website:e.target.value})} className='mt-2'
          label="Project Website link"
          id="outlined-size-small"
          defaultValue=""
          size="small"
        />
          </div>
         </div>
 <div><TextField onChange={e=>setprojectdetails({...projectdetails,overview:e.target.value})} fullWidth label="Project overview" id="fullWidth" /></div>

        </Modal.Body>
        <Modal.Footer>
          <Button className='me-2' style={{backgroundColor:'black',color:'white'}} variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAddproject} style={{backgroundColor:'black',color:'white'}} variant="contained ">Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Add