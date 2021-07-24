import React from 'react'

function Sidebar () {
    return (
        <div className="l-navbar" id="navbar">
          <nav className="nav">
            <div>
              <div className="nav_brand">
                <ion-icon name="menu-outline" className="nav_toggle" id="nav-toggle" />
                <a href="#" className="nav_logo">Webber</a>
              </div>
              <div className="nav_list">
                <a href="#" className="nav_link">
                  <ion-icon name="home-outline" className="nav_icon" />
                  <span className="nav_name">Home</span>
                </a>
                <a href="#" className="nav_link">
                  <ion-icon name="add-circle-outline" className="nav_icon" />
                  <span className="nav_name">Create Website</span>
                </a>
                <a href="#" className="nav_link">
                  <ion-icon name="call-outline" className="nav_icon" />
                  <span className="nav_name">Contact Assistant</span>
                </a> 
              </div>
            </div>
            <a href="#" className="nav_link">
              <ion-icon name="log-out-outline" className="nav_icon" />
              <span className="nav_name">Log Out</span>
            </a>
          </nav>
        </div>
    )
}

export default Sidebar