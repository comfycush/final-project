import React, { useState } from "react";
import swal from "sweetalert";
import "../styles/introSection.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setProjectTitle } from "../store/actions/forms";
import { createTemplate } from "../store/actions/forms";
import { setToNavbar } from "../store/actions/navigationGuard";

function IntroSection() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [proTitle, setProTitle] = useState("");

  function addProjectTitle(event) {
    dispatch(setProjectTitle(proTitle));
    const newTemplate = {
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
    dispatch(setToNavbar(true));
    if (proTitle) {
      dispatch(setProjectTitle(proTitle));
      event.preventDefault();
      history.push("/navbar-section");
    } else {
      swal("Please fill in your project title");
    }
  }

  return (
    <section id="intro-section">
      <h1>Let's Build Your Website!</h1>
      <div className="intro-input">
        <div className="form-center">
          <label htmlFor="project-title" style={{ fontSize: "2rem" }}>
            Project Title
          </label>
          <input
            required
            onChange={(event) => setProTitle(event.target.value)}
            style={{ marginLeft: "1rem" }}
            type="text"
            name="project-title"
            id="project-title"
            style={{ height: "2.5rem", borderColor: "#125D98" }}
          />
        </div>
      </div>
      <br />
      <br />
      <button onClick={addProjectTitle} className="btn btn-intro">
        Next
      </button>
    </section>
  );
}

export default IntroSection;
