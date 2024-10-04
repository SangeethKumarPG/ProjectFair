import {React, useEffect, useState} from 'react'
import searchIcon from '../assets/search-icon.svg'
import ProjectCard from '../components/ProjectCard'
import {getAllProjects} from '../services/allApi'
import lockIcon from '../assets/lock-icon.svg'

function Project() {
  const [allProjects, setAllProjects] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [isToken, setIsToken] = useState(false); 

  const getAllProjectsFromSource = async() =>{
    console.log(searchKey);
    if(sessionStorage.getItem('token')){
      const token = sessionStorage.getItem('token');
      const reqHeader = {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}` 
      }
      const result = await getAllProjects(reqHeader, searchKey);
      console.log(result);
      setAllProjects(result.data);
    }
  }

  useEffect(() => {
    getAllProjectsFromSource();
  }, [searchKey])
  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      setIsToken(true);
    }
  },[])

  return (
    <>
      <div className="container-fluid">
        <h3 className='text-center mt-5'>All Projects</h3>
      </div>
      {isToken? (      <div> 

        <div className="row my-4">
          <div className="col-md-4">

          </div>
          <div className="col-md-4 d-flex">
            <input type="text" placeholder='Search by Technology' onChange={(e)=>setSearchKey(e.target.value)} className='form-control'/>
            <img src={searchIcon} className='ms-3'/>
          </div>
          <div className="col-md-4">

          </div>
        </div>
        <div className="container-fluid">
          <div className="row my-3">
            {allProjects?.length > 0 ? 
              allProjects.map(item=>(
                <div className="col-md-4 my-3">
                  <ProjectCard isInProjectPage={true} project={item}/>
                </div>


              )) : <p>No projects to show</p>


            }
          </div>
        </div>

      </div>):<div className="d-flex flex-column align-items-center justify-content-centre"> 
          <p className="text-center">No Projects to display please login!</p>
          <img src={lockIcon} />

        </div> }

    </>
  )
}

export default Project
