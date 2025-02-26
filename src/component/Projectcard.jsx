import React from 'react'

import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SERVER_URL from '../../services/serverurl';



function Projectcard({displaydata}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   
  return (
    <>
 
      
    <Card onClick={handleShow} style={{ width: '18rem' }}>
      <Card.Img style={{width:'150px', height:'150px'}} variant="top" src={`${SERVER_URL}/Uploads/${displaydata?.projecimg}`} />
      <Card.Body>
        <Card.Title  style={{fontFamily:'Yatra One'}}>{displaydata?.title}</Card.Title>
        
        
      </Card.Body>
    </Card>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
      <Modal.Title  style={{fontFamily:'Yatra One'}}></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container>
      <Row>
        <Col><center><img style={{width:'300px', height:'300px'}} src={`${SERVER_URL}/Uploads/${displaydata?.projecimg}`} alt="" /></center></Col>
        <Col><h1 style={{fontFamily:'Yatra One'}}>{displaydata?.title}</h1> <p  style={{fontFamily:'Yatra One'}}>
          <h5>Languages:{displaydata?.languages}</h5>
          <h5>overview:{displaydata?.overview}</h5></p></Col>
      </Row>
      </Container>
        </Modal.Body>
    
        <Modal.Footer>
         <a href={displaydata?.github}>
            <Button variant="secondary">
            <i class="fa-brands fa-github"></i>
            </Button>
         </a>
          <Button variant="primary"><i class="fa-solid fa-link"></i></Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Projectcard