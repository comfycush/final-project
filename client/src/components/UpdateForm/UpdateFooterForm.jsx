import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import "../../styles/footerSection.css";
import { setFooterSection, updateTemplate } from "../../store/actions/forms";
import { useLocation } from "react-router";

export default function UpdateFooterForm({ data, allData }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [type, setType] = useState(data.type);
  const [backgroundColor, setBackgroundColor] = useState(data.backgroundColor);
  const [iconColor, setIconColor] = useState(data.iconColor);
  const [facebook, setFacebook] = useState(data.facebook);
  const [instagram, setInstagram] = useState(data.instagram);
  const [twitter, setTwitter] = useState(data.twitter);
  const [linkedin, setLinkedin] = useState(data.linkedin);
  const [youtube, setYoutube] = useState(data.youtube);
  const [companyNameColor, setCompanyNameColor] = useState(
    data.companyNameColor
  );

  function updateFooterSection() {
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
      const updatedTemplate = {
        isDeploy: allData.isDeploy,
        projectTitle: allData.projectTitle,
        userId: allData.userId,
        main: allData.main,
        about: allData.about,
        service: allData.service,
        contact: allData.contact,
        footer: dataFooterSection,
        navbar: allData.navbar,
      };
      dispatch(updateTemplate(allData.id, updatedTemplate));
      // console.log(templateId, updatedTemplate, "<<< update");
      if (allData.isDeploy) {
        history.push(`/deploy/${allData.navbar.companyName}/${allData.id}`);
      } else {
        history.push({
          pathname: `/finish/${allData.id}`,
          state: {
            templateId: allData.id,
          },
        });
      }
    }
  }

  return (
    <section id="footer-section">
      <h1>Footer Section</h1>
      <h3>6 of 6</h3>
      <div className="input">
        <label htmlFor="generate-color" className="generate-color-label">
          Generate Color Palette
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
          value={facebook}
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
          value={instagram}
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
          value={twitter}
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
          value={linkedin}
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
          value={youtube}
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
          value={companyNameColor}
        />
        <br />
        <br />
        <label htmlFor="icon-color">Social Media Icon Color</label>
        <input
          onClick={(event) => setIconColor(event.target.value)}
          defaultValue="black"
          type="radio"
          style={{ marginLeft: "1.5rem" }}
          name="icon-color"
          id="black-icon"
          defaultChecked={iconColor === "black" ? true : false}
        />
        <label htmlFor="black-icon">Black</label>
        <input
          onClick={(event) => setIconColor(event.target.value)}
          defaultValue="white"
          type="radio"
          name="icon-color"
          id="white-icon"
          defaultChecked={iconColor === "white" ? true : false}
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
          value={backgroundColor}
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
            name="opt-navbar"
            id="opt1-navbar"
            defaultChecked={type === 1 ? true : false}
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
            name="opt-navbar"
            id="opt2-navbar"
            defaultChecked={type === 2 ? true : false}
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
            name="opt-navbar"
            id="opt3-navbar"
            defaultChecked={type === 3 ? true : false}
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
          <button onClick={updateFooterSection}>Update Section</button>
        </div>
      </div>
    </section>
  );
}
