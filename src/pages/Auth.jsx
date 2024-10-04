import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import logoDark from "/projectfairlogo.svg";
import {registerApi, loginApi} from "../services/allApi"
import {toast} from "react-toastify"

function Auth({ register }) {
  const registerForm = register ? true : false;
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username:"",
    email:"",
    password:""
  })
  const handleRegister =async (e)=>{
    e.preventDefault();
    const {username, email, password} = userData;
    if(!username || !email || !password){
      //alert("Please fill the form completely.")
      toast.warning("Please fill the form completely!!")
    }else{
      //alert(`${username}, ${email}, ${password}`);
      const result = await registerApi(userData);
      if(result.data == 'Account created successfully!'&& result.status==200){
        toast.success(`Account for ${username} Created Succesfully!`)
        //navigate to loginpage after successful registration
        navigate("/login");
      }else{
        toast.error(result?.response?.data)
      }
    }

  }

  const handleLogin = async(e)=>{
    e.preventDefault();
    const {email, password} = userData;
    if(!email || !password){
      toast.warning("Please enter username and password")
    }else{
      const result = await loginApi(userData);
      console.log("Login result : ",result);
      if(result.status === 200){
        sessionStorage.setItem("loggedUser",JSON.stringify(result.data.data));
        sessionStorage.setItem("token",result.data.token);
        toast.success("Login Success!");
        navigate("/")
      }else if(result.status == 401 ){
        toast.error("Invalid email or password");
      }else{
        toast.error("Something went wrong")
      }
    }
    setUserData({
      username:"",
      email:"",
      password:""
    })
  }
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <div className="container w-75">
          <h5>
            <Link to={"/"}
              style={{
                textDecoration: "none",
                fontWeight: "bolder",
                color: "black",
              }}
            >
              BACK TO HOME →
            </Link>
          </h5>
          <div>
            <Row>
              <Col md={6}>
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/013/159/013/small_2x/flat-business-technology-cloud-computing-service-and-file-upload-backup-on-cloud-server-storage-with-web-login-security-user-concept-outline-design-style-minimal-illustration-vector.jpg"
                  alt=""
                  style={{ width: "33rem", height:"30rem" }}
                />
              </Col>
              <Col md={6} className="bg-primary p-3 rounded shadow">
                <form>
                  <h5 className="d-flex align-items-center justify-content-center">
                    <img src={logoDark} /> Project Fair
                  </h5>
                  {registerForm ? (
                    <>
                      <h6 className="text-center">Signup</h6>
                      <input type="text" className="form-control rounded" placeholder="Name"
                        value={userData.username}
                        onChange={(e)=>setUserData({...userData,username:e.target.value})} />

                    </>
                  ) : (
                      <>
                        <h6 className="text-center">Login</h6>
                      </>
                    )}
                  <div className="mt-3 mb-3">
                    <input type="text" className="form-control rounded" placeholder="Email" onChange={(e)=>setUserData({...userData,email:e.target.value})}
                      value={userData.email}/>
                  </div>
                  <div className="mt-3 mb-3">
                    <input type="password" className="form-control rounded" placeholder="Password" onChange={(e)=>setUserData({...userData,password:e.target.value})} value={userData.password}
                    />
                  </div>
                  {registerForm ? 
                    <div>
                      <button className="btn btn-success form-control" type="button" onClick={handleRegister}>Register</button>
                      <p className="text-center">Already a user? click here to <Link className="ms-2" to="/login" style={{textDecoration:"none"}}>login</Link></p>
                    </div>
                    :
                    <div>
                      <button className="btn btn-success form-control" type="button" onClick={handleLogin}>Login</button>
                      <p className="text-center">Not registered yet? click here to <Link className="ms-2" to="/register" style={{textDecoration:"none"}} type="button">register</Link></p>
                    </div>

                  }
                </form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;
