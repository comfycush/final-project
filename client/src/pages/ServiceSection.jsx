import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "../styles/serviceSection.css";
import Color from "../components/Color";
import { generateColorArray } from "../store/actions/template";
import { setServiceSection, updateTemplate } from "../store/actions/forms";
import {
  getImageUrl,
  setCardImage1Url,
  setCardImage2Url,
  setCardImage3Url,
} from "../store/actions/uploadImage";
import { useLocation } from "react-router";
import service1 from "../assets/service1.png";
import service2 from "../assets/service2.png";
import service3 from "../assets/service3.png";
import ModalImage from "../components/ModalImage";

function ServiceSection() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [type, setType] = useState(null);
  const [headline, setHeadline] = useState("");
  const [headlineColor, setHeadlineColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");

  // const [cardImage1, setCardImage1] = useState('')
  const card1ImageUrl = useSelector((state) => state.uploadImage.card1ImageUrl);
  const [cardBackgroundColor1, setcardBackgroundColor1] = useState("#000000");
  const [cardTitle1, setCardTitle1] = useState("");
  const [cardTitleColor1, setCardTitleColor1] = useState("#000000");
  const [cardText1, setCardText1] = useState("");
  const [cardTextColor1, setCardTextColor1] = useState("#000000");

  // const [cardImage2, setCardImage2] = useState('')
  const card2ImageUrl = useSelector((state) => state.uploadImage.card2ImageUrl);
  const [cardBackgroundColor2, setcardBackgroundColor2] = useState("#000000");
  const [cardTitle2, setCardTitle2] = useState("");
  const [cardTitleColor2, setCardTitleColor2] = useState("#000000");
  const [cardText2, setCardText2] = useState("");
  const [cardTextColor2, setCardTextColor2] = useState("#000000");

  // const [cardImage3, setCardImage3] = useState('')
  const card3ImageUrl = useSelector((state) => state.uploadImage.card3ImageUrl);
  const [cardBackgroundColor3, setcardBackgroundColor3] = useState("#000000");
  const [cardTitle3, setCardTitle3] = useState("");
  const [cardTitleColor3, setCardTitleColor3] = useState("#000000");
  const [cardText3, setCardText3] = useState("");
  const [cardTextColor3, setCardTextColor3] = useState("#000000");

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

  const stateAbout = location.state;
  const templateId = useSelector((state) => state.forms.templateId);

  function addServiceSection() {
    const dataServiceSection = {
      type: +type,
      headline,
      headlineColor,
      backgroundColor,
      cardImage1: card1ImageUrl,
      cardBackgroundColor1,
      cardTitle1,
      cardTitleColor1,
      cardText1,
      cardTextColor1,
      cardImage2: card2ImageUrl,
      cardBackgroundColor2,
      cardTitle2,
      cardTitleColor2,
      cardText2,
      cardTextColor2,
      cardImage3: card3ImageUrl,
      cardBackgroundColor3,
      cardTitle3,
      cardTitleColor3,
      cardText3,
      cardTextColor3,
    };

    if (!dataServiceSection.headline) {
      swal("Please fill your headline");
    } else if (
      //bingung
      !dataServiceSection.cardTitle1 &&
      !dataServiceSection.cardTitle2 &&
      !dataServiceSection.cardTitle3
    ) {
      swal("Please fill minimum 1 card title");
    } else if (!dataServiceSection.type) {
      swal("Please choose your required template");
    } else {
      dispatch(setServiceSection(dataServiceSection));
      const newestTemplate = {
        ...stateAbout,
        service: dataServiceSection,
        contact: {},
        footer: {},
      };
      dispatch(updateTemplate(templateId, { service: dataServiceSection }));
      history.push({
        pathname: "/contact-section",
        state: {
          ...stateAbout,
          service: dataServiceSection,
        },
      });
    }
  }

  function skipServiceSection() {
    const dataServiceSection = {
      type: null,
      headline: null,
      headlineColor: null,
      backgroundColor: null,
      cardImage1: null,
      cardBackgroundColor1: null,
      cardTitle1: null,
      cardTitleColor1: null,
      cardText1: null,
      cardTextColor1: null,
      cardImage2: null,
      cardBackgroundColor2: null,
      cardTitle2: null,
      cardTitleColor2: null,
      cardText2: null,
      cardTextColor2: null,
      cardImage3: null,
      cardBackgroundColor3: null,
      cardTitle3: null,
      cardTitleColor3: null,
      cardText3: null,
      cardTextColor3: null,
    };

    dispatch(setServiceSection(dataServiceSection));
    // history.push("/contact-section");
    history.push({
      pathname: "/contact-section",
      state: {
        ...stateAbout,
        service: dataServiceSection,
      },
    });
  }

  function uploadCardImage(file, code) {
    dispatch(getImageUrl(file, code));
  }

  function generateColor() {
    dispatch(generateColorArray());
  }

  useEffect(() => {
    dispatch(setCardImage1Url(""));
    dispatch(setCardImage2Url(""));
    dispatch(setCardImage3Url(""));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
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
  }, [window.pageYOffset]);

  return (
    <section id="service-section">
      <h1>Service Section</h1>
      <h3>4 of 6</h3>
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
            <label htmlFor="service-headline" className="service-headline">
              Headline
            </label>
            <input
              onChange={(event) => setHeadline(event.target.value)}
              type="text"
              name="service-headline"
              className="service-headline"
              style={{ marginBottom: "1rem" }}
            />
            <label htmlFor="service-headline" className="service-headline">
              Color
            </label>
            <input
              onChange={(event) => setHeadlineColor(event.target.value)}
              type="color"
              name="service-headline"
              className="service-headline"
            />
          </div>
          <h2 className="title-subform" style={{ marginTop: "2rem" }}>
            First Card
          </h2>
          <div className="contain-input">
            <div className="form-align-center">
              <label
                htmlFor="service-card1"
                className="service-card1"
                style={{ fontSize: "1.5rem", marginBottom: "1rem" }}
              >
                Icon
              </label>
              <input
                onChange={(event) =>
                  uploadCardImage(event.target.files[0], "card1")
                }
                type="file"
                name="service-card1"
                className="service-card1"
              />
              {card1ImageUrl && (
                <img
                  style={{ width: "5rem", height: "5rem", objectFit: "cover" }}
                  src={card1ImageUrl}
                  alt="card 1"
                />
              )}
              <button
                className="btn btn-remove-image"
                onClick={() => dispatch(setCardImage1Url(""))}
                style={{ margin: "0rem", marginTop: "1rem", width: "10rem" }}
              >
                Remove Image
              </button>
            </div>
            <div className="form-align-center sub-card">
              <label htmlFor="service-card1" className="service-card1">
                Title
              </label>
              <input
                onChange={(event) => setCardTitle1(event.target.value)}
                type="text"
                name="service-card1"
                className="service-card1"
              />
              <label
                htmlFor="service-card1"
                className="service-card1"
                style={{ marginTop: "1rem" }}
              >
                Color
              </label>
              <input
                type="color"
                onChange={(event) => setCardTitleColor1(event.target.value)}
                name="service-card1"
                className="service-card1"
              />
            </div>
            <div className="form-align-center sub-card">
              <label
                htmlFor="service-card1"
                className="service-card1"
                style={{ marginBottom: "0.5rem" }}
              >
                Paragraph
              </label>
              <input
                onChange={(event) => setCardText1(event.target.value)}
                type="text"
                name="service-card1"
                className="service-card1"
              />
              <label
                htmlFor="service-card1"
                className="service-card1"
                style={{ marginTop: "1rem" }}
              >
                Color
              </label>
              <input
                type="color"
                onChange={(event) => setCardTextColor1(event.target.value)}
                name="service-card1"
                className="service-card1"
              />
            </div>
            <div className="form-align-center">
              <label htmlFor="service-card1" className="service-card1">
                Background Color
              </label>
              <input
                type="color"
                onChange={(event) =>
                  setcardBackgroundColor1(event.target.value)
                }
                name="service-card1"
                className="service-card1"
                style={{ marginTop: "1rem" }}
              />
            </div>
          </div>
          <h2 className="title-subform" style={{ marginTop: "2rem" }}>
            Second Card
          </h2>
          <div className="contain-input">
            <div className="form-align-center">
              <label
                htmlFor="service-card2"
                className="service-card2"
                style={{ marginBottom: "1rem" }}
              >
                Icon
              </label>
              <input
                onChange={(event) =>
                  uploadCardImage(event.target.files[0], "card2")
                }
                type="file"
                name="service-card2"
                className="service-card2"
              />
              {card2ImageUrl && (
                <img
                  style={{ width: "5rem", height: "5rem", objectFit: "cover" }}
                  src={card2ImageUrl}
                  alt="card 2"
                />
              )}
              <button
                className="btn btn-remove-image"
                onClick={() => dispatch(setCardImage2Url(""))}
                style={{ margin: "0rem", marginTop: "1rem", width: "10rem" }}
              >
                Remove Image
              </button>
            </div>
            <div className="form-align-center sub-card">
              <label htmlFor="service-card2" className="service-card2">
                Title
              </label>
              <input
                onChange={(event) => setCardTitle2(event.target.value)}
                type="text"
                name="service-card2"
                className="service-card2"
                style={{ marginBottom: "0.5rem" }}
              />
              <label htmlFor="service-card2" className="service-card2">
                Color
              </label>
              <input
                type="color"
                onChange={(event) => setCardTitleColor2(event.target.value)}
                name="service-card2"
                className="service-card2"
              />
            </div>
            <div className="form-align-center sub-card">
              <label
                htmlFor="service-card2"
                className="service-card2"
                style={{ marginBottom: "0.5rem" }}
              >
                Paragraph
              </label>
              <input
                onChange={(event) => setCardText2(event.target.value)}
                type="text"
                name="service-card2"
                className="service-card2"
                style={{ marginBottom: "0.5rem" }}
              />
              <label htmlFor="service-card2" className="service-card2">
                Color
              </label>
              <input
                type="color"
                onChange={(event) => setCardTextColor2(event.target.value)}
                name="service-card2"
                className="service-card2"
              />
            </div>
            <div className="form-align-center">
              <label
                htmlFor="service-card2"
                className="service-card2"
                style={{ marginBottom: "0.5rem" }}
              >
                Background Color
              </label>
              <input
                type="color"
                onChange={(event) =>
                  setcardBackgroundColor2(event.target.value)
                }
                name="service-card2"
                className="service-card2"
              />
            </div>
          </div>
          <h2 className="title-subform" style={{ marginTop: "2rem" }}>
            Third Card
          </h2>
          <div className="contain-input">
            <div className="form-align-center">
              <label
                htmlFor="service-card3"
                className="service-card3"
                style={{ marginBottom: "1rem" }}
              >
                Icon
              </label>
              <input
                onChange={(event) =>
                  uploadCardImage(event.target.files[0], "card3")
                }
                type="file"
                name="service-card3"
                className="service-card3"
              />
              {card3ImageUrl && (
                <img
                  style={{ width: "5rem", height: "5rem", objectFit: "cover" }}
                  src={card3ImageUrl}
                  alt="card 3"
                />
              )}
              <button
                className="btn btn-remove-image"
                onClick={() => dispatch(setCardImage3Url(""))}
                style={{ margin: "0rem", marginTop: "1rem", width: "10rem" }}
              >
                Remove Image
              </button>
            </div>
            <div className="form-align-center sub-card">
              <label htmlFor="service-card3" className="service-card3">
                Title
              </label>
              <input
                onChange={(event) => setCardTitle3(event.target.value)}
                type="text"
                name="service-card3"
                className="service-card3"
              />
              <label htmlFor="service-card3" className="service-card3">
                Color
              </label>
              <input
                type="color"
                onChange={(event) => setCardTitleColor3(event.target.value)}
                name="service-card3"
                className="service-card3"
              />
            </div>
            <div className="form-align-center sub-card">
              <label htmlFor="service-card3" className="service-card3">
                Paragraph
              </label>
              <input
                onChange={(event) => setCardText3(event.target.value)}
                type="text"
                name="service-card3"
                className="service-card3"
              />
              <label htmlFor="service-card3" className="service-card3">
                Color
              </label>
              <input
                type="color"
                onChange={(event) => setCardTextColor3(event.target.value)}
                name="service-card3"
                className="service-card3"
              />
            </div>
            <div className="form-align-center">
              <label htmlFor="service-card3" className="service-card3">
                Background Color
              </label>
              <input
                type="color"
                onChange={(event) =>
                  setcardBackgroundColor3(event.target.value)
                }
                name="service-card3"
                className="service-card3"
              />
            </div>
          </div>
          <div className="form-align-center">
            <label
              htmlFor="background-color-service"
              style={{ margin: "1rem 0", fontSize: "2rem" }}
            >
              Background Color
            </label>
            <input
              type="color"
              onChange={(event) => setBackgroundColor(event.target.value)}
              name="background-color-service"
              id="background-color-service"
              value={backgroundColor}
              style={{ marginBottom: "2rem" }}
            />
          </div>
          <label htmlFor="template-layout" style={{ fontSize: "2rem" }}>
            Template Layout
          </label>
          <div className="selection-service" style={{ marginTop: "2rem" }}>
            <div className="horizontal-center">
              <input
                onClick={(event) => setType(event.target.value)}
                defaultValue="1"
                type="radio"
                name="opt-navbar"
                id="opt1-navbar"
              />
              <div
                className="container-img-hover"
                onClick={() => viewImage(service1, "35", "70")}
              >
                <img
                  className="selection-img"
                  src={service1}
                  alt="image1"
                  onClick={() => viewImage(service1, "35", "70")}
                />
                <div className="overlay">
                  <div className="text">Click To Enlarge The Picture</div>
                </div>
              </div>
            </div>
            <div className="horizontal-center">
              <input
                onClick={(event) => setType(event.target.value)}
                defaultValue="2"
                type="radio"
                name="opt-navbar"
                id="opt2-navbar"
              />
              <div
                className="container-img-hover"
                onClick={() => viewImage(service2, "35", "70")}
              >
                <img
                  className="selection-img"
                  src={service2}
                  alt="image2"
                  onClick={() => viewImage(service2, "35", "70")}
                />
                <div className="overlay">
                  <div className="text">Click To Enlarge The Picture</div>
                </div>
              </div>
            </div>
            <div className="horizontal-center">
              <input
                onClick={(event) => setType(event.target.value)}
                defaultValue="3"
                type="radio"
                name="opt-navbar"
                id="opt3-navbar"
              />
              <div
                className="container-img-hover"
                onClick={() => viewImage(service3, "45", "25")}
              >
                <img
                  className="selection-img"
                  src={service3}
                  alt="image3"
                  onClick={() => viewImage(service3, "45", "25")}
                />
                <div className="overlay">
                  <div className="text">Click To Enlarge The Picture</div>
                </div>
              </div>
            </div>
          </div>
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
      <div className="button-service btn-form-page">
        <button className="btn btn-skip" onClick={skipServiceSection}>
          Skip
        </button>
        <button className="btn btn-next" onClick={addServiceSection}>
          Next
        </button>
      </div>
    </section>
  );
}
export default ServiceSection;
