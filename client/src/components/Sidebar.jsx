import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useState } from "react";
import { getReplyChatbot } from "../store/actions/forms";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Sidebar({ isOpen, setIsOpen }) {
  const history = useHistory();
  const msgReplyChatbot = useSelector((state) => state.forms.msgReplyChatbot);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    console.log(msgReplyChatbot);
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(msgReplyChatbot.message);
    // utter.text = message
    synth.speak(utter);
  }, [msgReplyChatbot]);

  function logout() {
    localStorage.clear();
    history.push("/");
  }

  // function clickSidebar () {

  // }

  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    window.mozSpeechRecognition ||
    window.msSpeechRecognition)();
  recognition.continuous = false;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  function talkToChatbot() {
    recognition.start();
  }

  recognition.onresult = (e) => {
    const textListen = e.results[0][0].transcript.trim();
    console.log(textListen);
    dispatch(getReplyChatbot(textListen));
  };

  return (
    <div
      className={isOpen ? "l-navbar expander" : "l-navbar"}
      id="navbar"
      // onClick={() => setIsOpen(isOpen ? false : true)}
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
            <p className="nav_logo">
              web<span style={{ color: "#F5A962" }}>ber</span>
            </p>
          </div>
          <div className="nav_list">
            <Link to="/dashboard" className="nav_link">
              <i className="nav_icon">
                <ion-icon name="home-outline" />
              </i>
              <span className="nav_name">Home</span>
            </Link>
            <Link
              to="/intro-section"
              // onClick={() => history.push("/intro-section")}
              className="nav_link"
            >
              <i className="nav_icon">
                <ion-icon name="add-circle-outline" />
              </i>
              <span className="nav_name">Create Website</span>
            </Link>
            {location.pathname !== "/update-template" && (
              <Link className="nav_link" onClick={talkToChatbot}>
                <i className="nav_icon">
                  <ion-icon name="call-outline" />
                </i>
                <span className="nav_name">Contact Assistant</span>
              </Link>
            )}
          </div>
        </div>
        <Link onClick={logout} className="nav_link">
          <i className="nav_icon">
            <ion-icon name="log-out-outline" />
          </i>
          <span className="nav_name">Log Out</span>
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
