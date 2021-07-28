import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
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
import { setToServiceSection } from "../store/actions/navigationGuard";

function AboutSection({ setIsOpen }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [type, setType] = useState(null);
  const [headline, setHeadline] = useState("");
  const [headlineColor, setHeadlineColor] = useState("#000000");
  // const [image, setImage] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
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
  const templateId = useSelector((state) => state.forms.templateId);

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
      new Swal("Please fill the headline", "", "error");
    } else if (!dataAboutSection.paragraph) {
      new Swal("Please fill the paragraph", "", "error");
    } else if (!dataAboutSection.image) {
      new Swal("Please fill the image", "", "error");
    } else if (!dataAboutSection.type) {
      new Swal("Please choose the template layout", "", "error");
    } else {
      dispatch(setAboutSection(dataAboutSection));
      const newestTemplate = {
        ...stateMain,
        about: dataAboutSection,
        service: {},
        contact: {},
        footer: {},
      };
      dispatch(updateTemplate(templateId, { about: dataAboutSection }));
      dispatch(setToServiceSection(true));
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
    dispatch(setToServiceSection(true));
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

  useEffect(() => {
    dispatch(setAboutImageUrl(""));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (localStorage.colorArray) {
      window.onscroll = () => {
        stickyColor();
      };

      const colorPalette = document.getElementById("sticky-colormind");
      const stickyOffset = colorPalette.offsetTop;

      function stickyColor() {
        if (window.pageYOffset >= stickyOffset) {
          colorPalette.classList.add("sticky");
        } else {
          colorPalette.classList.remove("sticky");
        }
      }
    }
  }, [window.pageYOffset]);

  return (
    <section id="about-section" onClick={() => setIsOpen(false)}>
      <h1 className="title-bold">About Section</h1>
      <h3 className="title-bold">3 of 6</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginTop: "3rem",
        }}
      >
        <div className="input">
          <h2 className="title-subform">Headline</h2>
          <div className="contain-input">
            <div className="form-align-center">
              <label htmlFor="about-headline" className="about-headline">
                Text
              </label>
              <input
                onChange={(event) => setHeadline(event.target.value)}
                type="text"
                name="about-headline"
                className="about-headline"
                style={{ marginBottom: "1rem" }}
                placeholder="Ex. About Us"
              />
              <label
                htmlFor="about-headline"
                className="about-headline mb-half mt-1"
              >
                Color
              </label>
              <input
                type="color"
                onChange={(event) => setHeadlineColor(event.target.value)}
                name="about-headline"
                className="about-headline"
              />
            </div>
          </div>
          <h2 className="title-subform" style={{ marginTop: "2rem" }}>
            Paragraph
          </h2>
          <div className="contain-input">
            {/* <div style={{ display: "flex", alignItems: "flex-start" }}></div> */}
            <label htmlFor="about-paragraph" className="about-paragraph">
              Text
            </label>
            <br />
            <textarea
              onChange={(event) => setParagraph(event.target.value)}
              name="about-paragraph"
              className="about-paragraph mt-half"
              cols={30}
              rows={10}
              defaultValue={""}
              style={{ marginBottom: "1rem" }}
            />
            <label htmlFor="about-paragraph" className="about-paragraph">
              Color
            </label>
            <input
              type="color"
              onChange={(event) => setParagraphColor(event.target.value)}
              name="about-paragraph"
              className="about-paragraph mt-half"
            />
          </div>
          <div className="form-align-center" style={{ marginTop: "3rem" }}>
            <label
              htmlFor="about-image"
              className="about-image"
              style={{ fontSize: "2rem", marginBottom: "2rem" }}
            >
              Image
            </label>
            <input
              id="input-about-image"
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
              onClick={() => {
                dispatch(setAboutImageUrl(""));
                document.getElementById("input-about-image").value = "";
              }}
              style={{ margin: "0rem", marginTop: "1rem", width: "10rem" }}
            >
              Remove Image
            </button>
          </div>
          <div className="form-align-center">
            <label
              htmlFor="background-color-about"
              style={{
                fontSize: "2rem",
                marginBottom: "1rem",
                marginTop: "2rem",
              }}
            >
              Background Color
            </label>
            <input
              type="color"
              onChange={(event) => setBackgroundColor(event.target.value)}
              name="background-color-about"
              id="background-color-about"
              value={backgroundColor}
              style={{ marginBottom: "2rem" }}
            />
          </div>
          <label htmlFor="template-layout" style={{ fontSize: "2rem" }}>
            Template Layout
          </label>
          <div className="selection-about" style={{ marginTop: "2rem" }}>
            <div className="horizontal-center">
              <input
                onClick={(event) => setType(event.target.value)}
                type="radio"
                name="opt-navbar"
                id="opt1-navbar"
                defaultValue="1"
              />
              <div
                className="container-img-hover"
                onClick={() => viewImage(about1, "25", "80")}
              >
                <img
                  className="selection-img"
                  src={about1}
                  alt="image1"
                  onClick={() => viewImage(about1, "25", "80")}
                />
                <div className="overlay">
                  <div className="text">Click To Enlarge The Picture</div>
                </div>
              </div>
            </div>
            <div className="horizontal-center">
              <input
                onClick={(event) => setType(event.target.value)}
                type="radio"
                name="opt-navbar"
                id="opt2-navbar"
                defaultValue="2"
              />
              <div
                className="container-img-hover"
                onClick={() => viewImage(about2, "25", "80")}
              >
                <img
                  className="selection-img"
                  src={about2}
                  alt="image2"
                  onClick={() => viewImage(about2, "25", "80")}
                />
                <div className="overlay">
                  <div className="text">Click To Enlarge The Picture</div>
                </div>
              </div>
            </div>
            <div className="horizontal-center">
              <input
                onClick={(event) => setType(event.target.value)}
                type="radio"
                name="opt-navbar"
                id="opt3-navbar"
                defaultValue="3"
              />
              <div
                className="container-img-hover"
                onClick={() => viewImage(about3, "35", "80")}
              >
                <img
                  className="selection-img"
                  src={about3}
                  alt="image3"
                  onClick={() => viewImage(about3, "35", "80")}
                />
                <div className="overlay">
                  <div className="text">Click To Enlarge The Picture</div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
        </div>
        {localStorage.colorArray && (
          <div className="colormind-component">
            <div id="sticky-colormind">
              <label htmlFor="generate-color" className="generate-color-label">
                Generate Color Palette
              </label>
              <Color />
              <button className="btn btn-refresh-color" onClick={generateColor}>
                Refresh
              </button>
            </div>
          </div>
        )}
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
