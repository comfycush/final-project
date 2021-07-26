import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";

function Sidebar({ isOpen, setIsOpen }) {
  const history = useHistory();

  function logout() {
    localStorage.clear();
    history.push("/");
  }

  // function clickSidebar () {

  // }

  return (
    <div
      className={isOpen ? "l-navbar expander" : "l-navbar"}
      id="navbar"
      onClick={() => setIsOpen(isOpen ? false : true)}
    >
      <nav className="nav">
        <div>
          <div className="nav_brand">
            <i
              id="nav-toggle"
              className="nav_toggle"
              onClick={() => setIsOpen(isOpen ? false : true)}
            >
              <ion-icon name="menu-outline"></ion-icon>
            </i>
            <p className="nav_logo">webber</p>
          </div>
          <div className="nav_list">
            <a onClick={() => history.push("/dashboard")} className="nav_link">
              <i className="nav_icon">
                <ion-icon name="home-outline" />
              </i>
              <span className="nav_name">Home</span>
            </a>
            <a
              onClick={() => history.push("/intro-section")}
              className="nav_link"
            >
              <i className="nav_icon">
                <ion-icon name="add-circle-outline" />
              </i>
              <span className="nav_name">Create Website</span>
            </a>
            <a href="#" className="nav_link">
              <i className="nav_icon">
                <ion-icon name="call-outline" />
              </i>
              <span className="nav_name">Contact Assistant</span>
            </a>
          </div>
        </div>
        <a onClick={logout} className="nav_link">
          <i className="nav_icon">
            <ion-icon name="log-out-outline" />
          </i>
          <span className="nav_name">Log Out</span>
        </a>
      </nav>
    </div>
  );
}

export default Sidebar;
