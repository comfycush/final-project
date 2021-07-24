import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import "../styles/footerSection.css";
import { setFooterSection, updateTemplate } from "../store/actions/forms";
import { useLocation } from "react-router";

function FooterSection() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [type, setType] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [iconColor, setIconColor] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [youtube, setYoutube] = useState("");
  const [companyNameColor, setCompanyNameColor] = useState("#000000");

  const stateContact = location.state;
  const templateId = 4;

  function addFooterSection() {
    const dataFooterSection = {
      type: +type,
      backgroundColor,
      iconColor,
      facebook,
      instagram,
      twitter,
      linkedin,
      youtube,
      companyNameColor,
    };

    if (
      !dataFooterSection.facebook &&
      !dataFooterSection.twitter &&
      !dataFooterSection.linkedin &&
      !dataFooterSection.instagram &&
      !dataFooterSection.youtube
    ) {
      swal("Please fill your social media link minimum 1");
    } else if (!dataFooterSection.iconColor) {
      swal("Please choose your required icon color");
    } else if (!dataFooterSection.type) {
      swal("Please choose your required template");
    } else {
      dispatch(setFooterSection(dataFooterSection));
      const newestTemplate = {
        ...stateContact,
        footer: dataFooterSection,
      };
      dispatch(updateTemplate(templateId, newestTemplate));
      history.push({
        pathname: "/finish",
        state: {
          templateId,
        },
      });
    }
  }

  return (
    <section id="footer-section">
      <h1>Footer Section</h1>
      <h3>6 of 6</h3>
      <div className="input">
        <label htmlFor="generate-color" className="generate-color-label">
          Generate Color Palatte
        </label>
        <input type="color" name="generate-color" className="generate-color" />
        <button>Refresh</button>
        <br />
        <br />
        <label htmlFor="link-facebook" className="link-facebook">
          Link Facebook
        </label>
        <input
          onChange={(event) => setFacebook(event.target.value)}
          type="text"
          name="link-facebook"
          className="link-facebook"
        />
        <br />
        <br />
        <label htmlFor="link-instagram" className="link-instagram">
          Link Instagram
        </label>
        <input
          onChange={(event) => setInstagram(event.target.value)}
          type="text"
          name="link-instagram"
          className="link-instagram"
        />
        <br />
        <br />
        <label htmlFor="link-instagram" className="link-instagram">
          Link Twitter
        </label>
        <input
          onChange={(event) => setTwitter(event.target.value)}
          type="text"
          name="link-twitter"
          className="link-twitter"
        />
        <br />
        <br />
        <label htmlFor="link-linkedin" className="link-linkedin">
          Link Linkedin
        </label>
        <input
          onChange={(event) => setLinkedin(event.target.value)}
          type="text"
          name="link-linkedin"
          className="link-linkedin"
        />
        <br />
        <br />
        <label htmlFor="link-youtube" className="link-youtube">
          Link Youtube
        </label>
        <input
          onChange={(event) => setYoutube(event.target.value)}
          type="text"
          name="link-youtube"
          className="link-youtube"
        />
        <br />
        <br />
        <label htmlFor="company-name-color" className="company-name-color">
          Company Name Color
        </label>
        <input
          onChange={(event) => setCompanyNameColor(event.target.value)}
          type="color"
          name="company-name-color"
          className="company-name-color"
        />
        <br />
        <br />
        <label htmlFor="icon-color">Social Media Icon Color</label>
        <input
          onClick={(event) => setIconColor(event.target.value)}
          defaultValue="black"
          type="radio"
          style={{ marginLeft: "1.5rem" }}
          name="black-icon"
          id="black-icon"
        />
        <label htmlFor="black-icon">Black</label>
        <input
          onClick={(event) => setIconColor(event.target.value)}
          defaultValue="white"
          type="radio"
          name="white-icon"
          id="white-icon"
        />
        <label htmlFor="white-icon">White</label>
        <br />
        <br />
        <label htmlFor="background-color-navbar">Background Color</label>
        <input
          onChange={(event) => setBackgroundColor(event.target.value)}
          type="color"
          name="background-color-navbar"
          id="background-color-navbar"
        />
        <br />
        <br />
        <label htmlFor="template-layout">Template Layout</label>
        <br />
        <br />
        <div className="selection-footer">
          <input
            onClick={(event) => setType(event.target.value)}
            defaultValue="1"
            type="radio"
            name="opt1-navbar"
            id="opt1-navbar"
          />
          <img
            className="selection-img"
            src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg"
            alt="image1"
          />
          <input
            onClick={(event) => setType(event.target.value)}
            defaultValue="2"
            type="radio"
            name="opt2-navbar"
            id="opt2-navbar"
          />
          <img
            className="selection-img"
            src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg"
            alt="image2"
          />
          <input
            onClick={(event) => setType(event.target.value)}
            defaultValue="3"
            type="radio"
            name="opt3-navbar"
            id="opt3-navbar"
          />
          <img
            className="selection-img"
            src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg"
            alt="image3"
          />
        </div>
        <br />
        <br />
        <div className="button-footer">
          <button onClick={addFooterSection}>finish</button>
        </div>
      </div>
    </section>
  );
}

export default FooterSection;
