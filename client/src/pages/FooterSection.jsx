import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/footerSection.css";
import Color from "../components/Color";
import { generateColorArray } from "../store/actions/template";
import { setFooterSection, updateTemplate } from "../store/actions/forms";
// import { useLocation } from "react-router";
import footer1 from "../assets/footer1.png";
import footer2 from "../assets/footer2.png";
import footer3 from "../assets/footer3.png";
import ModalImage from "../components/ModalImage";

function FooterSection({ setIsOpen }) {
  const dispatch = useDispatch();
  const history = useHistory();
  // const location = useLocation();
  const [type, setType] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [iconColor, setIconColor] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [youtube, setYoutube] = useState("");
  const [companyNameColor, setCompanyNameColor] = useState("#000000");
  // const isFooterFinished = useSelector((state) => state.forms.isFooterFinished);

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

  // const stateContact = location.state;
  const templateId = useSelector((state) => state.forms.templateId);
  // console.log(templateId, `ini templateId`);

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
      new Swal("Please fill at least 1 social media", "", "error");
    } else if (!dataFooterSection.iconColor) {
      new Swal("Please choose the socila media icon color", "", "error");
    } else if (!dataFooterSection.type) {
      new Swal("Please choose the template layout", "", "error");
    } else {
      dispatch(setFooterSection(dataFooterSection));
      // const newestTemplate = {
      //   ...stateContact,
      //   footer: dataFooterSection,
      // };
      dispatch(
        updateTemplate(templateId, { footer: dataFooterSection }, "footer")
      ).then(() => {
        history.push({
          pathname: `/finish/${templateId}`,
          state: {
            templateId,
          },
        });
      });
    }
  }

  function generateColor() {
    dispatch(generateColorArray());
  }

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
  }, []);

  return (
    <section id="footer-section" onClick={() => setIsOpen(false)}>
      <h1 className="title-bold">Footer Section</h1>
      <h3 className="title-bold">6 of 6</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginTop: "3rem",
        }}
      >
        <div className="input">
          <h2 className="title-subform">Social Media Links</h2>
          <div className="contain-input">
            <div className="form-align-center">
              <label htmlFor="link-facebook" className="link-facebook">
                Facebook
              </label>
              <input
                onChange={(event) => setFacebook(event.target.value)}
                type="text"
                name="link-facebook"
                className="link-facebook"
              />
            </div>
            <div className="form-align-center">
              <label htmlFor="link-instagram" className="link-instagram mt-1">
                Instagram
              </label>
              <input
                onChange={(event) => setInstagram(event.target.value)}
                type="text"
                name="link-instagram"
                className="link-instagram"
              />
            </div>
            <div className="form-align-center">
              <label htmlFor="link-instagram" className="link-twitter mt-1">
                Twitter
              </label>
              <input
                onChange={(event) => setTwitter(event.target.value)}
                type="text"
                name="link-twitter"
                className="link-twitter"
              />
            </div>
            <div className="form-align-center">
              <label htmlFor="link-linkedin" className="link-linkedin mt-1">
                Linkedin
              </label>
              <input
                onChange={(event) => setLinkedin(event.target.value)}
                type="text"
                name="link-linkedin"
                className="link-linkedin"
              />
            </div>
            <div className="form-align-center">
              <label htmlFor="link-youtube" className="link-youtube mt-1">
                Youtube
              </label>
              <input
                onChange={(event) => setYoutube(event.target.value)}
                type="text"
                name="link-youtube"
                className="link-youtube mb-1"
              />
            </div>
            <div className="from-align-center">
              <label htmlFor="icon-color">Icon Color</label>
              <div className="horizontal-center">
                <input
                  onClick={(event) => setIconColor(event.target.value)}
                  defaultValue="black"
                  type="radio"
                  name="icon"
                  id="black-icon"
                  style={{ marginRight: "1rem" }}
                />
                <label htmlFor="black-icon" className="radio-label">
                  Black
                </label>
              </div>
              <div className="horizontal-center">
                <input
                  onClick={(event) => setIconColor(event.target.value)}
                  defaultValue="white"
                  type="radio"
                  name="icon"
                  id="white-icon"
                  style={{ marginRight: "1rem" }}
                />
                <label htmlFor="white-icon" className="radio-label">
                  White
                </label>
              </div>
            </div>
          </div>
          <div className="form-align-center">
            <label
              htmlFor="company-name-color"
              className="company-name-color mt-2 mb-1"
              style={{ fontSize: "2rem" }}
            >
              Company Name Color
            </label>
            <div className="input-color-side">
              <input
                onChange={(event) => setCompanyNameColor(event.target.value)}
                type="color"
                name="company-name-color"
                className="company-name-color"
              />
              <p className="color-info-tag">{companyNameColor}</p>
            </div>
          </div>

          <div className="form-align-center">
            <label
              htmlFor="background-color-navbar"
              className="mt-2 mb-1"
              style={{ fontSize: "2rem" }}
            >
              Background Color
            </label>
            <div className="input-color-side mb-2">
              <input
                onChange={(event) => setBackgroundColor(event.target.value)}
                type="color"
                name="background-color-navbar"
                id="background-color-navbar"
                value={backgroundColor}
              />
              <p className="color-info-tag">{backgroundColor}</p>
            </div>
          </div>
          <label htmlFor="template-layout" style={{ fontSize: "2rem" }}>
            Template Layout
          </label>
          <div className="selection-footer mt-2">
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
                onClick={() => viewImage(footer1, "5", "85")}
                style={{ marginLeft: "1rem" }}
              >
                <img
                  className="selection-img"
                  src={footer1}
                  alt="image1"
                  onClick={() => viewImage(footer1, "5", "85")}
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
                onClick={() => viewImage(footer2, "12", "85")}
                style={{ marginLeft: "1rem" }}
              >
                <img
                  className="selection-img"
                  src={footer2}
                  alt="image2"
                  onClick={() => viewImage(footer2, "12", "85")}
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
                onClick={() => viewImage(footer3, "12", "85")}
                style={{ marginLeft: "1rem" }}
              >
                <img
                  className="selection-img"
                  src={footer3}
                  alt="image3"
                  onClick={() => viewImage(footer3, "12", "85")}
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
      <div className="button-footer btn-form-page">
        <button className="btn btn-next" onClick={addFooterSection}>
          Finish
        </button>
      </div>
    </section>
  );
}

export default FooterSection;
