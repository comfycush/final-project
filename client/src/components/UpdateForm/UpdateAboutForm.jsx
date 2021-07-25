import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import "../../styles/aboutSection.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setAboutSection, updateTemplate } from "../../store/actions/forms";
import { getImageUrl, setAboutImageUrl } from "../../store/actions/uploadImage";
import { useLocation } from "react-router";

export default function UpdateAboutForm({ data, allData }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [type, setType] = useState(data.type);
  const [headline, setHeadline] = useState(data.headline);
  const [headlineColor, setHeadlineColor] = useState(data.headlineColor);
  // const [image, setImage] = useState("");
  const [backgroundColor, setBackgroundColor] = useState(data.backgroundColor);
  const [paragraph, setParagraph] = useState(data.paragraph);
  const [paragraphColor, setParagraphColor] = useState(data.paragraphColor);

  const aboutImageUrl = useSelector((state) => state.uploadImage.aboutImageUrl);

  useEffect(() => {
    dispatch(setAboutImageUrl(data.image));
  }, []);

  console.log(aboutImageUrl, "<<< about url");

  function updateAboutSection(event) {
    event.preventDefault();
    const dataAboutSection = {
      type: +type,
      headline,
      headlineColor,
      image: aboutImageUrl,
      backgroundColor,
      paragraph,
      paragraphColor,
    };

    if (!dataAboutSection.headline) {
      swal("Please fill your headline");
    } else if (!dataAboutSection.paragraph) {
      swal("Please fill your paragraph");
    } else if (!dataAboutSection.image) {
      swal("Please fill your image");
    } else if (!dataAboutSection.type) {
      swal("Please choose your required template");
    } else {
      dispatch(setAboutSection(dataAboutSection));
      const updatedTemplate = {
        isDeploy: allData.isDeploy,
        projectTitle: allData.projectTitle,
        userId: allData.userId,
        navbar: allData.navbar,
        main: allData.main,
        about: dataAboutSection,
        service: allData.service,
        contact: allData.contact,
        footer: allData.footer,
      };
      dispatch(updateTemplate(allData.id, updatedTemplate));
      history.push({
        pathname: "/finish",
        state: {
          templateId: allData.id,
        },
      });
    }
  }

  function removeAboutSection(event) {
    event.preventDefault();
    const dataAboutSection = {
      type: null,
      headline: null,
      headlineColor: null,
      image: null,
      backgroundColor: null,
      paragraph: null,
      paragraphColor: null,
    };
    dispatch(setAboutSection(dataAboutSection));
    // history.push("/service-section");
    const updatedTemplate = {
      isDeploy: allData.isDeploy,
      projectTitle: allData.projectTitle,
      userId: allData.userId,
      navbar: allData.navbar,
      main: allData.main,
      about: dataAboutSection,
      service: allData.service,
      contact: allData.contact,
      footer: allData.footer,
    };
    dispatch(updateTemplate(allData.id, updatedTemplate));
    history.push({
      pathname: "/finish",
      state: {
        templateId: allData.id,
      },
    });
  }

  function uploadAboutImage(file, code) {
    dispatch(getImageUrl(file, code));
  }

  return (
    <section id="about-section">
      <div className="input">
        <label htmlFor="generate-color" className="generate-color-label">
          Generate Color Palatte
        </label>
        <input type="color" name="generate-color" className="generate-color" />
        <button>Refresh</button>
        <br />
        <br />
        <label htmlFor="about-headline" className="about-headline">
          Headline
        </label>
        <input
          onChange={(event) => setHeadline(event.target.value)}
          type="text"
          name="about-headline"
          className="about-headline"
          value={headline}
        />
        <label htmlFor="about-headline" className="about-headline">
          Color
        </label>
        <input
          type="color"
          onChange={(event) => setHeadlineColor(event.target.value)}
          name="about-headline"
          className="about-headline"
          value={headlineColor}
        />
        <br />
        <br />
        <label htmlFor="about-paragraph" className="about-paragraph">
          Paragraph
        </label>
        <br />
        <textarea
          onChange={(event) => setParagraph(event.target.value)}
          name="about-paragraph"
          className="about-paragraph"
          cols={30}
          rows={10}
          // defaultValue={""}
          value={paragraph}
        />
        <br />
        <br />
        <label htmlFor="about-paragraph" className="about-paragraph">
          Paragraph Color
        </label>
        <input
          type="color"
          onChange={(event) => setParagraphColor(event.target.value)}
          name="about-paragraph"
          className="about-paragraph"
          value={paragraphColor}
        />
        <br />
        <br />
        <label htmlFor="about-image" className="about-image">
          Image
        </label>
        <input
          onChange={(event) => uploadAboutImage(event.target.files[0], "about")}
          type="file"
          name="about-image"
          className="about-image"
        />
        {aboutImageUrl && (
          <img
            style={{ width: "10rem", height: "10rem", objectFit: "cover" }}
            src={aboutImageUrl}
            alt="about"
          />
        )}
        <button onClick={() => dispatch(setAboutImageUrl(""))}>
          Remove Image
        </button>
        <br />
        <br />
        <label htmlFor="background-color-about">Background Color</label>
        <input
          type="color"
          onChange={(event) => setBackgroundColor(event.target.value)}
          name="background-color-about"
          id="background-color-about"
          value={backgroundColor}
        />
        <br />
        <br />
        <label htmlFor="template-layout">Template Layout</label>
        <br />
        <br />
        <div className="selection-about">
          <input
            onClick={(event) => setType(event.target.value)}
            type="radio"
            name="opt-navbar"
            id="opt1-navbar"
            defaultValue="1"
            defaultChecked={type === 1 ? true : false}
          />
          <img
            className="selection-img"
            src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg"
            alt="image1"
          />
          <input
            onClick={(event) => setType(event.target.value)}
            type="radio"
            name="opt-navbar"
            id="opt2-navbar"
            defaultValue="2"
            defaultChecked={type === 2 ? true : false}
          />
          <img
            className="selection-img"
            src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg"
            alt="image2"
          />
          <input
            onClick={(event) => setType(event.target.value)}
            type="radio"
            name="opt-navbar"
            id="opt3-navbar"
            defaultValue="3"
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
        <div className="button-about">
          <button onClick={removeAboutSection}>Remove Section</button>
          <button onClick={updateAboutSection}>Update Section</button>
        </div>
      </div>
    </section>
  );
}
