import React, { useState } from "react";
import swal from "sweetalert";
import "../styles/introSection.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setProjectTitle } from "../store/actions/forms";
import { createTemplate } from "../store/actions/forms";

function IntroSection() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [proTitle, setProTitle] = useState("");

  function addProjectTitle(event) {
    if (proTitle) {
      dispatch(setProjectTitle(proTitle));
      event.preventDefault();
      history.push("/navbar-section");
    } else {
      swal("Please fill in your project title");
    }
    dispatch(setProjectTitle(proTitle));
    const newTemplate = {
      userId: 2,
      isDeploy: false,
      projectTitle: proTitle,
      navbar: {},
      main: {},
      about: {},
      service: {},
      contact: {},
      footer: {},
    };
    dispatch(createTemplate(newTemplate));
    event.preventDefault();
    history.push({
      pathname: "/navbar-section",
      state: {
        userId: 2,
        isDeploy: false,
        projectTitle: proTitle,
      },
    });
  }

  return (
    <section id="intro-section">
      <h1>Let's Build Your Website</h1>
      <div className="intro-input">
        <label htmlFor="project-title">Project Title</label>
        <input
          required
          onChange={(event) => setProTitle(event.target.value)}
          style={{ marginLeft: "1rem" }}
          type="text"
          name="project-title"
          id="project-title"
        />
      </div>
      <br />
      <br />
      <button onClick={addProjectTitle} className="button-navbar">
        next
      </button>
    </section>
  );
}

export default IntroSection;
