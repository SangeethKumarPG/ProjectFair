import React from "react";
import angleUp from "../assets/angle-up.svg";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import angleDown from "../assets/angle-down.svg";
import personIcon from "../assets/person-icon.svg";

function Profile() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="shadow p-4">
        <div className="d-flex">
          <h5>Profile</h5>
          <button
            className="ms-auto btn btn-primary"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
          >
            {open? <img src={angleUp} /> : <img src={angleDown}/>}
          </button>
        </div>
        <Collapse in={open}>
          <div>
            <div className="d-flex align-items-center justify-content-center">
              <label htmlFor="profileImg">
                <input type="file" name="" id="profileImg" style={{display:"none"}}/>
                <img src={personIcon}/>
              </label>
            </div>
            <div>
              <input type="text" placeholder="GitHub Link"  className="form-control mb-3 mt-3"/>
              <input type="text" placeholder="LinkedIn Profile Link"  className="form-control mb-3 mt-3"/>
              <button className="btn btn-info form-control">UPDATE</button>
            </div>
          </div>
        </Collapse>
      </div>
    </>
  );
}

export default Profile;
