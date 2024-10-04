import React from 'react'
import MyProject from '../components/MyProject'
import Profile from '../components/Profile'

function Dashboard() {
  const userData = JSON.parse(sessionStorage.getItem('loggedUser'));

  return (
    <>
      <div className="container-fluid">
        <h4>Welcome <span className='ms-1 mt-5 text-warning'>{userData?.username}</span></h4>
        <div className="row">
          <div className="col-md-8">
            {/* bind MyProject */}
            <MyProject/>
          </div>
          <div className="col-md-4">
            <Profile/>
          </div>
        </div>
      </div>

    </>
  )
}

export default Dashboard
