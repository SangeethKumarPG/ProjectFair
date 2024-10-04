import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

function App() {
  return <>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Auth/>}/>
      <Route path="/register" element={<Auth register={"register"}/> }/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/project" element={<Project/>}/>
    </Routes>
    <Footer/>
    <ToastContainer autoClose={2000}/>
    
  </>;
}

export default App;
