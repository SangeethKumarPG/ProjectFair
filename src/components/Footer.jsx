import React from "react";
import { Link } from "react-router-dom";
import facebookLogo from "/facebook-oval-light.svg";
import twitterLogo from "/twitter-original.svg";
import instagramLogo from "/instagram-original.svg";
import reddit from "/reddit.svg";
import projectFairLogo from "/projectfairlogo.svg"

function Footer() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <div className="footer d-flex align-items-center justify-content-evenly">
          <div style={{ width: "25rem" }}>
            <h5>
              <img src={projectFairLogo}/> Project Fair
            </h5>
            <p style={{ textAlign: "justify" }}>
              Thank you for visiting our site. We are dedicated to providing you
              with the best experience possible. If you have any questions or
              feedback, please feel free to reach out to us. Stay connected for
              updates and new features as we continue to enhance our services.
              Your satisfaction is our priority.
            </p>
          </div>
          <div className="d-flex flex-column ms-3">
            <h4>Links</h4>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Home
            </Link>
            <Link to="/dashboard" style={{ textDecoration: "none", color: "white" }}>
              Dashboard
            </Link>
            <Link
              to="/project"
              style={{ textDecoration: "none", color: "white" }}
            >
              Projects
            </Link>
          </div>
          <div className="d-flex flex-column ms-3">
            <h4>Guides</h4>
            <Link
              to="https://react.dev/"
              style={{ textDecoration: "none", color: "white" }}
              target="_blank"
            >
              React
            </Link>
            <Link
              to="https://react-bootstrap.netlify.app/"
              style={{ textDecoration: "none", color: "white" }}
              target="_blank"
            >
              React Bootstrap
            </Link>
            <Link
              to="https://www.npmjs.com/package/json-server"
              style={{ textDecoration: "none", color: "white" }}
              target="_blank"
            >
              JSON Server
            </Link>
          </div>
          <div className="ms-5">
            <h4>Contact us</h4>
            <div className="d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your emailid"
              />
              <button className="btn btn-warning ms-2">Subscribe</button>
            </div>
            <div className="d-flex justify-content-evenly mt-3">
              <Link style={{ textDecoration: "none", color: "white" }}>
                <img src={twitterLogo} />
              </Link>
              <Link style={{ textDecoration: "none", color: "white" }}>
                <img src={instagramLogo} />
              </Link>
              <Link style={{ textDecoration: "none", color: "white" }}>
                <img src={facebookLogo} />
              </Link>
              <Link style={{ textDecoration: "none", color: "white" }}>
                <img src={reddit} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
