import {React, useState, useEffect} from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import cover_1 from "../assets/cover-photo-1-clear.png";
import ProjectCard from "../components/ProjectCard";
import './Home.css'
import {getHomeProjects} from '../services/allApi'

function Home() {

  const [homeProject, setHomeProject]= useState([]);

  const [isLogin, setIsLogin] = useState(false);
  const getHomeProjectItems = async ()=>{ 
    const result = await getHomeProjects();
    //console.log(result);
    setHomeProject(result.data);
  }
  useEffect(() => {
    if(sessionStorage.getItem("token")){
      setIsLogin(true);
    }
    getHomeProjectItems();
  }, [])

  return (
    <>
      <div
        className="container-fluid bg-body-tertiary p-4 mb-4"
        style={{ width: "100%", height: "65vh" }}
      >
        <Row>
          <Col
            md={6}
            className="d-dlex justify-content-center align-items-center flex-column mt-5"
          >
            <div className="ms-5">
              <h3 className="text-dark">Project Fair</h3>
              <h6 className="text-dark">
                One stop destination for many web projects{" "}
              </h6>
            </div>
            {
              isLogin? (
                <Link to="/dashboard">
                  <button className="btn btn-outline-dark my-2 ms-5">
                    Manage Projects →
                  </button>
                </Link>

              ):(
                  <Link to="/register">
                    <button className="btn btn-outline-dark my-2 ms-5">
                      Get Started →
                    </button>
                  </Link>

                )
            }
          </Col>
          <Col
            md={6}
            className="d-flex align-items-center justify-content-center flex-column"
          >
            <img src={cover_1} width={"55%"} className="me-5" />
          </Col>
        </Row>
      </div>
      <div className="container-fluid bg-body-tertiary">
        <h2 className="text-center mt-2 text-dark">Explore our Projects</h2>

        <div className="container">
          <div className="row scroll-container">
            {homeProject.length > 0 ? homeProject.map(item=>(
               <div className="col-md-4 justify-content-center d-flex p-2">
              <ProjectCard project={item}/>
            </div>


            )):<p>No Project Found</p>}


          </div>
        </div>

        <Link
          to="/project"
          className="text-primary"
          style={{ textDecoration: "none" }}
        >
          <h5 className="text-center">See more projects</h5>
        </Link>
      </div>
    </>
  );
}

export default Home;
