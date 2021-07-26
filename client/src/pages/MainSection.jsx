import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setMainSection, updateTemplate } from "../store/actions/forms";
import "../styles/mainSection.css";
import Color from "../components/Color";
import { generateColorArray } from "../store/actions/template";
import { getImageUrl, setMainImageUrl } from "../store/actions/uploadImage";
import { useLocation } from "react-router";
import main1 from "../assets/main1.png";
import main2 from "../assets/main2.png";
import main3 from "../assets/main3.png";
import ModalImage from "../components/ModalImage";

function MainSection() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [headline, setHeadline] = useState("");
  const [headlineColor, setHeadlineColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [subHeadline, setSubHeadline] = useState("");
  const [subHeadlineColor, setsubHeadlineColor] = useState("#000000");
  const [type, setType] = useState(null);
  const mainImageUrl = useSelector((state) => state.uploadImage.mainImageUrl);

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

  const stateNavbar = location.state;
  const templateId = useSelector((state) => state.forms.templateId);

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
      dispatch(updateTemplate(templateId, { main: dataMainSection }));
      history.push({
        pathname: "/about-section",
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
    // history.push("/about-section");
    history.push({
      pathname: "/about-section",
      state: {
        ...stateNavbar,
        main: dataMainSection,
      },
    });
  }

  function uploadMainImage(file, code) {
    dispatch(getImageUrl(file, code));
  }

  function generateColor() {
    dispatch(generateColorArray());
  }

  useEffect(() => {
    dispatch(setMainImageUrl(""));
  }, []);

  return (
    <section id="main-section">
      <h1>Main Section</h1>
      <h3>2 of 6</h3>
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
              style={{ border: "none" }}
            />
          </div>
          <br />
          <br />
          <div className="form-center">
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
              style={{ border: "none" }}
            />
          </div>
          <br />
          <br />
          <div className="form-center">
            <label htmlFor="company-background" className="company-background">
              Image
            </label>
            <input
              onChange={(event) =>
                uploadMainImage(event.target.files[0], "main")
              }
              type="file"
              name="company-background"
              className="company-background"
              style={{ border: "none" }}
            />
            {mainImageUrl && (
              <img
                style={{ width: "10rem", height: "10rem", objectFit: "cover" }}
                src={mainImageUrl}
                alt="about"
              />
            )}
            <button
              className="btn btn-remove-image"
              onClick={() => dispatch(setMainImageUrl(""))}
            >
              Remove Image
            </button>
          </div>
          <br />
          <br />
          <div className="form-center">
            <label htmlFor="background-color-main">Background Color</label>
            <input
              onChange={(event) => setBackgroundColor(event.target.value)}
              type="color"
              name="background-color-mainb"
              id="background-color-main"
              style={{ border: "none" }}
              value={backgroundColor}
            />
          </div>
          <br />
          <br />
          <label htmlFor="template-layout">Template Layout</label>
          <br />
          <br />
          <div className="selection-main">
            <div className="form-center">
              <input
                onClick={(event) => setType(event.target.value)}
                defaultValue="1"
                type="radio"
                name="opt-navbar"
                id="opt1-navbar"
              />
              <img
                className="selection-img"
                src={main1}
                alt="image1"
                onClick={() => viewImage(main1, "30", "80")}
              />
            </div>
            <div className="form-center">
              <input
                onClick={(event) => setType(event.target.value)}
                defaultValue="2"
                type="radio"
                name="opt-navbar"
                id="opt2-navbar"
              />
              <img
                className="selection-img"
                src={main2}
                alt="image2"
                onClick={() => viewImage(main2, "30", "80")}
              />
            </div>
            <div className="form-center">
              <input
                onClick={(event) => setType(event.target.value)}
                defaultValue="3"
                type="radio"
                name="opt-navbar"
                id="opt3-navbar"
              />
              <img
                className="selection-img"
                src={main3}
                alt="image3"
                onClick={() => viewImage(main3, "40", "70")}
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
      <div className="button-main btn-form-page">
        <button className="btn btn-skip" onClick={skipMainSection}>
          Skip
        </button>
        <button className="btn btn-next" onClick={addMainSection}>
          Next
        </button>
      </div>
    </section>
  );
}

export default MainSection;
