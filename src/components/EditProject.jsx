import React, { useState, useEffect, useContext } from "react";
import editIcon from "../assets/edit-icon.svg";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import uploadIcon from '../assets/upload-icon.svg'
import {BASE_URL} from '../services/baseurl'
import {toast} from 'react-toastify';
import {editUserProjects} from '../services/allApi'
import {editProjectResponseContext} from '../context/ContextShare'

function EditProject({project}) {
  const {editProjectResponse, seteditProjectResponse} = useContext(editProjectResponseContext)
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState("");
  const [projectDetails, setProjectDetails] = useState({
    id:project._id,
    title:project.title,
    language:project.language,
    github:project.github,
    website:project.website,
    overview:project.overview,
    projectImage:""

  })
  const handleClose1 = async () => {
    handleClose()
    setProjectDetails({
      id:project._id,
      title:project.title,
      language:project.language,
      github:project.github,
      website:project.website,
      overview:project.overview,
      projectImage:""

    })
    setPreview("")
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleUpdate = async(e)=>{
    e.preventDefault();
    //console.log(projectDetails); 
    const {title, language, github, website,overview, projectImage, id} = projectDetails;
    if(!title || !language || !github || !website || !overview || !id){
      toast.error("Please fill the form completely!")
    }else{
      const reqBody = new FormData();
      reqBody.append("title",title);
      reqBody.append("language",language);
      reqBody.append("github",github);
      reqBody.append("website",website);
      reqBody.append("overview",overview);
      preview?reqBody.append("projectImage",projectImage):
        reqBody.append("projectImage",project.projectImage);

      if (preview){
        const token = sessionStorage.getItem("token");

        const reqHeader = {
          'Content-Type':'mutlipart/form-data',
          'Authorization':`Bearer ${token}`
        }
        const result = await editUserProjects(projectDetails.id, reqBody, reqHeader)
        console.log(result);
        if(result.status === 200){
          handleClose()
          seteditProjectResponse(result);
        }
      }else{
        const token = sessionStorage.getItem("token");

        const reqHeader = {
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        }
        const result = await editUserProjects(projectDetails.id, reqBody, reqHeader)
        console.log(result);
        if(result.status === 200){
          handleClose()
          seteditProjectResponse(result);
        }

      }

    }

  }
  useEffect(() => {
    if(projectDetails.projectImage){
      setPreview(URL.createObjectURL(projectDetails.projectImage));
    } 


  }, [projectDetails.projectImage])

  return (
    <>
      <img src={editIcon} onClick={handleShow}/>
      <Modal show={show} onHide={handleClose} size={"lg"}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="projectImg">
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="projectImg"
                  onChange={(e)=>{setProjectDetails({...projectDetails, projectImage:e.target.files[0]})}}
                />
                <img src={preview ? preview : `${BASE_URL}/uploads/${project?.projectImage}`} className="w-100" />
              </label>
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="title"
                value={projectDetails?.title}
                onChange={(e)=>setProjectDetails({...projectDetails, title:e.target.value})}
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Languages Used"
                value={projectDetails?.language}
                onChange={(e)=>setProjectDetails({...projectDetails, language:e.target.value})}
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="GitHub Link"
                value={projectDetails?.github}
                onChange={(e=>setProjectDetails({...projectDetails, github:e.target.value}))}
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Website Link"
                value={projectDetails?.website}
                onChange={(e)=>setProjectDetails({...projectDetails, website:e.target.value})}
              />
              <textarea
                placeholder="project overview"
                className="form-control mb-2"
                rows={4}
                value={projectDetails?.overview}
                onChange={(e)=> setProjectDetails({...projectDetails, overview:e.target.value})}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Update Project
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProject;
