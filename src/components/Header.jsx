import {React,useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "/projectfairlogo.svg"
import {Link, useNavigate} from "react-router-dom"
import {toast} from "react-toastify";
import logout from "/logout-icon.svg"
function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()
  const handleLogout = ()=>{
    if(sessionStorage.getItem('token')){
      sessionStorage.removeItem('token');
      sessionStorage.removeItem("loggedUser");
      setIsLoggedIn(false)
      toast.success("Logout Success!!");
      navigate("/")
    }else{
      navigate("login/")
    }
  }
  const checkUserCredentials = ()=>{
    const token = sessionStorage.getItem('token');
    setIsLoggedIn(!!token);
  }
  useEffect(() => {
  
   checkUserCredentials();
   const unlisten = ((navigate)=>{
    checkUserCredentials();
   })
   return ()=>{
    unlisten();
   }
}, [navigate]);
  
  return (
    <>
      <Navbar className="bg-primary">
        <Container>
          
          <Navbar.Brand href="#home">
          <Link to="/" style={{textDecoration:"none", color:"white"}}>
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Project Fair</Link>
          </Navbar.Brand>
          <button className="btn btn-warning" onClick={handleLogout}><img src={logout}/>{" "}{isLoggedIn? 'Logout': 'Login'}</button>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
