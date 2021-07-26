import React, { useState } from "react";
import swal from "sweetalert";
import "../styles/aboutSection.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Color from "../components/Color";
import { generateColorArray } from "../store/actions/template";
import { setAboutSection, updateTemplate } from "../store/actions/forms";
import { getImageUrl, setAboutImageUrl } from "../store/actions/uploadImage";
import { useLocation } from "react-router";
import about1 from "../assets/about1.png";
import about2 from "../assets/about2.png";
import about3 from "../assets/about3.png";
import ModalImage from "../components/ModalImage";

function AboutSection() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [type, setType] = useState(null);
  const [headline, setHeadline] = useState("");
  const [headlineColor, setHeadlineColor] = useState("#000000");
  // const [image, setImage] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [paragraph, setParagraph] = useState("");
  const [paragraphColor, setParagraphColor] = useState("#000000");
  const aboutImageUrl = useSelector((state) => state.uploadImage.aboutImageUrl);

  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [modalHeight, setModalHeight] = useState("");
  const [modalWidth, setModalWidth] = useState("");

  function viewImage(image, height, width) {
    setShowModal(true);
    setModalImage(image);
    setModalHeight(height);
    setModalWidth(width);
  }

  const stateMain = location.state;
  const templateId = 5;

  function addAboutSection(event) {
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
      const newestTemplate = {
        ...stateMain,
        about: dataAboutSection,
        service: {},
        contact: {},
        footer: {},
      };
      dispatch(updateTemplate(templateId, newestTemplate));
      history.push({
        pathname: "/service-section",
        state: {
          ...stateMain,
          about: dataAboutSection,
        },
      });
    }
  }

  function skipAboutSection(event) {
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
    history.push({
      pathname: "/service-section",
      state: {
        ...stateMain,
        about: dataAboutSection,
      },
    });
  }

  function uploadAboutImage(file, code) {
    dispatch(getImageUrl(file, code));
  }

  function generateColor() {
    dispatch(generateColorArray());
  }

  return (
    <section id="about-section">
      <h1>About Section</h1>
      <h3>3 of 6</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginTop: "5rem",
        }}
      >
        <div className="input">
          <div className="form-center">
            <label htmlFor="about-headline" className="about-headline">
              Headline
            </label>
            <input
              onChange={(event) => setHeadline(event.target.value)}
              type="text"
              name="about-headline"
              className="about-headline"
            />
            <label htmlFor="about-headline" className="about-headline">
              Color
            </label>
            <input
              type="color"
              onChange={(event) => setHeadlineColor(event.target.value)}
              name="about-headline"
              className="about-headline"
            />
          </div>
          <br />
          <br />
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            {/* <div style={{ display: "flex", alignItems: "flex-start" }}></div> */}
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
              defaultValue={""}
            />
            <label htmlFor="about-paragraph" className="about-paragraph">
              Color
            </label>
            <input
              type="color"
              onChange={(event) => setParagraphColor(event.target.value)}
              name="about-paragraph"
              className="about-paragraph"
            />
          </div>
          <br />
          <br />
          <div className="form-center">
            <label htmlFor="about-image" className="about-image">
              Image
            </label>
            <input
              onChange={(event) =>
                uploadAboutImage(event.target.files[0], "about")
              }
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
            <button
              className="btn btn-remove-image"
              onClick={() => dispatch(setAboutImageUrl(""))}
            >
              Remove Image
            </button>
          </div>
          <br />
          <br />
          <div className="form-center">
            <label htmlFor="background-color-about">Background Color</label>
            <input
              type="color"
              onChange={(event) => setBackgroundColor(event.target.value)}
              name="background-color-about"
              id="background-color-about"
            />
          </div>
          <br />
          <br />
          <label htmlFor="template-layout">Template Layout</label>
          <br />
          <br />
          <div className="selection-about">
            <div className="form-center">
              <input
                onClick={(event) => setType(event.target.value)}
                type="radio"
                name="opt-navbar"
                id="opt1-navbar"
                defaultValue="1"
              />
              <img
                className="selection-img"
                src={about1}
                alt="image1"
                onClick={() => viewImage(about1, "25", "80")}
              />
            </div>
            <div className="form-center">
              <input
                onClick={(event) => setType(event.target.value)}
                type="radio"
                name="opt-navbar"
                id="opt2-navbar"
                defaultValue="2"
              />
              <img
                className="selection-img"
                src={about2}
                alt="image2"
                onClick={() => viewImage(about2, "25", "80")}
              />
            </div>
            <div className="form-center">
              <input
                onClick={(event) => setType(event.target.value)}
                type="radio"
                name="opt-navbar"
                id="opt3-navbar"
                defaultValue="3"
              />
              <img
                className="selection-img"
                src={about3}
                alt="image3"
                onClick={() => viewImage(about3, "35", "80")}
              />
            </div>
          </div>
          <br />
          <br />
        </div>
        <div>
          <label htmlFor="generate-color" className="generate-color-label">
            Generate Color Palette
          </label>
          <Color />
          <button className="btn btn-refresh-color" onClick={generateColor}>
            Refresh
          </button>
        </div>
        {showModal && (
          <ModalImage
            image={modalImage}
            height={modalHeight}
            width={modalWidth}
            setShowModal={setShowModal}
          ></ModalImage>
        )}
      </div>
      <div className="button-about btn-form-page">
        <button className="btn btn-skip" onClick={skipAboutSection}>
          Skip
        </button>
        <button className="btn btn-next" onClick={addAboutSection}>
          Next
        </button>
      </div>
    </section>
  );
}

export default AboutSection;
