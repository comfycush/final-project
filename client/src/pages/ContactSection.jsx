import React, { useState } from "react";
import swal from "sweetalert";
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

function ContactSection() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [type, setType] = useState(null);
  const [headline, setHeadline] = useState("");
  const [headlineColor, setHeadlineColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");

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
      swal("Please fill your headline");
    } else if (
      !dataContactSection.email &&
      !dataContactSection.phone &&
      !dataContactSection.address
    ) {
      swal("Please fill your information minimum 1");
    } else if (!dataContactSection.type) {
      swal("Please choose your required template");
    } else {
      dispatch(setContactSection(dataContactSection));
      const newestTemplate = {
        ...stateService,
        contact: dataContactSection,
        footer: {},
      };
      dispatch(updateTemplate(templateId, { contact: dataContactSection }));
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
      headlineColor: null,
      backgroundColor: null,
      emailIcon: null,
      email: null,
      emailColor: null,
      phoneIcon: null,
      phone: null,
      phoneColor: null,
      addressIcon: null,
      address: null,
      addressColor: null,
    };

    dispatch(setContactSection(dataContactSection));
    history.push("/footer-section");
  }

  function uploadContactIcon(file, code) {
    dispatch(getImageUrl(file, code));
  }

  function generateColor() {
    dispatch(generateColorArray());
  }

  return (
    <section id="contact-section">
      <h1>Contact Section</h1>
      <h3>5 of 6</h3>
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
            <label htmlFor="contact-headline" className="contact-headline">
              Headline
            </label>
            <input
              onChange={(event) => setHeadline(event.target.value)}
              type="text"
              name="contact-headline"
              className="contact-headline"
            />
            <label htmlFor="contact-headline" className="contact-headline">
              Color
            </label>
            <input
              onChange={(event) => setHeadlineColor(event.target.value)}
              type="color"
              name="contact-headline"
              className="contact-headline"
            />
          </div>
          <br />
          <br />
          <div className="form-centre">
            <label htmlFor="contact-email" className="contact-email">
              Email
            </label>
            <input
              onChange={(event) => setEmail(event.target.value)}
              type="text"
              name="contact-email"
              className="contact-email"
            />
            <label htmlFor="contact-email" className="contact-email">
              Color
            </label>
            <input
              onChange={(event) => setEmailColor(event.target.value)}
              type="color"
              name="contact-email"
              className="contact-email"
            />
          </div>
          <br />
          <br />
          <div className="from-centre">
            <label htmlFor="contact-email" className="contact-email">
              Email Icon
            </label>
            <input
              onChange={(event) =>
                uploadContactIcon(event.target.files[0], "email")
              }
              type="file"
              name="contact-email"
              className="contact-email"
            />
            {emailIconUrl && (
              <img
                style={{ width: "5rem", height: "5rem", objectFit: "cover" }}
                src={emailIconUrl}
                alt="email"
              />
            )}
            <button
              className="btn btn-remove-image"
              onClick={() => dispatch(setEmailIconUrl(""))}
            >
              Remove Image
            </button>
          </div>
          <br />
          <br />
          <div className="form-center">
            <label htmlFor="contact-phone" className="contact-phone">
              Phone
            </label>
            <input
              onChange={(event) => setPhone(event.target.value)}
              type="text"
              name="contact-phone"
              className="contact-phone"
            />
            <label htmlFor="contact-phone" className="contact-phone">
              Color
            </label>
            <input
              onChange={(event) => setPhoneColor(event.target.value)}
              type="color"
              name="contact-phone"
              className="contact-phone"
            />
          </div>
          <br />
          <br />
          <div className="form-center">
            <label htmlFor="contact-phone" className="contact-phone">
              Phone Icon
            </label>
            <input
              onChange={(event) =>
                uploadContactIcon(event.target.files[0], "phone")
              }
              type="file"
              name="contact-phone"
              className="contact-phone"
            />
            {phoneIconUrl && (
              <img
                style={{ width: "5rem", height: "5rem", objectFit: "cover" }}
                src={phoneIconUrl}
                alt="phone"
              />
            )}
            <button
              className="btn btn-remove-image"
              onClick={() => dispatch(setPhoneIconUrl(""))}
            >
              Remove Image
            </button>
          </div>
          <br />
          <br />
          <div className="form-center">
            <label htmlFor="contact-address" className="contact-address">
              Address
            </label>
            <input
              onChange={(event) => setAddress(event.target.value)}
              type="text"
              name="contact-address"
              className="contact-address"
            />
            <label htmlFor="contact-address" className="contact-address">
              Color
            </label>
            <input
              onChange={(event) => setAddressColor(event.target.value)}
              type="color"
              name="contact-address"
              className="contact-address"
            />
          </div>
          <br />
          <br />
          <div className="form-center">
            <label htmlFor="contact-address" className="contact-address">
              Address Icon
            </label>
            <input
              onChange={(event) =>
                uploadContactIcon(event.target.files[0], "address")
              }
              type="file"
              name="contact-address"
              className="contact-address"
            />
            {addressIconUrl && (
              <img
                style={{ width: "5rem", height: "5rem", objectFit: "cover" }}
                src={addressIconUrl}
                alt="address"
              />
            )}
            <button
              className="btn btn-remove-image"
              onClick={() => dispatch(setAddressIconUrl(""))}
            >
              Remove Image
            </button>
          </div>
          <br />
          <br />
          <div className="form-center">
            <label htmlFor="background-color-contact">Background Color</label>
            <input
              onChange={(event) => setBackgroundColor(event.target.value)}
              type="color"
              name="background-color-contact"
              id="background-color-contact"
              value={backgroundColor}
            />
          </div>
          <br />
          <br />
          <label htmlFor="template-layout">Template Layout</label>
          <br />
          <br />
          <div className="selection-contact">
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
                src={contact1}
                alt="image1"
                onClick={() => viewImage(contact1, "28", "80")}
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
                src={contact2}
                alt="image2"
                onClick={() => viewImage(contact2, "30", "80")}
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
                src={contact3}
                alt="image3"
                onClick={() => viewImage(contact3, "40", "31")}
              />
            </div>
          </div>
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
