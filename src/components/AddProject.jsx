import React from "react";
import { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import uploadIcon from "../assets/upload-icon.svg";
import {toast} from "react-toastify"
import {addProjectApi} from '../services/allApi'
import {addProjectResponseContext} from "../context/ContextShare"
function AddProject() {
  const [show, setShow] = useState(false);
  // useContext() is used to access the state created inside the ContextShare
  const {addProjectResponse, setAddProjectResponse} = useContext(addProjectResponseContext)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [projectDetails, setProjectDetails] = useState({
    title:"",
    language:"",
    github:"",
    website:"",
    overview:"",
    projectImage:""
  });
  const [preview, setPreview] = useState("");
  const [token, setToken] = useState("");
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"));
    }

  },[])
  useEffect(() => {
    if(projectDetails.projectImage){
      setPreview(URL.createObjectURL(projectDetails.projectImage)); 
    }

  }, [projectDetails.projectImage])
  const handleAddProject = async (e)=>{
    e.preventDefault();
    const {title, language, github, website,overview, projectImage} = projectDetails;
    if(!title || !language || !github || !website || !overview){
      toast.error("Please fill the form completely!")
    }else{
      console.log(projectDetails);
      // we are uploading file so we need to upload as form data
      const reqBody = new FormData();
      reqBody.append("title",title);
      reqBody.append("language",language);
      reqBody.append("github",github);
      reqBody.append("website",website);
      reqBody.append("overview",overview);
      reqBody.append("projectImage",projectImage);
      // Here we are passing content-type as mutlipart/for-data
      // so we need to pass the specific request header.
      const reqHeader = {
        'Content-Type':'mutlipart/form-data',
        'Authorization':`Bearer ${token}`
      }
      const result = await addProjectApi(reqBody, reqHeader);
      if(result.status === 200){
        setAddProjectResponse(result.data);
        toast.success(`${title} uploaded successfully!!`);
       
      }else if(result.status === 409) {
        toast.error(title," Project already exist");
      }else{
        toast.error("Upload failed!")
      }
      handleClose();
      setPreview("");
    setProjectDetails({
    title:"",
    language:"",
    github:"",
    website:"",
    overview:"",
    projectImage:""

    })

    }
  } 

  return (
    <>
      <button className="btn btn-success" onClick={handleShow}>
        ADD PROJECT
      </button>
      <Modal show={show} onHide={handleClose} size={"lg"}>
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="projectImg">
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="projectImg"

                  onChange={(e)=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})}

                />
                <img src={preview?preview:uploadIcon} className="w-100" />
              </label>
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="title"
                value={projectDetails.title}
                onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})}
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Languages Used"
                value={projectDetails.language}
                onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})}

              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="GitHub Link"
                value={projectDetails.github}
                onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})}

              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Website Link"
                value={projectDetails.website}
                onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})}

              />
              <textarea
                placeholder="project overview"
                className="form-control mb-2"
                rows={4}
                value={projectDetails.overview}
                onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})}

              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAddProject}>
            Add Project
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProject;
