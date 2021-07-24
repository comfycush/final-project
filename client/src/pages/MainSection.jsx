import React, { useState } from "react";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setMainSection, updateTemplate } from "../store/actions/forms";
import "../styles/mainSection.css";
import { getImageUrl } from "../store/actions/uploadImage";
import { useLocation } from "react-router";

function MainSection() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [headline, setHeadline] = useState("");
  const [headlineColor, setHeadlineColor] = useState("#000000");
  // const [image, setImage] = useState('')
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [subHeadline, setSubHeadline] = useState("");
  const [subHeadlineColor, setsubHeadlineColor] = useState("#000000");
  const [type, setType] = useState(null);
  const mainImageUrl = useSelector((state) => state.uploadImage.mainImageUrl);

  const stateNavbar = location.state;
  const templateId = 3;

  function addMainSection(event) {
    event.preventDefault();
    const dataMainSection = {
      type: +type,
      image: mainImageUrl,
      headline,
      headlineColor,
      subHeadline,
      subHeadlineColor,
      backgroundColor,
    };

    if (!dataMainSection.headline) {
      swal("Please fill your headline");
    } else if (!dataMainSection.image) {
      swal("Please fill your image");
    } else if (!dataMainSection.type) {
      swal("Please choose your require template");
    } else {
      dispatch(setMainSection(dataMainSection));
      const newestTemplate = {
        ...stateNavbar,
        main: dataMainSection,
        about: {},
        service: {},
        contact: {},
        footer: {},
      };
      dispatch(updateTemplate(templateId, newestTemplate));
      history.push({
        pathname: "/about-section",
        state: {
          ...stateNavbar,
          main: dataMainSection,
        },
      });
    }
  }

  function skipMainSection(event) {
    event.preventDefault();
    const dataMainSection = {
      type: null,
      image: null,
      headline: null,
      headlineColor: null,
      subHeadline: null,
      subHeadlineColor: null,
      backgroundColor: null,
    };

    dispatch(setMainSection(dataMainSection));
    history.push("/about-section");
  }

  function uploadMainImage(file, code) {
    dispatch(getImageUrl(file, code));
  }

  return (
    <section id="main-section">
      <h1>Main Section</h1>
      <h3>2 of 6</h3>
      <div className="input">
        <label htmlFor="generate-color" className="generate-color-label">
          Generate Color Palatte
        </label>
        <input type="color" name="generate-color" className="generate-color" />
        <button>Refresh</button>
        <br />
        <br />
        <label htmlFor="main-headline" className="main-headline">
          Headline
        </label>
        <input
          onChange={(event) => setHeadline(event.target.value)}
          type="text"
          name="main-headline"
          className="main-headline"
        />
        <label htmlFor="main-headline" className="main-headline">
          Color
        </label>
        <input
          onChange={(event) => setHeadlineColor(event.target.value)}
          type="color"
          name="main-headline"
          className="main-headline"
        />
        <br />
        <br />
        <label htmlFor="main-subheadline" className="main-subheadline">
          Subheadline
        </label>
        <input
          onChange={(event) => setSubHeadline(event.target.value)}
          type="text"
          name="main-subheadline"
          className="main-subheadline"
        />
        <label htmlFor="main-subheadline" className="main-subheadline">
          Color
        </label>
        <input
          onChange={(event) => setsubHeadlineColor(event.target.value)}
          type="color"
          name="main-subheadline"
          className="main-subheadline"
        />
        <br />
        <br />
        <label htmlFor="company-background" className="company-background">
          Image
        </label>
        <input
          onChange={(event) => uploadMainImage(event.target.files[0], "main")}
          type="file"
          name="company-background"
          className="company-background"
        />
        {mainImageUrl && (
          <img
            style={{ width: "10rem", height: "10rem", objectFit: "cover" }}
            src={mainImageUrl}
            alt="about"
          />
        )}
        <br />
        <br />
        <label htmlFor="background-color-main">Background Color</label>
        <input
          onChange={(event) => setBackgroundColor(event.target.value)}
          type="color"
          name="background-color-mainb"
          id="background-color-main"
        />
        <br />
        <br />
        <label htmlFor="template-layout">Template Layout</label>
        <br />
        <br />
        <div className="selection-main">
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
        <div className="button-main">
          <button onClick={skipMainSection}>skip</button>
          <button onClick={addMainSection}>next</button>
        </div>
      </div>
    </section>
  );
}

export default MainSection;
