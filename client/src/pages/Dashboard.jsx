import React from 'react'
import '../styles/dashboard.css'
import { Redirect } from 'react-router-dom'

function Dashboard () {
    return (
        <section id="content">
          <h1>Welcome, {localStorage.getItem('email')}!</h1>
          <hr />
          <div className="row">
            <div className="column">
              <div className="card">
                <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png" alt="logo" />
                <h2>Project Title</h2>
                <button>View</button>
                <button>Update</button>
                <button>Delete</button>
              </div>
            </div>
            <div className="column">
              <div className="card">
                <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png" alt="logo" />
                <h2>Project Title</h2>
                <button>View</button>
                <button>Update</button>
                <button>Delete</button>
              </div>
            </div>
            <div className="column">
              <div className="card">
                <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png" alt="logo" />
                <h2>Project Title</h2>
                <button>View</button>
                <button>Update</button>
                <button>Delete</button>
              </div>
            </div>
          </div>
        </section>
    )
}

export default Dashboard