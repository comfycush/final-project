import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import "../styles/footerSection.css";
import Color from "../components/Color";
import { generateColorArray } from "../store/actions/template";
import { setFooterSection, updateTemplate } from "../store/actions/forms";
import { useLocation } from "react-router";
import footer1 from "../assets/footer1.png";
import footer2 from "../assets/footer2.png";
import footer3 from "../assets/footer3.png";
import ModalImage from "../components/ModalImage";

function FooterSection() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [type, setType] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [iconColor, setIconColor] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [youtube, setYoutube] = useState("");
  const [companyNameColor, setCompanyNameColor] = useState("#000000");

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

  const stateContact = location.state;
  const templateId = useSelector((state) => state.forms.templateId);
  console.log(templateId, `ini templateId`);

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
      dispatch(updateTemplate(templateId, { footer: dataFooterSection }));
      history.push({
        pathname: "/finish",
        state: {
          templateId,
        },
      });
    }
  }

  function generateColor() {
    dispatch(generateColorArray());
  }

  return (
    <section id="footer-section">
      <h1>Footer Section</h1>
      <h3>6 of 6</h3>
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
            <label htmlFor="link-facebook" className="link-facebook">
              Link Facebook
            </label>
            <input
              onChange={(event) => setFacebook(event.target.value)}
              type="text"
              name="link-facebook"
              className="link-facebook"
            />
          </div>
          <br />
          <br />
          <div className="form-center">
            <label htmlFor="link-instagram" className="link-instagram">
              Link Instagram
            </label>
            <input
              onChange={(event) => setInstagram(event.target.value)}
              type="text"
              name="link-instagram"
              className="link-instagram"
            />
          </div>
          <br />
          <br />
          <div className="form-center">
            <label htmlFor="link-instagram" className="link-instagram">
              Link Twitter
            </label>
            <input
              onChange={(event) => setTwitter(event.target.value)}
              type="text"
              name="link-twitter"
              className="link-twitter"
            />
          </div>
          <br />
          <br />
          <div className="form-center">
            <label htmlFor="link-linkedin" className="link-linkedin">
              Link Linkedin
            </label>
            <input
              onChange={(event) => setLinkedin(event.target.value)}
              type="text"
              name="link-linkedin"
              className="link-linkedin"
            />
          </div>
          <br />
          <br />
          <div className="form-center">
            <label htmlFor="link-youtube" className="link-youtube">
              Link Youtube
            </label>
            <input
              onChange={(event) => setYoutube(event.target.value)}
              type="text"
              name="link-youtube"
              className="link-youtube"
            />
          </div>
          <br />
          <br />
          <div className="form-center">
            <label htmlFor="company-name-color" className="company-name-color">
              Company Name Color
            </label>
            <input
              onChange={(event) => setCompanyNameColor(event.target.value)}
              type="color"
              name="company-name-color"
              className="company-name-color"
            />
          </div>
          <br />
          <br />
          <div className="from-center">
            <label htmlFor="icon-color">Social Media Icon Color</label>
            <input
              onClick={(event) => setIconColor(event.target.value)}
              defaultValue="black"
              type="radio"
              style={{ marginLeft: "1.5rem" }}
              name="icon"
              id="black-icon"
            />
            <label htmlFor="black-icon" style={{ marginLeft: "0.3rem" }}>
              Black
            </label>
            <input
              onClick={(event) => setIconColor(event.target.value)}
              defaultValue="white"
              type="radio"
              name="icon"
              id="white-icon"
            />
            <label htmlFor="white-icon" style={{ marginLeft: "0.3rem" }}>
              White
            </label>
          </div>
          <br />
          <br />
          <div className="form-center">
            <label htmlFor="background-color-navbar">Background Color</label>
            <input
              onChange={(event) => setBackgroundColor(event.target.value)}
              type="color"
              name="background-color-navbar"
              id="background-color-navbar"
              value={backgroundColor}
            />
          </div>
          <br />
          <br />
          <label htmlFor="template-layout">Template Layout</label>
          <br />
          <br />
          <div className="selection-footer">
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
                src={footer1}
                alt="image1"
                onClick={() => viewImage(footer1, "5", "85")}
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
                src={footer2}
                alt="image2"
                onClick={() => viewImage(footer2, "12", "85")}
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
                src={footer3}
                alt="image3"
                onClick={() => viewImage(footer3, "12", "85")}
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
      <div className="button-footer btn-form-page">
        <button className="btn btn-next" onClick={addFooterSection}>
          Finish
        </button>
      </div>
    </section>
  );
}

export default FooterSection;
