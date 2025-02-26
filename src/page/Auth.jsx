import React, { useContext, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

import { loginAPI, registerApi } from '../../services/allApi';
import { tokenAuthContext } from '../contexts/Contextapi';




function Auth({insideRegister}) {


  const {setauthorised}=useContext(tokenAuthContext)
  const navigate=useNavigate()
  const [userdata,setuserdata]=useState({username:"",email:"",password:""})
  console.log(userdata);
  const handleRegister=async(e)=>{
    e.preventDefault()

    const{username,email,password}=userdata
    if(username&& email&& password){
       //apicall
    try{
      const result=await registerApi(userdata)
      console.log(result);
    if(result.status==200){
      navigate('/login')
      setuserdata({username:"",email:"",password:""})
    }else{
      if(result.status==406){
        alert(result.response.data)
        setuserdata({username:"",email:"",password:""})
      }
    }
      
  }catch(err){
    console.log(err);
    
  }
    }
  else{
  alert("please fill the form");
  }
}
const handleLogin=async(e)=>{
   e.preventDefault()
   if(userdata.email && userdata.password){
    //api call
    try{
      const result=await loginAPI(userdata)
      if(result.status==200){        


        sessionStorage.setItem("user",JSON.stringify(result.data.user))
        sessionStorage.setItem("token",result.data.token)
        setuserdata({username:"",email:"",password:""})
        setauthorised(true)
        navigate('/dashboard')
      }
      else{
       if(result.status==404){
        toast.error(result.response.data)
       }
        
       
      }
    }catch(err){
     console.log(err);
     
    }
   }
    else{
      toast.error("please complete the form properly")
      
    }
}
  return (
    <>
    <div className='container-fluid mt-5 ' style={{width:'1000px',height:'550px',backgroundColor:'#020035',borderRadius:'3rem'}}>
      <Row>
        <Col lg={6}>
        <div style={{minHeight:'550px'}} className='d-flex align-items-center justify-content-center'>
        <img style={{width:'500px',height:'400px'}} src="" alt="" />
        </div>
        </Col>
        <Col lg={6}>
        <div style={{minHeight:'550px'}} className='d-flex align-items-center justify-content-center flex-column'>
       <Link to={'/'} style={{textDecoration:'none'}}><div className='d-flex'>
       <i  class="fa-brands fa-firefox fa-3x"></i>
       <h1 style={{fontFamily:'"Libre Baskerville", serif'}}>Project Fair</h1>
       </div></Link>
        {
          insideRegister?
          <p>Sign Up to your account</p>
          :
          <p>Sign In to your account</p>
        }
        { insideRegister &&
          <Form.Control value={userdata.username} onChange={e=>setuserdata({...userdata,username:e.target.value})} style={{borderRadius:'1rem'}} size="lg" type="text" placeholder="User Name" />
        }
        
        <Form.Control value={userdata.email} onChange={e=>setuserdata({...userdata,email:e.target.value})} className='mt-3' style={{borderRadius:'1rem'}} size="lg" type="text" placeholder="Email Address" />
        <Form.Control value={userdata.password} onChange={e=>setuserdata({...userdata,password:e.target.value})} className='mt-3' style={{borderRadius:'1rem'}} size="lg" type="password" placeholder="Password" />
        {
          insideRegister?
          <div><Button onClick={handleRegister} className='mt-3' style={{width:'480px',borderRadius:'1rem'}} variant="warning">Sign Up</Button>
          <p>Already have an account yet? <Link to={'/login'}>Login</Link> </p></div>
          :
          <div><Button onClick={handleLogin} className='mt-3' style={{width:'480px',borderRadius:'1rem'}} variant="warning">Sign In</Button>
          <p>Don't have an account yet? <Link style={{textDecoration:'none'}} to={'/register'}>Register</Link> </p>
        
        
        </div>
        }  
        </div>

        </Col>
      </Row>
    </div>
    </>
  )
}

export default Auth