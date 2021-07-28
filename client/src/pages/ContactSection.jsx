import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../styles/contactSection.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Color from "../components/Color";
import { generateColorArray } from "../store/actions/template";
import { setContactSection, updateTemplate } from "../store/actions/forms";
import {
  getImageUrl,
  setEmailIconUrl,
  setPhoneIconUrl,
  setAddressIconUrl,
} from "../store/actions/uploadImage";
import { useLocation } from "react-router";
import contact1 from "../assets/contact1.png";
import contact2 from "../assets/contact2.png";
import contact3 from "../assets/contact3.png";
import ModalImage from "../components/ModalImage";
import { setToFooterSection } from "../store/actions/navigationGuard";

function ContactSection({ setIsOpen }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [type, setType] = useState(null);
  const [headline, setHeadline] = useState("");
  const [headlineColor, setHeadlineColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const uploadLoading = useSelector((state) => state.uploadImage.uploadLoading);

  // const [emailIcon, setEmailIcon] = useState('')
  const emailIconUrl = useSelector((state) => state.uploadImage.emailIconUrl);
  const [email, setEmail] = useState("");
  const [emailColor, setEmailColor] = useState("#000000");

  // const [phoneIcon, setPhoneIcon] = useState('')
  const phoneIconUrl = useSelector((state) => state.uploadImage.phoneIconUrl);
  const [phone, setPhone] = useState("");
  const [phoneColor, setPhoneColor] = useState("#000000");

  // const [addressIcon, setAddressIcon] = useState('')
  const addressIconUrl = useSelector(
    (state) => state.uploadImage.addressIconUrl
  );
  const [address, setAddress] = useState("");
  const [addressColor, setAddressColor] = useState("#000000");

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

  const stateService = location.state;
  const templateId = useSelector((state) => state.forms.templateId);

  function addContactSection() {
    const dataContactSection = {
      type: +type,
      headline,
      headlineColor,
      backgroundColor,
      emailIcon: emailIconUrl,
      email,
      emailColor,
      phoneIcon: phoneIconUrl,
      phone,
      phoneColor,
      addressIcon: addressIconUrl,
      address,
      addressColor,
    };

    if (!dataContactSection.headline) {
      new Swal("Please fill the headline", "", "error");
    } else if (
      !dataContactSection.email &&
      !dataContactSection.phone &&
      !dataContactSection.address
    ) {
      new Swal("Please fill at least 1 contact information", "", "error");
    } else if (!dataContactSection.type) {
      new Swal("Please choose the template layout", "", "error");
    } else {
      dispatch(setContactSection(dataContactSection));
      const newestTemplate = {
        ...stateService,
        contact: dataContactSection,
        footer: {},
      };
      dispatch(updateTemplate(templateId, { contact: dataContactSection }));
      dispatch(setToFooterSection(true));
      history.push({
        pathname: "/footer-section",
        state: {
          ...stateService,
          contact: dataContactSection,
        },
      });
    }
  }

  function skipContactSection() {
    const dataContactSection = {
      type: null,
      headline: null,
      headlineColor: "#000000",
      backgroundColor: "#FFFFFF",
      emailIcon: null,
      email: null,
      emailColor: "#000000",
      phoneIcon: null,
      phone: null,
      phoneColor: "#000000",
      addressIcon: null,
      address: null,
      addressColor: "#000000",
    };
    dispatch(updateTemplate(templateId, { contact: dataContactSection }));
    dispatch(setContactSection(dataContactSection));
    dispatch(setToFooterSection(true));
    history.push("/footer-section");
  }

  function uploadContactIcon(file, code) {
    dispatch(getImageUrl(file, code));
  }

  function generateColor() {
    dispatch(generateColorArray());
  }

  useEffect(() => {
    dispatch(setEmailIconUrl(""));
    dispatch(setPhoneIconUrl(""));
    dispatch(setAddressIconUrl(""));
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
    <section id="contact-section" onClick={() => setIsOpen(false)}>
      <h1 className="title-bold">Contact Section</h1>
      <h3 className="title-bold">5 of 6</h3>
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
              <label htmlFor="contact-headline" className="contact-headline">
                Text
              </label>
              <input
                onChange={(event) => setHeadline(event.target.value)}
                type="text"
                name="contact-headline"
                className="contact-headline"
                style={{ marginBottom: "1rem" }}
                placeholder="Ex. Contact Us"
              />
              <label htmlFor="contact-headline" className="contact-headline">
                Color
              </label>
              <div className="input-color-side mt-half">
                <input
                  onChange={(event) => setHeadlineColor(event.target.value)}
                  type="color"
                  name="contact-headline"
                  className="contact-headline"
                />
                <p className="color-info-tag">{headlineColor}</p>
              </div>
            </div>
          </div>
          <h2 className="title-subform" style={{ marginTop: "2rem " }}>
            Email
          </h2>
          <div className="contain-input">
            <div className="form-align-center">
              <label htmlFor="contact-email" className="contact-email">
                Text
              </label>
              <input
                onChange={(event) => setEmail(event.target.value)}
                type="text"
                name="contact-email"
                className="contact-email"
                style={{ marginBottom: "1rem" }}
              />
              <label htmlFor="contact-email" className="contact-email">
                Color
              </label>
              <div className="input-color-side mt-half mb-1">
                <input
                  onChange={(event) => setEmailColor(event.target.value)}
                  type="color"
                  name="contact-email"
                  className="contact-email"
                />
                <p className="color-info-tag">{emailColor}</p>
              </div>
            </div>
            <div className="form-align-center">
              <label
                htmlFor="contact-email"
                className="contact-email"
                style={{ marginBottom: "1rem" }}
              >
                Icon
              </label>
              <input
                id="input-email-icon"
                onChange={(event) =>
                  uploadContactIcon(event.target.files[0], "email")
                }
                type="file"
                name="contact-email"
                className="contact-email"
              />
              {uploadLoading ? (
                <img
                  src="https://ik.imagekit.io/vrvrzbdh5xfk/Rolling-1s-200px__1__O7q4jtvrH.gif?updatedAt=1627456298380"
                  alt="loading"
                  style={{ width: "5rem", height: "5rem" }}
                />
              ) : (
                emailIconUrl && (
                  <img
                    style={{
                      width: "5rem",
                      height: "5rem",
                      objectFit: "cover",
                    }}
                    src={emailIconUrl}
                    alt="email"
                  />
                )
              )}
              <button
                className="btn btn-remove-image"
                onClick={() => {
                  dispatch(setEmailIconUrl(""));
                  document.getElementById("input-email-icon").value = "";
                }}
                style={{ margin: "0rem", marginTop: "1rem", width: "10rem" }}
              >
                Remove Image
              </button>
            </div>
          </div>
          <h2 className="title-subform" style={{ marginTop: "2rem" }}>
            Phone
          </h2>
          <div className="contain-input">
            <div className="form-align-center">
              <label htmlFor="contact-phone" className="contact-phone">
                Text
              </label>
              <input
                onChange={(event) => setPhone(event.target.value)}
                type="text"
                name="contact-phone"
                className="contact-phone"
              />
              <label
                htmlFor="contact-phone"
                className="contact-phone"
                style={{ marginTop: "1rem" }}
              >
                Color
              </label>
              <div className="input-color-side mt-half mb-1">
                <input
                  onChange={(event) => setPhoneColor(event.target.value)}
                  type="color"
                  name="contact-phone"
                  className="contact-phone"
                />
                <p className="color-info-tag">{phoneColor}</p>
              </div>
            </div>
            <div className="form-align-center">
              <label
                htmlFor="contact-phone"
                className="contact-phone"
                style={{ marginBottom: "1rem" }}
              >
                Icon
              </label>
              <input
                id="input-phone-icon"
                onChange={(event) =>
                  uploadContactIcon(event.target.files[0], "phone")
                }
                type="file"
                name="contact-phone"
                className="contact-phone"
              />
              {uploadLoading ? (
                <img
                  src="https://ik.imagekit.io/vrvrzbdh5xfk/Rolling-1s-200px__1__O7q4jtvrH.gif?updatedAt=1627456298380"
                  alt="loading"
                  style={{ width: "5rem", height: "5rem" }}
                />
              ) : (
                phoneIconUrl && (
                  <img
                    style={{
                      width: "5rem",
                      height: "5rem",
                      objectFit: "cover",
                    }}
                    src={phoneIconUrl}
                    alt="phone"
                  />
                )
              )}
              <button
                className="btn btn-remove-image"
                onClick={() => {
                  dispatch(setPhoneIconUrl(""));
                  document.getElementById("input-phone-icon").value = "";
                }}
                style={{ margin: "0rem", marginTop: "1rem", width: "10rem" }}
              >
                Remove Image
              </button>
            </div>
          </div>
          <h2 className="title-subform" style={{ marginTop: "2rem" }}>
            Address
          </h2>
          <div className="contain-input">
            <div className="form-align-center">
              <label htmlFor="contact-address" className="contact-address">
                Text
              </label>
              <input
                onChange={(event) => setAddress(event.target.value)}
                type="text"
                name="contact-address"
                className="contact-address"
              />
              <label htmlFor="contact-address" className="contact-address mt-1">
                Color
              </label>
              <div className="input-color-side mb-1 mt-half">
                <input
                  onChange={(event) => setAddressColor(event.target.value)}
                  type="color"
                  name="contact-address"
                  className="contact-address"
                />
                <p className="color-info-tag">{addressColor}</p>
              </div>
            </div>
            <div className="form-align-center">
              <label htmlFor="contact-address" className="contact-address">
                Icon
              </label>
              <input
                id="input-address-icon"
                onChange={(event) =>
                  uploadContactIcon(event.target.files[0], "address")
                }
                type="file"
                name="contact-address"
                className="contact-address"
              />
              {uploadLoading ? (
                <img
                  src="https://ik.imagekit.io/vrvrzbdh5xfk/Rolling-1s-200px__1__O7q4jtvrH.gif?updatedAt=1627456298380"
                  alt="loading"
                  style={{ width: "5rem", height: "5rem" }}
                />
              ) : (
                addressIconUrl && (
                  <img
                    style={{
                      width: "5rem",
                      height: "5rem",
                      objectFit: "cover",
                    }}
                    src={addressIconUrl}
                    alt="address"
                  />
                )
              )}
              <button
                className="btn btn-remove-image"
                onClick={() => {
                  dispatch(setAddressIconUrl(""));
                  document.getElementById("input-address-icon").value = "";
                }}
                style={{ margin: "0rem", marginTop: "1rem", width: "10rem" }}
              >
                Remove Image
              </button>
            </div>
          </div>
          <div className="form-align-center">
            <label
              htmlFor="background-color-contact"
              style={{ fontSize: "2rem" }}
              className="mt-2 mb-1"
            >
              Background Color
            </label>
            <div className="input-color-side mb-2">
              <input
                onChange={(event) => setBackgroundColor(event.target.value)}
                type="color"
                name="background-color-contact"
                id="background-color-contact"
                value={backgroundColor}
              />
              <p className="color-info-tag">{backgroundColor}</p>
            </div>
          </div>
          <label htmlFor="template-layout" style={{ fontSize: "2rem" }}>
            Template Layout
          </label>
          <div className="selection-contact mt-2">
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
                onClick={() => viewImage(contact1, "28", "80")}
              >
                <img
                  className="selection-img"
                  src={contact1}
                  alt="image1"
                  onClick={() => viewImage(contact1, "28", "80")}
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
                onClick={() => viewImage(contact2, "30", "80")}
              >
                <img
                  className="selection-img"
                  src={contact2}
                  alt="image2"
                  onClick={() => viewImage(contact2, "30", "80")}
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
                onClick={() => viewImage(contact3, "40", "31")}
              >
                <img
                  className="selection-img"
                  src={contact3}
                  alt="image3"
                  onClick={() => viewImage(contact3, "40", "31")}
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
        <button className="btn btn-skip" onClick={skipContactSection}>
          Skip
        </button>
        <button className="btn btn-next" onClick={addContactSection}>
          Next
        </button>
      </div>
    </section>
  );
}

export default ContactSection;
