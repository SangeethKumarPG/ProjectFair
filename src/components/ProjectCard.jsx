import React from 'react'
import Card from 'react-bootstrap/Card';
import mediaPlayerCardImage from '../assets/media-player-photo.png'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import gitHub from '../assets/github-original.svg'
import linkIcon from '../assets/link-icon.svg'
import {BASE_URL} from '../services/baseurl';
import './CardLayout.css'
function ProjectCard({isInProjectPage, project}) {
    const isProjectPage = isInProjectPage ? true:false;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
    <Card className={`border rounded shadow ${isProjectPage? "card-container-projects": "card-container-home"}`} onClick={handleShow}>
      <Card.Img variant="top" src={`${BASE_URL}/uploads/${project?.projectImage}`} className={`p-1 ${isProjectPage? "card-container-project-image": "card-container-home-image"}`} />
      <Card.Body>
        <Card.Title className='text-dark text-center'>{project?.title}</Card.Title>
      </Card.Body>
    </Card>
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{project?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col md={6}>
                    <img src={`${BASE_URL}/uploads/${project?.projectImage}`} alt="" style={{width:"20rem"}}/>
                </Col>
                <Col md={6}>
                    <h4>Description : </h4>
                    <p>{project?.overview}</p>
                    <h4>Technologies : </h4>
                    <p>{project?.language}</p>
                </Col>
            </Row>

        </Modal.Body>
        <div className='d-flex mt-3'>
            <Link to={project?.github} target="_blank" className='ms-5 me-3'><img src={gitHub} alt="" />Github Link</Link>
            <Link to={project?.website} target="_blank"> <img src={linkIcon}/>Website</Link>

        </div>
        <hr/>
      </Modal>
    </>
  )
}

export default ProjectCard
