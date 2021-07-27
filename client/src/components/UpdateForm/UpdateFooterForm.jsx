import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import "../../styles/footerSection.css";
import { setFooterSection, updateTemplate } from "../../store/actions/forms";
import { useLocation } from "react-router";
import footer1 from "../../assets/footer1.png";
import footer2 from "../../assets/footer2.png";
import footer3 from "../../assets/footer3.png";
import ModalImage from "../ModalImage";
import Color from "../Color";
import { generateColorArray } from "../../store/actions/template";

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
      new Swal("Please fill at least one social media", "", "error");
    } else if (!dataFooterSection.iconColor) {
      new Swal("Please choose the social media icon color", "", "error");
    } else if (!dataFooterSection.type) {
      new Swal("Please choose the template layout", "", "error");
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
      dispatch(updateTemplate(allData.id, updatedTemplate)).then(() => {
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
  }, [window.pageYOffset]);

  return (
    <section id="footer-section">
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
                value={facebook}
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
                value={instagram}
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
                value={twitter}
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
                value={linkedin}
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
                value={youtube}
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
                  defaultChecked={iconColor === "black" ? true : false}
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
                  defaultChecked={iconColor === "white" ? true : false}
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
            <input
              value={companyNameColor}
              onChange={(event) => setCompanyNameColor(event.target.value)}
              type="color"
              name="company-name-color"
              className="company-name-color"
            />
          </div>
          <div className="form-align-center">
            <label
              htmlFor="background-color-navbar"
              className="mt-2 mb-1"
              style={{ fontSize: "2rem" }}
            >
              Background Color
            </label>
            <input
              value={backgroundColor}
              onChange={(event) => setBackgroundColor(event.target.value)}
              type="color"
              name="background-color-navbar"
              id="background-color-navbar"
              value={backgroundColor}
              className="mb-2"
            />
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
                defaultChecked={type === 1 ? true : false}
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
                defaultChecked={type === 2 ? true : false}
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
                defaultChecked={type === 3 ? true : false}
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
      <div className="button-footer btn-form-page">
        <button className="btn btn-update" onClick={updateFooterSection}>
          Update Section
        </button>
      </div>
    </section>
    // <section id="footer-section">
    //   <h1>Footer Section</h1>
    //   <h3>6 of 6</h3>
    //   <div className="input">
    //     <label htmlFor="generate-color" className="generate-color-label">
    //       Generate Color Palette
    //     </label>
    //     <input type="color" name="generate-color" className="generate-color" />
    //     <button>Refresh</button>
    //     <br />
    //     <br />
    //     <label htmlFor="link-facebook" className="link-facebook">
    //       Link Facebook
    //     </label>
    //     <input
    //       onChange={(event) => setFacebook(event.target.value)}
    //       type="text"
    //       name="link-facebook"
    //       className="link-facebook"
    //       value={facebook}
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="link-instagram" className="link-instagram">
    //       Link Instagram
    //     </label>
    //     <input
    //       onChange={(event) => setInstagram(event.target.value)}
    //       type="text"
    //       name="link-instagram"
    //       className="link-instagram"
    //       value={instagram}
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="link-instagram" className="link-instagram">
    //       Link Twitter
    //     </label>
    //     <input
    //       onChange={(event) => setTwitter(event.target.value)}
    //       type="text"
    //       name="link-twitter"
    //       className="link-twitter"
    //       value={twitter}
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="link-linkedin" className="link-linkedin">
    //       Link Linkedin
    //     </label>
    //     <input
    //       onChange={(event) => setLinkedin(event.target.value)}
    //       type="text"
    //       name="link-linkedin"
    //       className="link-linkedin"
    //       value={linkedin}
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="link-youtube" className="link-youtube">
    //       Link Youtube
    //     </label>
    //     <input
    //       onChange={(event) => setYoutube(event.target.value)}
    //       type="text"
    //       name="link-youtube"
    //       className="link-youtube"
    //       value={youtube}
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="company-name-color" className="company-name-color">
    //       Company Name Color
    //     </label>
    //     <input
    //       onChange={(event) => setCompanyNameColor(event.target.value)}
    //       type="color"
    //       name="company-name-color"
    //       className="company-name-color"
    //       value={companyNameColor}
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="icon-color">Social Media Icon Color</label>
    //     <input
    //       onClick={(event) => setIconColor(event.target.value)}
    //       defaultValue="black"
    //       type="radio"
    //       style={{ marginLeft: "1.5rem" }}
    //       name="icon-color"
    //       id="black-icon"
    //       defaultChecked={iconColor === "black" ? true : false}
    //     />
    //     <label htmlFor="black-icon">Black</label>
    //     <input
    //       onClick={(event) => setIconColor(event.target.value)}
    //       defaultValue="white"
    //       type="radio"
    //       name="icon-color"
    //       id="white-icon"
    //       defaultChecked={iconColor === "white" ? true : false}
    //     />
    //     <label htmlFor="white-icon">White</label>
    //     <br />
    //     <br />
    //     <label htmlFor="background-color-navbar">Background Color</label>
    //     <input
    //       onChange={(event) => setBackgroundColor(event.target.value)}
    //       type="color"
    //       name="background-color-navbar"
    //       id="background-color-navbar"
    //       value={backgroundColor}
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="template-layout">Template Layout</label>
    //     <br />
    //     <br />
    //     <div className="selection-footer">
    //       <input
    //         onClick={(event) => setType(event.target.value)}
    //         defaultValue="1"
    //         type="radio"
    //         name="opt-navbar"
    //         id="opt1-navbar"
    //         defaultChecked={type === 1 ? true : false}
    //       />
    //       <img
    //         className="selection-img"
    //         src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg"
    //         alt="image1"
    //       />
    //       <input
    //         onClick={(event) => setType(event.target.value)}
    //         defaultValue="2"
    //         type="radio"
    //         name="opt-navbar"
    //         id="opt2-navbar"
    //         defaultChecked={type === 2 ? true : false}
    //       />
    //       <img
    //         className="selection-img"
    //         src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg"
    //         alt="image2"
    //       />
    //       <input
    //         onClick={(event) => setType(event.target.value)}
    //         defaultValue="3"
    //         type="radio"
    //         name="opt-navbar"
    //         id="opt3-navbar"
    //         defaultChecked={type === 3 ? true : false}
    //       />
    //       <img
    //         className="selection-img"
    //         src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg"
    //         alt="image3"
    //       />
    //     </div>
    //     <br />
    //     <br />
    //     <div className="button-footer">
    //       <button onClick={updateFooterSection}>Update Section</button>
    //     </div>
    //   </div>
    // </section>
  );
}
