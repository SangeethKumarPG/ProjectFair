import {React, useEffect, useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import gitIcon from '../assets/github-original.svg'
import AddProject from './AddProject'
import trashIcon from '../assets/trash-icon.svg'
import editIcon from '../assets/edit-icon.svg'
import EditProject from './EditProject'
import {getUserProjects, deleteUserProject} from '../services/allApi'
import {addProjectResponseContext} from '../context/ContextShare'
import linkIcon from '../assets/link-icon.svg'
import {editProjectResponseContext} from '../context/ContextShare'

function MyProject() {
  const {editProjectResponse, seteditProjectResponse} = useContext(editProjectResponseContext)
  const [userProjects, setUserProjects] = useState([]);
  const {addProjectResponse, setAddProjectResponse} = useContext(addProjectResponseContext);
  const getUserProjectsFromSource = async()=>{
    const token = sessionStorage.getItem("token");
    const reqHeader = {
      'Content-Type' : "application/json",
      'Authorization' : `Bearer ${token}`
    }
    const result = await getUserProjects(reqHeader);
    //console.log(result);
    setUserProjects(result.data);
  }
  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("token");
    //console.log("Id",id)
    const reqHeader = {
      'Content-Type' : "application/json",
      'Authorization' : `Bearer ${token}` 
    }
    const result = await deleteUserProject(id, reqHeader); 
    //console.log(result);
    getUserProjectsFromSource();
  }
  useEffect(() => {
    getUserProjectsFromSource()
  }, [addProjectResponse, editProjectResponse])
  
  return (
    <>
        <div className='shadow p-5 mb-5'>
            <div className='d-flex mt-2'>
                <h5 className='text-warning me-auto'>My Projects</h5>
                {/* add project component */}
                <AddProject/>
            </div>
            {
               userProjects?.length > 0 ? 
                userProjects.map(item=>(
                      <div className='p-3 mt-2 rounded-2 d-flex bg-secondary'>
                <h5 className='text-dark'>{item?.title}</h5>
                <div className='d-flex ms-auto align-items-center text-dark'>
                {/* <Link className='me-3'><img src={editIcon}/></Link> */}
                <EditProject project={item}/>
                 <Link className='ms-3' to={item?.website} target="_blank"><img src={linkIcon}/></Link>
                <Link className='ms-3 me-3' to={item?.github} target="_blank"><img src={gitIcon} alt=""/></Link>
                <button type="button" style={{border:"0", backgroundColor:"white", cursor:"pointer"}}
                  onClick={()=>handleDelete(item._id)}
                  ><img src={trashIcon}/></button>
            </div>
            </div>

                )):<p>No Projects to display</p>
            }
                        
        </div>
    
    </>
  )
}

export default MyProject
